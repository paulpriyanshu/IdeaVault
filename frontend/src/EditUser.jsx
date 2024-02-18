import React, { useState,useEffect } from 'react'
import { ToastContainer,toast,cssTransition } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Card from './Card'
//import { text } from 'express'
import gitlogo from './components/img/Gitnewlogo.png'
import axios from 'axios'
import { string } from 'zod'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { CardState } from './components/CardState'
import { useNavigate } from 'react-router-dom'
import Notify from './components/Notify'
import AllCards from './AllCards'
import { components } from 'react-select'
import Cookies from 'universal-cookie';
//import {setnotesid} from './components/Signup'
function EditUser() {

   let [title,setitle]=useState("")
   let [des,setdes]=useState("")
    const navigateTo=useNavigate()
    const [objectid,setobjectid]=useState(null)
    const [card,setCard]=useRecoilState(CardState)
    const [showalert,setalert]=useState(false)
    const [temp,settemp]=useState("")
    const [edit_title,setedit_title]=useState("")
    const [edit_description,setedit_description]=useState("")
    const cookie=new Cookies()
    useEffect(()=>{
       
        setedit_title(localStorage.getItem("edit-title"))

     
        setitle(edit_title)
        setedit_description(localStorage.getItem("edit-description"))
        setdes(edit_description)
        //setedit_description(prevdes)
    },[edit_description,edit_title])
    let props={
        title:title,
        description:des
        
    }
    const edittitle=(e)=>{
        setitle(e.target.value)
        // setedit_title({...edit_title, title})
        
        


    }
    const editdes=(e)=>{
        setdes(e.target.value)
        setCard((prev)=>prev.description+edit_description)
    }

    const updatenotes=async()=>{
      let object_id = localStorage.getItem('object_id')
      console.log(object_id)
      console.log(cookie.get('token'))
        await fetch(`http://localhost:5001/api/v1/auth/notes/update/${object_id}`,{
          method:"PATCH",
          body: JSON.stringify({
            title:title,
            description:des
          }),
          headers:{
            "Content-type":"application/json",
            "Authorization": "Bearer " + cookie.get("token")
          
          }
        }) 
        .then(async function(res) {
          const json = await res.json();
          console.log(json)
          // alert("Data updated");
          toast.success("Note Updated!",{
            
          });
        })
      }
     
  return (  
    <>
    
    <div className="flex justify-between">
    <div className='flex flex-col min-h-screen w-1/2 p-4 bg-gray-200'>
    <div className="min-h-screen">
    <div className="mb-10 mt-5">
   <span>
   <button style={{width:150,height:50,margin:10}} className='border border-slate-500 rounded-full hover:bg-slate-300' onClick={updatenotes}>Save</button>
   </span>
      <span><ToastContainer /></span>
   
      </div>
      <h3 style={{marginLeft:60}}  className="font-mono text-xl">Title</h3>
      
      <span><div><input size={10} type='text' style={{margin:50,width:250,height:100}}  className='border border-slate-500 rounded-xl py-2 px-5' value={title} placeholder='name' onChange={edittitle}/></div></span>

        <h3 style={{marginLeft:60,paddingBottom:10}}  className="font-mono text-xl">Description</h3>
       <span><textarea  style={{marginLeft:50,width:500,height:400}} className='border border-slate-600 rounded-xl py-10 px-5'  value={des} placeholder="Type here..." onChange={editdes}/></span>
      
      
    </div>
    
     
    </div>
    <span><div className="absolute top-1/3 left-2/3">
    {console.log(props)}
      <Card props={props}/>
      
      
    </div>
    </span>
    
    </div>
    <Notify show={showalert}/>
    
     </>
  )
}

export default EditUser
