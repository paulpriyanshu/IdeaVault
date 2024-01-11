import React from 'react'

function Card({props}) {
  return (
    <div  style={{margin:200,marginLeft:400,marginTop:340,width:800,height:400,overflowWrap: 'break-word', wordWrap: 'break-word'}} className="bg-yellow-100 rounded-xl shadow-md" >
        <h1 className='px-10 py-5 text-3xl text-black-400 font-semibold' >{props.title}</h1>
        
        <h2 className='px-10 text-black-900 max-w-400 overflow-hidden whitespace-normal' style={{overflowWrap: 'break-word', wordWrap: 'break-word' }}>
          <p className="">
            {props.description}
            </p>
        </h2>
    </div>
  )
}

export default Card
