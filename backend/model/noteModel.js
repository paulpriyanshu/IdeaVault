const mongoose=require('mongoose')
const { string } = require('zod')
const Users=require('./UsersModel')


const noteschema= new mongoose.Schema({
    title:{
        type:String,
        
    },
    description:{
        type:String,
    
    }, 
    date: {
        type: Date,
        default: Date.now,
      },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:'Users'
    },
   
    
   

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
})

noteschema.pre(/^find/,function(next) {
    this.populate({
      path: 'owner',
      select:'email'
    })
    next()
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