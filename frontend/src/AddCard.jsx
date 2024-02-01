import React, { useState } from 'react'
import Draggable from 'react-draggable'
import reactSelect from 'react-select';

function AddCard({title,description}) {
  const [isSelected,setSelected]=useState(false)
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const handleClick = () => {
    setIsEnlarged(!isEnlarged);
    setIsEditable(!isEditable);
  };
  

    return (
      <>
      <Draggable>
      
       
      <div style={{width:isEnlarged?800:450,height:isEnlarged?600:300,overflowWrap: 'break-word', wordWrap: 'break-word'}} className={`todo-container bg-yellow-100 rounded-xl shadow-md overflow-auto  cursor-pointer ${isEnlarged ? 'transform scale-110' : ''}`}
        onClick={handleClick}>
        <div><button  class="absolute top-3  text-3xl right-4 px-1  text-slate-300 rounded-full hover:text-slate-400 focus:outline-none 
     " onClick={AddCard}>
    +
    </button></div>
    <h1 className='px-10 py-5 text-3xl text-black-400 font-semibold'>{title}</h1>
    <h2 className='px-10 text-black-900 max-w-400  whitespace-pre-wrap' style={{overflowWrap: 'break-word', wordWrap: 'break-word' }}>
          <p className="px-2 py-1">
            {description}
            </p>
        </h2>
      </div>
      
      
      
      </Draggable>
      </>
    );
  
}

export default AddCard
