import React from 'react'
import Draggable from 'react-draggable'

function AddCard({title,description}) {
  
    return (
      <>
      <Draggable>
      <div style={{width:500,height:300,overflowWrap: 'break-word', wordWrap: 'break-word'}} className=" todo-container bg-yellow-100 rounded-xl shadow-md">
        <div><button  class="absolute top-3  text-3xl right-4 px-1  text-slate-300 rounded-full hover:text-slate-400 focus:outline-none 
     " onClick={AddCard}>
    +
    </button></div>
    <h1 className='px-10 py-5 text-3xl text-black-400 font-semibold'>{title}</h1>
    <h2 className='px-10 text-black-900 max-w-400 overflow-hidden whitespace-normal' style={{overflowWrap: 'break-word', wordWrap: 'break-word' }}>
          <p className="">
            {description}
            </p>
        </h2>
      </div>
      </Draggable>
      </>
    );
  
}

export default AddCard
