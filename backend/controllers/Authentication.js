const Users=require('../model/UsersModel')
const {notesdb}=require('../model/noteModel')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const emailValidator=require('email-validator')

let Owner,Token
const signintoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_IN
})
}

const catchAsync = fn =>{
    return(req,res,next)=>{
        fn(req,res,next).catch(next)
    }
}
exports.protect= async(req,res,next)=>{
    let token

    //-------------------checking the headers ----------------------
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1]
        //console.log(token)
        }
    //-----------------checking token is awailable or not//-------------------------
        if(!token || !req.headers.authorization){
            res.status(401).json({
                status:'fail',
                message:'please login to access data'
    
            })
        }
        
       
    //----------checkin wether the user exists or not --------------------------
       
    const decoded=await jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        console.log(decoded.id)
        const currentuser= await Users.findById(decoded.id)
         if(!currentuser){
            res.status(401).json({
                message:"user  does not exists"
            })
        }
        const loggedin=await Users.findById(decoded.id)
        console.log(loggedin.Name)

    
        //currentuser.changedPasswordAfter(decoded.iat)
        //     return next('password changed login again')
        // }
        // req.user=currentuser
        
next();   
}
// exports.passwordchange=(req,res,next)=>{
//     const email=req.body.email
    
// }

exports.signup=async(req,res)=>{
    const newUser = await Users.create({
        Name:req.body.Name,
        email:req.body.Email,
        password:req.body.Password,
        Confpassword:req.body.ConfPassword,
        //notes:newnotes.id
       
    })
    //noteids.push(newnotes.id)
    
    //console.log(noteids[noteids.length-1])
    let token=signintoken(newUser._id)
    let refid=newUser._id
    console.log(refid)
    const newnotes =  await notesdb.create({
        title:"Add Title",
        description:"Write Something...",
        owner:refid
    })
 
    Owner=refid
    
    res.json({
        data: newUser,token

    })



}

exports.login=catchAsync(async(req,res,next)=>{
    const email=req.body.email
    const password=req.body.password
    const isValid = emailValidator.validate(email);
    var loggedin=await Users.findOne({email}).select('+password')
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
    if (isValid) {
        const correctuser=await loggedin.correctPassword(password,loggedin.password)
    if(!loggedin||!correctuser){
        return ('incorrect username or password')
    }
    
   
    // res.json({
    //     msg:"success",
    //     data:{
    //         loggedin
    //     }
    

    // })
    var token=signintoken(loggedin._id)
        let owner=loggedin._id  
        
        const Oneuser=await notesdb.findOne({owner})
        //console.log(Oneuser.id)
        //noteids.push(Oneuser.notes.id)
        if(!Oneuser){
            res.json({
                msg:"no data"
            }) 
        }else{
        res.json({
            data:{
                token,
                id:loggedin._id,
                title: Oneuser.title,
                description: Oneuser.description
                
            }
        })
    }
    Owner=owner
    Token=token
    console.log(Owner)
      } else {
        res.status(400).json(
            { 
                error: 'Invalid email or password' 
        }
        );
      }
    
    
    //res.locals.user_ref=owner
   // console.log(res.locals.user_ref)
    next()
})
exports.notes=async(req,res)=>{
    // var loggedin=await Users.findOne({email}).select('+password')
    var currentdate=new Date()
    // let Datenow=`${currentdate.getDate()},"/",${currentdate.getMonth()+1},"/",${currentdate.getFullYear()}`
    
    let token=req.headers.authorization.split(' ')[1]
    console.log(token)
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const newnotes =  await notesdb.create({
        title:req.body.title,
        description:req.body.description,
        date:currentdate,
        owner:decoded.id
    })
     res.json({
        newnotes
     })
 }
exports.getallnotes=async(req,res)=>{
    console.log(req.headers.authorization)
    
    let token=req.headers.authorization.split(' ')[1]
    let decoded=jwt.verify(token,process.env.JWT_SECRET)
    console.log(decoded.id)
    const allnotes=await notesdb.find({owner:decoded.id})
    if(!allnotes){
        res.json({
            msg: "no data"
        })
    }else{
    //console.log(title,description)
   res.json({
        allnotes
    })

}
}
exports.updatedata=async(req,res)=>{ 
  //console.log((Owner.toString()))
    let Owner
    let token=req.headers.authorization.split(' ')[1]
    let decoded=jwt.verify(token,process.env.JWT_SECRET)
    const Oneuser=await notesdb.findOne({owner:decoded.id})
   
    const filter = Oneuser._id
    const update = {
        title:req.body.title,
        description : req.body.description
    }
    
    await notesdb.findOneAndUpdate(filter,update,{
        new: true,
        validators: true
    })
    
    res.status(200).json({
        msg: "updated"
    })
}
exports.deletenotes = async(req, res) => {
    // let token=req.headers.authorization.split(' ')[1]
    // let decoded=jwt.verify(token,process.env.JWT_SECRET)
    // const Oneuser=await notesdb.deleteOne({owner:decoded._id})
    //let object_id=localStorage.getItem('object_id')
    //object_id=JSON.stringify(object_id)
    let object_id=req.params.id
    console.log(object_id)
    const allnotes=await notesdb.deleteOne({_id:object_id})
   
   
    //console.log(title,description)
    res.json({
            allnotes
        })

    

        
   
}

