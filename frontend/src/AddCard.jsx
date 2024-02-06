import React, { useState } from 'react'
import Draggable from 'react-draggable'
import reactSelect from 'react-select';
import  IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useNavigate } from'react-router-dom'
function AddCard({title,description,date}) {
  const [isSelected,setSelected]=useState(false)
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [refresh, setRefresh] = useState(false);
 const navigateTo=useNavigate()

  const handleClick = () => {
    
    setIsGlowing(true);
    setTimeout(() => {
      setIsGlowing(false);
    }, 1500);
  };
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
        "Authorization": "Bearer " + localStorage.getItem("token")
      }

        }


        ).then(()=>{
          handlerefresh()
          window.location.reload()

        })
      

      }
      
      function  handleedit(){
        navigateTo('/create')
        
      }

  
  
  return (
      <>
      <Draggable>
      
       
      <div style={{width:isEnlarged?800:450,height:isEnlarged?600:340,overflowWrap: 'break-word', wordWrap: 'break-word'}} onClick={handleClick} className={`todo-container bg-yellow-100 rounded-xl shadow-md overflow-auto  cursor-pointer ${
        isGlowing ? "shadow-3xl sh shadow-yellow-300 q duration-500 ease-in-out" : ''
      }`}
        >
     
      <div className="absolute top-5 right-6 " onClick={handledelete} >
        
        <IconButton aria-label="delete">
             <ClearOutlinedIcon/>
           </IconButton>
        </div>
        <div className='absolute top-5 left-6' onClick={handleedit}>
         <IconButton aria-label="edit">
             <EditIcon/>
           </IconButton>
        
         </div>

      
         
         
        
          
          {/* <button  className="absolute top-3  text-3xl right-4 px-1  text-slate-300 rounded-full hover:text-slate-400 focus:outline-none 
     " onClick={AddCard}>
    +
    </button>
     */}
    <div className="absolute top-7">
    <h1 className='px-10 py-5 text-3xl text-black-400 font-semibold'>{title}</h1>
    <h2 className='px-10 text-black-900 text-lg max-w-400  whitespace-pre-wrap' style={{overflowWrap: 'break-word', wordWrap: 'break-word' }}>
          <p className="px-2 py-1">
            {description}
            </p>
        </h2>
    </div>
    
    
      <h5 className='absolute bottom-2 right-4 text-sm text-slate-400 font-light'>{date}</h5>
      </div>
      
      
      
      </Draggable>
      </>
    );
  
}

export default AddCard
