const mongoose=require('mongoose')
const { string } = require('zod')



const noteschema= new mongoose.Schema({
    id:Number,
    title:String,
    description:String

})

const notesdb=mongoose.model('Notes',noteschema)
module.exports={
    notesdb
}