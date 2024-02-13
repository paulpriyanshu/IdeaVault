const { notesdb,Users } = require("../model/noteModel")


exports.getallusers=async(req,res)=>{
    const alluser=await Users.find()
    res.json({
        alluser
    })
}


exports.getonenote=async(req,res)=>{
    let owner=req.params.id
    const Oneuser=await notesdb.findOne({owner})
    res.json({
        data:{title: Oneuser.title,
       description:Oneuser.description 
    }
    })
}



