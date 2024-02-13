import React, { useEffect, useState } from "react";
import { Link, Navigate, useFetcher, useNavigate, useParams } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import Card from "../Card";
import { ToastContainer,toast,cssTransition } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


function Resetpass() {
    const { token } = useParams();
    const [Newpass, Setnewpass]=useState("");
    const [confirmpass, Setconfirmpass]=useState("");
    console.log(token)
    const newpass=(e)=>{
        Setnewpass(e.target.value);
        
    }
    const confirmpw=(e)=>{
        Setconfirmpass(e.target.value);
        
    }
    const resetpw=async()=>{
        if(Newpass!==confirmpass){
            toast.error("Passwords do not match")
        }else{
        const newpw=await fetch(`http://localhost:5001/api/v1/auth/login/resetpassword/${token}`,{
            method:'PATCH',
            body:JSON.stringify({
                password:Newpass,
                Confpassword:confirmpass
            }),
            headers: {
                "Content-type":"application/json",
                
            }
        }).then(async(response)=>{
            const data=await response.json();
            console.log(data)
            toast.success("Password changed successfully")
        })
        }
        useEffect(()=>{
            localStorage.setItem("passwordtoken",req.params.token)
        })
    }
  return (
    
    <div className="flex justify-center items-center min-h-screen bg-slate-300">
    <div style={{width:550,height:570,overflowWrap: 'break-word', wordWrap: 'break-word'}} className="todo-container bg-green-100 rounded-3xl shadow-sm p-6 overflow-auto cursor-auto">
   <div>   
     <span><ToastContainer/></span>
   <span className="flex justify-start items-center ml-10 mb-7 text-slate-700 font font-semibold text-3xl  mt-5 ">
       <h1>Reset Password</h1>
   </span>
   <div className="ml-12 mb-2 text-slate-600 font font font-semibold">
       <h1>
           New Password
       </h1>
   </div>
   <div>
      <input type="text"  placeholder="New Password" size="lg" onChange={newpass} className=" w-80 h-12 ml-10 outline-none mb-4 border border-grey-200 px-5 py-2 rounded-2xl"/>
       </div>
       <div className="ml-12 mb-2 text-slate-600 font font font-semibold">
       <h1>
           Confirm Password
       </h1>
   </div>
       <div>
      <input type="text"  placeholder="Confirm Password" size="lg" onChange={confirmpw} className=" w-80 h-12 ml-10 outline-none mb-4 border border-grey-200 px-5 py-2 rounded-2xl"/>
       </div>
</div>
  
   
   
<span className="flex justify-center">
   <button  onClick={resetpw} className=" mt-7 text-slate-600 font font-bold border border-grey-100 w-80 py-3 bg-green-300  rounded-3xl transition duration-500 hover:bg-green-400 transform hover:translate-y-[-10px]">
       Reset Password
   </button>
</span>
</div>
</div>


   
      

  )
}

export default Resetpass
