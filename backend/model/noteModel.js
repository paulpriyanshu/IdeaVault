const mongoose=require('mongoose')
const { string } = require('zod')
const Users=require('./UsersModel')


const noteschema= new mongoose.Schema({
    title:String,
    description:String,
  
   

})

// noteschema.pre('save',async(next)=>{
//     const elementspromises=this.elements.map(async id=>await Users.findById(id))
//     this.elements=await Promise.all(elementspromises)
//     next()
// })

const notesdb=mongoose.model('Notes',noteschema)
module.exports={
    notesdb
}