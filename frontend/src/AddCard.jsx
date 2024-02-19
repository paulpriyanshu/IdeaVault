import React, { useState,useEffect } from 'react'
import Draggable from 'react-draggable'
import reactSelect from 'react-select';
import  IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useNavigate } from'react-router-dom'
import './components/editicon.css'
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';


function AddCard({title,description,date}) {
  const [isSelected,setSelected]=useState(false)
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  let [edit_title,setedit_title] = useState("")
  let [edit_description,setedit_description] = useState("")
 const navigateTo=useNavigate()
  const cookie=new Cookies()
  const handleClick = () => {
    setSelected(true)
    toast.success("You have 2 seconds to edit or delete the note")
    localStorage.setItem("edit-title",title)
    localStorage.setItem("edit-description",description)
    setedit_title(localStorage.getItem("edit-title"));
    
    setedit_description(localStorage.getItem("edit-description"));
    
    setIsGlowing(true);
    setTimeout(() => {
      setIsGlowing(false);
      setSelected(false)
    },4000);
  };


  const handleClickOutside = (event) => {
    // let a=edit_title
    // console.log(a)
    if (
      !event.target.closest('.todo-container') 
     
    ) {
    
     
      setedit_description("");
      setedit_title("");
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // useEffect(() => {
  //   handleClickOutside()
  // },[handleClickOutside])

  const handlerefresh = () => {
    setRefresh(true);

    // After a short delay, set refresh state back to false
    setTimeout(() => {
      setRefresh(false);
    }, 100);
  }
  const handledelete=async() => {
    let object_id=localStorage.getItem('object_id')
    console.log(object_id);
    await fetch(`http://localhost:5001/api/v1/auth/notes/delete/${object_id}`,{
      method: 'DELETE',
      body: JSON.stringify({object_id}),
      headers: {
        "Content-type":"application/json",
        "Authorization": "Bearer " + cookie.get("token")
      }
  }).then(()=>{
          handlerefresh()
          window.location.reload()

        })
      

      }
      
      function  handleedit(){
       
        navigateTo('/edit')
        
      }

  
  
  return (
      <>
      <Draggable>
     
       
      <div style={{width:isEnlarged?600:350,height:isEnlarged?400:320,overflowWrap: 'break-word', wordWrap: 'break-word'}} onClick={handleClick} className={`todo-container bg-yellow-100 rounded-xl shadow-md overflow-auto  cursor-pointer  ${
        isGlowing ?  `m-5 mb-10 shadow-4xl px-5 w-60 sh shadow-yellow-300 q duration-1000 ease-in-out` : ''
      } ${isEnlarged ? "w-1/2" : ''}`}
        >
          
      <div className={`delete-icon absolute top-5 right-6 ${isSelected?'visible':''} `} onClick={handledelete} >
        {isSelected &&(<IconButton aria-label="delete">
             <ClearOutlinedIcon/>
           </IconButton>
        )}
        </div>
       
        <div className="absolute top-7">
    <h1 className='px-10 py-1 text-3xl text-black-400 font-semibold'>{title}</h1>
    <h2 className='px-10 text-black-900 text-lg max-w-400  whitespace-pre-wrap' style={{overflowWrap: 'break-word', wordWrap: 'break-word' }}>
          <p className="px-2 py-1">
            {description}
            </p>
        </h2>
    </div>
    
   
      <h5 className='absolute bottom-2 right-4 text-sm text-slate-400 font-light'>{date}</h5>
      
      <div className={`edit-icon absolute top-5 right-14 ${isSelected?'visible':''}`} onClick={handleedit}>
         {isSelected&&(
           <IconButton aria-label="Edit">
           <EditIcon/>
         </IconButton>
         )}
        
        
         </div>
      </div>
      
      
      
      </Draggable>
      </>
    );
  
}

export default AddCard
