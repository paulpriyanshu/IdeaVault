const Users=require('../model/UsersModel')
const {notesdb}=require('../model/noteModel')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')

let Owner,Token
const signintoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_IN
})
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
    const newnotes =  await notesdb.create({
        title:"",
        description:"",
        owner:refid
    })
 
    Owner=refid
    
    res.json({
        data: newUser,token

    })



}

exports.login=async(req,res,next)=>{
    const email=req.body.email
    const password=req.body.password

    var loggedin=await Users.findOne({email}).select('+password')
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
                title: Oneuser.title,
                description: Oneuser.description
                
            }
        })
    }
    Owner=owner
    Token=token
    console.log(Owner)
    //res.locals.user_ref=owner
   // console.log(res.locals.user_ref)
    next()
}
exports.notes=async(req,res)=>{
    const newnotes =  await notesdb.create({
        title:req.body.title,
        description:req.body.description,
        owner:Owner
    })
     res.json({
        newnotes
     })
 }
exports.getallnotes=async(req,res)=>{
    
    const allnotes=await notesdb.find({owner:Owner})
    if(!allnotes){
        res.json({
            msg: "no data"
        })
    }else{
    res.json({
        allnotes
    })
}
}
exports.updatedata=async(req,res)=>{ 
  //console.log((Owner.toString()))
    let Owner
    const Oneuser=await notesdb.findOne({owner:Owner})
   
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

