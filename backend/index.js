const express= require('express')
const jwt=require('jsonwebtoken')
const app= express()
const dotenv=require('dotenv')
dotenv.config({path:"./config.env"})
const port=5001;
const mongoose=require('mongoose')
const {notesdb}=require('./model/noteModel')
const Users=require('./model/UsersModel')
const cors=require('cors')
//const bodyparser=require('body-parser')
//const {nanoid} = require("nanoid")
//const id=nanoid()
const {v4:uuidv4} = require("uuid")


app.use(cors())
app.use(express.json())
console.log(process.env)

const signintoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{

        expiresIn:process.env.JWT_EXPIRES_IN
    })
}

mongoose.connect('mongodb+srv://priyanshupaul003:oAsGAjErBlExDHoa@cluster0.42q18en.mongodb.net/Editor?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('server connected')
})
// app.get('./notes/saved',async(req,res)=>{
//     await notesdb.find({})

// })
let Owner
app.get('/users',async(req,res)=>{
    const alluser=await Users.find()
    res.json({
        alluser
    })
})
app.get('/notes/:id',async(req,res)=>{
    let owner=req.params.id
    const Oneuser=await notesdb.findOne({owner})
    res.json({
        data:{title: Oneuser.title,
       description:Oneuser.description 
    }
    })
})

app.post('/signup',async(req,res)=>{
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



})

app.post('/login',async(req,res,next)=>{
    const email=req.body.email
    const password=req.body.password

    const loggedin=await Users.findOne({email}).select('+password')
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
    let token=signintoken(loggedin._id)
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
    console.log(Owner)
    //res.locals.user_ref=owner
   // console.log(res.locals.user_ref)
    next()
    
    

    
})
app.patch('/notes/update/',async(req,res)=>{ 
    
    // const title=req.body.title
    // const data = await notesdb.findOne({title})
    // newid=data._id.toHexString()
    // console.log(data,newid)
    // await notesdb.findByIdAndUpdate(body._id,req.body.description,{
    //     new: true,
    //     validators: true
    // }) 
    
    //console.log(noteids[noteids.length-1])
    console.log((Owner.toString()))
    
    let owner
    //console.log(owner)
    const Oneuser=await notesdb.findOne({owner:Owner})
    // if(!Oneuser){
    //     const newnotes =  await notesdb.create(req.body)
    //     res.json({
    //        newnotes
    //     })
    // }else
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

   
})

app.post('/notes',async(req,res)=>{
    const newnotes =  await notesdb.create(req.body)
     res.json({
        newnotes
     })
 })


app.listen(port,()=>{
    console.log(`server is started at ${port}`)})

