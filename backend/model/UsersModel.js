const mongoose= require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')

const userschema =new  mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
   email:{
        type:String,
        required:true,
        validate:[validator.isEmail,'email required']
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
   }

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

const Users=mongoose.model('Users',userschema)
module.exports=Users


