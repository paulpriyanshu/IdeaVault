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
import { Cookie } from '@mui/icons-material';
//import {setnotesid} from './components/Signup'
function CreateUser() {

   let [user,setuser]=useState("")
   let [des,setdes]=useState("")
   let [id,setid]=useState("")
    const navigateTo=useNavigate()
    const [objectid,setobjectid]=useState(null)
    const [card,setCard]=useRecoilState(CardState)
    const [showalert,setalert]=useState(false)
    
    const cookie=new Cookies()
    // let [edit_title,setedit_title]=useState("")
    // let [edit_description,setedit_description]=useState("")
    // // const bounce = cssTransition({
    //   enter: "animate__animated animate__bounceIn",
    //   exit: "animate__animated animate__bounceOut",
    // });
    useEffect(()=>{
      const prevtitle=localStorage.getItem('title')
      const prevdes=localStorage.getItem('des')
      if(prevtitle){
        setuser(prevtitle)
        if(prevdes){
          setdes(prevdes)
        }
      }
      
    },[])
    // const editdes=(e)=>{
    //   setdes(e.target.value)
    //   setCard((prevdata)=> prevdata.description+des)
    // }
    // const edittitle=(e)=>{
    //   setuser(e.target.value)
    //   setCard((prevdata)=> prevdata.title+user)
    // }
    useEffect(()=>{
      
      localStorage.setItem('title',user)
      localStorage.setItem('des',des)
      

    },[user,des])
    
    
    const addid=()=>{
      setCard((prevdata)=> console.log(prevdata.description))


    }
    // useEffect(()=>{
    //   addid()
    // })
     
    const editdraft=(e)=>{
      setdes(e.target.value)
     
      setCard((prevdata)=> prevdata.description+des)
      localStorage.setItem('draft',des)
    }
    // if(CardState){
    //   setuser(useSetRecoilState(CardState))

    // }
    const adduser=(e)=>{
      setuser(e.target.value)
      
      setCard((prevdata)=> prevdata.title+user)
      localStorage.setItem('adduser',user)
    }
   
    
    var props = {
      title:user,
      description:des
    }

     
    //console.log(edit_title,edit_description)
    //console.log(props);
 
    const handleimageclick=()=>{
      window.open('https://github.com/paulpriyanshu','_blank')
    }
    
  
   
   
    
    const updatenotes=async()=>{
      
      let object_id = localStorage.getItem('object_id')
      try{
      await fetch(`http://localhost:5001/api/v1/auth/notes/update/${object_id}`,{
        method:"PATCH",
        body: JSON.stringify({
          title:user,
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
    }catch(e) {
      toast.error("Error occured try Go to all notes then try editing again")
    }

    }
    const getnotes=async()=>{
          const response=await fetch(`http://localhost:5001/users/`)
          const data=await response.json()
          //console.log(data)
          setuser(data)
          console.log(user)

       }
    const getallnotes=async()=>{
      navigateTo('/allnotes/')

      }
    const handlelogout=async()=>{
       localStorage.removeItem('token')
       localStorage.removeItem('title')
       localStorage.removeItem('des')
       localStorage.removeItem('edit-title')
       localStorage.removeItem('edit-description')
       cookie.remove('token')
      

      navigateTo('/')
    }
    const newnote=async()=>{
      const response=await fetch('http://localhost:5001/api/v1/auth/notes',{
        method:'POST',
        body: JSON.stringify({
          title:user,
          description:des
        }),
        headers:{
          "Content-type":"application/json",
          "Authorization": "Bearer " + cookie.get("token")
        
        }
      }).then(async(res)=>{
        let data=await res.json()
        console.log(data)
        // setalert(true)
        toast.success("Note Saved!");
        
      })

     
    }

  
  return (  
    <>
    
    <div className="flex justify-between">
    <div className='flex flex-col min-h-screen w-1/2 p-4 bg-gray-300'>
    <div className="min-h-screen">
    <div className="mb-10 mt-5">
    <button style={{width:150,height:50, margin:30,marginLeft:50}} onClick={handlelogout} className='border border-slate-400 rounded-full   hover:bg-slate-300 transition-transform transform duration-300 hover:scale-125'>Log out</button>
      <button style={{width:150,height:50,margin:30}} onClick={getallnotes} className='border border-slate-400 rounded-full hover:bg-slate-300 transition-transform transform duration-300 hover:scale-125'>Allnotes</button>
      <button style={{width:150,height:50,margin:30}} onClick={newnote} className='border border-slate-400 rounded-full hover:bg-slate-300 transition-transform transform duration-300 hover:scale-125'>Save</button>
      {/* <span>
   
   <button style={{width:150,height:50,margin:10}} className='border border-slate-500 rounded-full hover:bg-slate-300' onClick={updatenotes}>Save</button>
   </span> */}
      <span><ToastContainer /></span>
   
      </div>
      <h3 style={{marginLeft:60}}  className="font-mono text-xl">Title</h3>
      
      <span><div><input size={10} type='text' style={{margin:50,width:250,height:100}}  className='border border-slate-500 rounded-xl py-2 px-5' value={user} placeholder='name' onChange={adduser}/></div></span>

        <h3 style={{marginLeft:60,paddingBottom:10}}  className="font-mono text-xl">Description</h3>
       <span><textarea  style={{marginLeft:50,width:500,height:400}} className='border border-slate-600 rounded-xl py-10 px-5'  value={des} placeholder="Type here..." onChange={editdraft}/></span>
       <span>
        <img src={gitlogo} alt="Github" height={50} width={50} onClick={handleimageclick} className='cursor-pointer py-5 ml-5 mt-4'/></span>
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

export default CreateUser
