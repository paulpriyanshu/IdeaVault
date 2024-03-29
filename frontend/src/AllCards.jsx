import React, { useEffect, useState } from 'react'
import { useRecoilState,useRecoilValue, useSetRecoilState } from 'recoil'
import { CardState } from './components/CardState'
import Card from './Card'
import  './components/SearchBarstyle.css'
import BubbleLoader from './components/BubbleLoader'
import { ToastContainer,toast,cssTransition } from 'react-toastify'


import AddCard from './AddCard'
import Cookies from 'universal-cookie'
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
  

const cookies=new Cookies();

   const allcarddata=async()=>{
  //let token=localStorage.getItem('token')
  console.log(cookies.get('token'));
      let notes=await fetch('http://localhost:5001/api/v1/auth/allnotes',{
        headers: {
          "Authorization": "Bearer " + cookies.get("token")
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
    <div className="p-10 mb-10 flex justify-center"> 
    <div className="search">
    <input type="text"  onKeyDown={handlequery} className="search__input" placeholder="Search Notes" value={query} onChange={handlequery} size={{width:50}}/>
    
     
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
