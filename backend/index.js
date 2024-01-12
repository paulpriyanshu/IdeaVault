const express= require('express')
const app= express()
const port=5001;
const mongoose=require('mongoose')
const {notesdb}=require('./model/noteModel')
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
app.post('/notes',async(req,res)=>{
   const newnotes =  await notesdb.create({
        id: parseInt(uuidv4()),
        title: req.body.title,
        description : req.body.description
    })
    res.json({
       
        data: newnotes.id
    })
})
app.patch('/notes/update/:id',async(req,res)=>{
    // const title=req.body.title
    // const data = await notesdb.findOne({title})
    // newid=data._id.toHexString()
    // console.log(data,newid)
    // await notesdb.findByIdAndUpdate(body._id,req.body.description,{
    //     new: true,
    //     validators: true
    // }) 
    const filter = {id:req.params.id}
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