import React, { useEffect, useState } from 'react'
import { useRecoilState,useRecoilValue, useSetRecoilState } from 'recoil'
import { CardState } from './components/CardState'
import Card from './Card'
import BubbleLoader from './components/BubbleLoader'
import AddCard from './AddCard'

function AllCards() {
   
//   const setCard=useSetRecoilState(CardState)
//   const card=useRecoilValue(CardState)
//   const [content,setcontent]=useState([])
const [alldata,setalldata]=useState([])
const [loading, setLoading] = useState(true);

   const allcarddata=async()=>{
  //let token=localStorage.getItem('token')
      let notes=await fetch('http://localhost:5001/api/v1/auth/allnotes',{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      }
      }).then(async(notes)=>{
      const data=await notes.json()
           setalldata(data.allnotes)
           setLoading(false)
          })}
          // useEffect(() => {
          //   // Simulate data loading
          //   setTimeout(() => {
          //     setLoading(false);
          //   }, 3000); // Set loading to false after 3 seconds
          // }, []);
    
     useEffect(()=>{
         allcarddata()
        //  setTimeout(()=>{
        //   setLoading(false)
        //  },2000)
     },[])
     console.log(alldata)


    return (
    <div> 
     {loading ? <BubbleLoader /> : <span className="flex flex-wrap mt-6 ">{ 
          alldata.map((item) => (
            <span key={item.id} style={{overflowWrap: 'break-word', wordWrap: 'break-word'}} className='m-4  card-container q duration-50 ease-in-out   hover:scale-110 transition-transform duration-350'>
                <AddCard title={item.title} description={item.description} onClick={()=>handleitemclick(item)} />
                </span>
                ))}
                </span>
          }
      
    </div>
  )
}

export default AllCards
