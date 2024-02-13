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
const authrouter=require('./routes/authenticationRoutes')
const notesrouter=require('./routes/notesroutes')
const AppError = require('./utils/AppError')
const globalerrorhandler=require('./controllers/ErrorController')
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
app.use('/api/v1/auth/',authrouter)
app.use('/api/v1/new/',notesrouter)
app.all('*',(req,res,next)=>{
    next(new AppError(`cannot find${req.originalUrl} !`,404))

    })
app.use(globalerrorhandler)
// app.get('./notes/saved',async(req,res)=>{
//     await notesdb.find({})

// })

app.listen(port,()=>{
    console.log(`server is started at ${port}`)})

