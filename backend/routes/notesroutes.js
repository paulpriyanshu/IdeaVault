const express=require('express')
const {getallusers,getonenote}=require('../controllers/NotesController')
const router=express.Router()

router
    .route('/users')
    .get(getallusers)


router
    .route('/notes/:id')
    .get(getonenote)

module.exports=router