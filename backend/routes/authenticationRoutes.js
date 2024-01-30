const express=require('express')
const { login,signup, updatedata,notes, getallnotes, protect } = require('../controllers/Authentication')
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
    .post(notes)
router
    .route('/notes/update/')
    .patch(updatedata)

module.exports=router