const express= require('express')
const app= express()
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
mongoose.connect('mongodb+srv://priyanshupaul003:oAsGAjErBlExDHoa@cluster0.42q18en.mongodb.net/Editor?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('server connected')
})
// app.get('./notes/saved',async(req,res)=>{
//     await notesdb.find({})

// })
app.get('/users',async(req,res)=>{
    const alluser=await Users.find()
    res.json({
        alluser
    })
})
app.get('/users/:id',async(req,res)=>{
    const Oneuser=await Users.findById(req.params.id).populate('notes')
    res.json({
        data:Oneuser.notes.title
    })
})
let noteids=[]
app.post('/signup',async(req,res)=>{
     newnotes =  await notesdb.create({
        id: parseInt(uuidv4()),
        title: "hello",
        description : "hello",
        
    })
    const newUser = await Users.create({
        Name:req.body.Name,
        email:req.body.Email,
        password:req.body.Password,
        Confpassword:req.body.ConfPassword,
        notes:newnotes.id
       
    })
    noteids.push(newnotes.id)
   
    console.log(noteids[noteids.length-1])
    res.json({
        
        data: newnotes.id,newnotes

    })


})
app.post('/login',async(req,res,next)=>{
    const email=req.body.Email
    const password=req.body.Password

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
    
        const Oneuser=await Users.findById(loggedin._id).populate('notes')
        res.json({
            data:{title: Oneuser.notes.title,
                description: Oneuser.notes.description
            }
        })
    
    

    
})



app.post('/notes',async(req,res)=>{
   const newnotes =  await notesdb.create({
        id: parseInt(uuidv4()),
        title: req.body.title,
        description : req.body.description,
        
    })
    res.json({
       
        data: newnotes.id,newnotes

    })
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
    
    console.log(noteids[noteids.length-1])
    const filter = {_id:noteids[noteids.length-1]}
    const update = {description : req.body.description}
    await notesdb.findOneAndUpdate(filter,update,{
        new: true,
        validators: true
    })
    
    res.status(200).json({
        msg: "updated"
    })
})



app.listen(port,()=>{
    console.log(`server is started at ${port}`)})