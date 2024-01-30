import React, { useState,useEffect } from 'react'
import Card from './Card'
//import { text } from 'express'
import gitlogo from './components/img/Gitnewlogo.png'
import axios from 'axios'
import { string } from 'zod'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { CardState } from './components/CardState'
import { useNavigate } from 'react-router-dom'
//import {setnotesid} from './components/Signup'
function CreateUser() {

    const [user,setuser]=useState("")
    const [des,setdes]=useState("")
    const navigateTo=useNavigate()
    const [objectid,setobjectid]=useState(null)
    const [card,setCard]=useRecoilState(CardState)

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
    useEffect(()=>{
      localStorage.setItem('title',user)
      localStorage.setItem('des',des)
    },[user,des])
   


    const editdraft=(e)=>{
      setdes(e.target.value)
      setCard((prevdata)=> prevdata.description+des)
    }
    // if(CardState){
    //   setuser(useSetRecoilState(CardState))

    // }
    const adduser=(e)=>{
      setuser(e.target.value)
      setCard((prevdata)=> prevdata.description+des)
    }
    const adddes=(e)=>{
        setdes(e.target.value)
    }
    let props = {
      title:user,
      description:des
    }
 
    const handleimageclick=()=>{
      window.open('https://github.com/paulpriyanshu','_blank')
    }
    
  
    const handlesavenote=async()=>{
           await fetch("http://localhost:5001/notes",{
          method:"POST",
          body: JSON.stringify({
            title:user,
            description:des
          }),
          headers:{
            "Content-type":"application/json"
          }
        }).then(async function(response){
          const data = await response.json();
          const id = data.data;
          console.log(id)
          setobjectid(id)
        })
    }
    
    const updatenotes=async()=>{
      await fetch(`http://localhost:5001/api/v1/auth/notes/update/`,{
        method:"PATCH",
        body: JSON.stringify({
          title:user,
          description:des
        }),
        headers:{
          "Content-type":"application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        
        }
      }) 
      .then(async function(res) {
        const json = await res.json();
        console.log(json)
        alert("Data updated");
      
      })
    }
    const getnotes=async()=>{
          const response=await fetch(`http://localhost:5001/users/`)
          const data=await response.json()
          //console.log(data)
          setuser(data)
          console.log(user)

       }
    const getallnotes=async()=>{
      //console.log(process.env)
      let token=localStorage.getItem('token')
      let notes=await fetch('http://localhost:5001/api/v1/auth/allnotes',{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      }
      })
      const data=await notes.json()
      console.log(data)

      }
    const handlelogout=async()=>{
       localStorage.removeItem('token')
       localStorage.removeItem('title')
       localStorage.removeItem('des')
      navigateTo('/')
    }
    
  
  return (  
    <>
    <div className="flex justify-between">
    <div className='flex flex-col min-h-screen w-1/2 p-4 bg-gray-200'>
    <div className="min-h-screen">
    <button style={{width:150,height:50,marginLeft:450,marginTop:20}} onClick={handlelogout} className='border border-slate-500 rounded-full hover:bg-slate-300'>Log out</button>
      <button style={{width:150,height:50,marginLeft:450,marginTop:20}} onClick={getallnotes} className='border border-slate-500 rounded-full hover:bg-slate-300'>Allnotes</button>
  <span>
   
      <button style={{width:150,height:50,marginLeft:450,marginTop:20}} className='border border-slate-500 rounded-full hover:bg-slate-300' onClick={updatenotes}>Save</button>
      </span>
      <h3 style={{marginLeft:60}}  className="font-mono text-xl">Title</h3>
      
      <span><div><input size={10} type='text' style={{margin:50,width:250,height:100}}  className='border border-slate-500 rounded-xl py-2 px-5' value={card.title} placeholder='name' onChange={adduser}/></div></span>

        <h3 style={{marginLeft:60,paddingBottom:10}}  className="font-mono text-xl">Description</h3>
       <span><textarea  style={{marginLeft:50,width:500,height:400}} className='border border-slate-600 rounded-xl py-10 px-5'  value={card.description} placeholder="Type here..." onChange={editdraft}/></span>
       <span>
        <img src={gitlogo} alt="Github" height={50} width={50} onClick={handleimageclick} className='cursor-pointer py-5 ml-5 mt-4'/></span>
    </div>
    
     
    </div>
    <span><div className="absolute top-1/3 left-2/3">
      <Card props={props}/>
    </div>
    </span>
    
    </div>
    
     </>
  )
}

export default CreateUser
