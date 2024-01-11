const mongoose=require('mongoose')


const noteschema= new mongoose.Schema({
    title:String,
    description:String

})

const notesdb=mongoose.model('Notes',noteschema)
module.exports={
    notesdb
}