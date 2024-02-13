const mongoose= require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const notesdb=require('./noteModel')
const { array } = require('zod')
const crypto=require('crypto')


const userschema =new  mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,'email required'],
        unique:true
   },
   password:{
        type:String,
        required:true,
        select:false
   },
   Confpassword:{
        type:String,
        required:true,
        validate:{
            validator: function(i)  {
                return i===this.password
            },
            message:"passwords are not same"
        }
   },
   passwordResetToken : String,
   passwordResetExpires: Date,
  
    
})

userschema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password=await bcrypt.hash(this.password,12)
    this.Confpassword=undefined
    next()
 })

 
 userschema.methods.correctPassword= async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)

 }

userschema.methods.createPasswordResetToken= async function(){ 
    const resetToken= crypto.randomBytes(32).toString('hex')
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log({resetToken},this.passwordResetToken)
    this.passwordResetExpires=Date.now()+10*60*1000;

    return resetToken

}
//  userschema.pre('save',async(next)=>{
//     const elementspromises=this.elements.map(async id=>await notesdb.findById(id))
//     this.elements= await Promise.all(elementspromises)
//     next()
// })

const Users=mongoose.model('Users',userschema)
module.exports=Users


