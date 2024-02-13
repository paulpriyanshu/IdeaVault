import React, { useEffect, useState } from "react";
import { Link, Navigate, useFetcher, useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import Card from "../Card";
import { ToastContainer,toast,cssTransition } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


 function Forgotpass() {
    const [email, setemail]=useState("")
    const [count,setcount]=useState(0)
    const [sent,setsent]=useState(false)
  const [reply,setreply] = useState("")
  const navigateTo=useNavigate()
    const sendlink=async() =>{
      try{
      const send = await fetch('http://localhost:5001/api/v1/auth/login/forgetpassword',{
        method:"POST",
        body:JSON.stringify({
          email
        }),
        headers:{
          "Content-type":"application/json",
          
        }
      }).then(async(response)=>{
        const data=await response.json();
        console.log(data)
        toast.success("Email sent successfully")
      })
     
        

      

    }catch(err){
      toast.error("Error sending email")
    }
    
    
  }
  return (
    // <div>
    //     <div className="flex justify-center">
    //       
    //         </div>
    //     </div>
    <div className="flex justify-center items-center h-screen bg-slate-300">
         <div style={{width:550,height:560,overflowWrap: 'break-word', wordWrap: 'break-word'}} className="todo-container bg-green-100 rounded-3xl shadow-sm p-6 overflow-auto cursor-auto">
        <div>   
          <span><ToastContainer/></span>
        <span className="flex justify-start items-center ml-10 mb-7 text-slate-700 font font-semibold text-3xl  mt-10 ">
            <h1>Change Password</h1>
        </span>
        <div className="ml-12 mb-2 text-slate-600 font font font-semibold">
            <h1>
                Your Email
            </h1>
        </div>
        <div>
           <input type="text"  placeholder="Email address" size="lg" value={email}onChange={(e)=>setemail(e.target.value)}className=" w-100 h-12 ml-10 outline-none mb-4 border border-grey-200 px-5 py-2 rounded-2xl"/>
            </div>
     </div>
       
        
        <h2 className='px-10 text-black-900 max-w-400 overflow-hidden whitespace-pre-wrap' style={{overflowWrap: 'break-word', wordWrap: 'break-word' }}>
          <p className="mt-5 text-slate-400 font font-bold">
            Password reset link will be sent to your registered email address.
        </p>
    </h2>
    <span className="flex justify-center">
      {/* <div>
        <p>Sending In:{count}</p>
      </div>
      <br></br> */}
        <button  onClick={sendlink} className="m-5 mt-10 text-slate-600 font font-bold border border-grey-100 w-80 py-3 bg-green-300  rounded-3xl transition duration-500 hover:bg-green-400 transform hover:translate-y-[-10px]">
            Send Link
        </button>
    </span>
    </div>
    </div>
   
    )
  
  }

export default Forgotpass
  

