const express=require('express')
const { login,signup, updatedata,notes, getallnotes, protect,deletenotes } = require('../controllers/Authentication')
const router=express.Router()

router 
    .route('/signup')
    .post(signup)
router
    .route('/login')
    .post(login)

router
    .route('/allnotes')
    .get(protect,getallnotes)
router
    .route('/notes')
    .post(protect,notes)
router
    .route('/notes/update/:id')
    .patch(updatedata)
router
    .route('/notes/delete/:id')
    .delete(protect,deletenotes)

module.exports=router