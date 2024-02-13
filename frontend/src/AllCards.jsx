import React, { useEffect, useState } from 'react'
import { useRecoilState,useRecoilValue, useSetRecoilState } from 'recoil'
import { CardState } from './components/CardState'
import Card from './Card'
import  './components/SearchBarstyle.css'
import BubbleLoader from './components/BubbleLoader'
import { ToastContainer,toast,cssTransition } from 'react-toastify'

import AddCard from './AddCard'
//import SearchBar from './components/SearchBar'
//import { HandymanOutlined } from '@mui/icons-material'

let titles=[]
function AllCards() {
   //const queryValues = useRecoilValue(queryState)
//   const setCard=useSetRecoilState(CardState)
//   const card=useRecoilValue(CardState)
//   const [content,setcontent]=useState([])
const [alldata,setalldata]=useState([])
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState([]);
const [query,setquery]=useState("") 
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  



   const allcarddata=async()=>{
  //let token=localStorage.getItem('token')
      let notes=await fetch('http://localhost:5001/api/v1/auth/allnotes',{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      }
      }).then(async(notes)=>{
      const data=await notes.json()
           setalldata(data.allnotes)
           //console.log(data.allnotes[0].title)
            titles = data.allnotes.map(note => note);
           
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
     
  
      
     const handlequery = (e)=>{
      setquery(e.target.value);
      
      if (e.key ==="Enter") {
        
        const results = titles.filter(note =>
          note.title.includes(query)
        );
        setalldata(results)
        console.log(results);
        //console.log(titles)
        // setquery(results);
      }
     
    
    }
     
   
     
    
    return (
    <div className='min-h-screen w-full p-4 bg-gray-300 flex flex-col items-center justify-center'> 
    <div className="p-10 flex justify-center"> 
    <div className="search">
    <input type="text"  onKeyDown={handlequery} className="search__input" placeholder="Search Notes" value={query} onChange={handlequery} size={{width:50}}/>
    <button className="search__button">
        <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24"/>
            <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
           
        </button>
     
    </div>
    </div>
    <div>{loading?<><BubbleLoader/></>:alldata.length===0?<div className="flex justify-center text-3xl"><h1>Empty</h1></div>: <Results data={alldata}/> }</div>
     
  
     </div> 
    
  )
  
  
}

// import React, { useEffect, useState } from 'react'

// import { useRecoilState } from 'recoil';

  // const query = {
  //   key: "query",
  //   default: "",
  // };
//export const queryState = query;



function Results({ data }) {
  const [objid,setobjid]=useState("")
  const [isGlowing, setIsGlowing] = useState(false);
//   const [edit_title,setedit_title]=useState("");
// const [edit_description,setedit_description]=useState("");
  const handleobjid = ()=>{
    localStorage.setItem("object_id",objid)
   
  }
  useEffect(()=>{
    handleobjid()
  },[objid,setobjid])
  const handleClickOutside = (event) => {
    // let a=edit_title
    // console.log(a)
    if (
      !event.target.closest('.card-container') &&
      !event.target.closest('.search-bar')
    ) {
      setobjid('');
     localStorage.removeItem("edit-description")
     localStorage.removeItem("edit-title")
     
    }
  };
  const notfication=()=>{
    toast.success("You have 2 seconds to edit or delete the note")
   
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div >
      <span><ToastContainer/></span>


      
     {<span className="flex flex-wrap  mt-6 " >{ 
          data.map((item) => (
            <span key={item.id} style={{overflowWrap: 'break-word', wordWrap: 'break-word'}} onClick={()=>setobjid(item.id)} className={`m-4  card-container q duration-50 ease-in-out   hover:scale-110 transition-transform duration-350 `} >
                <AddCard title={item.title} description={item.description} date={item.date}  />
                
                </span>
                ))}
                </span>
          }
    </div>
  );
}


export default AllCards
