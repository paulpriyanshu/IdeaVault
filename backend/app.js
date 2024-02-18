const express= require('express')
const jwt=require('jsonwebtoken')
const morgan=require('morgan')
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
const rateLimit=require('express-rate-limit')
const helmet=require('helmet')
const mongoSanitize=require('express-mongo-sanitize')
const xss=require('xss-clean')
const hpp=require('hpp')
const compression=require('compression')

//const bodyparser=require('body-parser')
//const {nanoid} = require("nanoid")
//const id=nanoid()
const {v4:uuidv4} = require("uuid")


app.use(cors())
app.use(express.json({limit:'10kb'}))
//console.log(process.env)
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// const signintoken=(id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET,{

//         expiresIn:process.env.JWT_EXPIRES_IN
//     })
// }
app.use(helmet())

const limiter=rateLimit(
    {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: 'Too many requests, please try again later'
    }
)
app.use('/api',limiter)
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(compression())
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

