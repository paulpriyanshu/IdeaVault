import React, { useEffect, useState } from 'react'
import { useRecoilState,useRecoilValue, useSetRecoilState } from 'recoil'
import { CardState } from './components/CardState'
import Card from './Card'
import AddCard from './AddCard'

function AllCards() {
   
//   const setCard=useSetRecoilState(CardState)
//   const card=useRecoilValue(CardState)
//   const [content,setcontent]=useState([])
const [alldata,setalldata]=useState([])

   const allcarddata=async()=>{
  //let token=localStorage.getItem('token')
      let notes=await fetch('http://localhost:5001/api/v1/auth/allnotes',{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      }
      }).then(async(notes)=>{

        const data=await notes.json()
        
        //console.log(data)
        
        //console.log(Array.isArray())
        //console.log(lis)
        //setcontent(data)
        //setCard(content)
        //console.log(list)
        setalldata(data.allnotes)
        //console.log(data.allnotes)
        // .map((item)=>setalldata(item.title ,item.description))

        
      
      
        

        
        //setCard((prev)=>prev.description+data.description)
      
   })}
    
     useEffect(()=>{
         allcarddata()
     },[])
     console.log(alldata)


    return (
    <div className="flex flex-wrap mt-6 "> 
         {alldata.map((item) => (
            <span key={item.id} style={{overflowWrap: 'break-word', wordWrap: 'break-word'}} className='m-4  card-container q duration-50 ease-in-out   hover:scale-110 transition-transform duration-350'>
                <AddCard title={item.title} description={item.description} onClick={()=>handleitemclick(item)} />
                </span>
                ))}
      
      
    </div>
  )
}

export default AllCards
