import React, { useEffect, useState } from 'react'
import { useRecoilState,useRecoilValue, useSetRecoilState } from 'recoil'
import { CardState } from './components/CardState'
import Card from './Card'

function AllCards() {
    let props = {
        title:"hello",
        description:"bye"
      }
  const setCard=useSetRecoilState(CardState)
  const card=useRecoilValue(CardState)
  const [content,setcontent]=useState([])
    const allcarddata=async()=>{
  //let token=localStorage.getItem('token')
      let notes=await fetch('http://localhost:5001/api/v1/auth/allnotes',{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      }
      }).then(async(notes)=>{
        const data=await notes.json()
        console.log(data)
        setcontent(data)
        setCard(content)

        
        //setCard((prev)=>prev.description+data.description)
      })
    }
   

    return (
    <div> 
      {card.map((i)=>(
        <div key={i.id}>
            <Card props={i}/>
        </div>
      ))}
      
    </div>
  )
}

export default AllCards
