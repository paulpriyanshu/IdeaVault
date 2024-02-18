import React, { useEffect, useState } from "react";
import { Link, Navigate, useFetcher, useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import Card from "../Card";
import { ToastContainer,toast,cssTransition } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useRecoilState } from "recoil";
import { CardState } from "./CardState";
import Cookies from "universal-cookie";
let datas=[]



export default function Auth() {

  const [email,setemail]=useState(localStorage.getItem('email')|| null)
  const [password,setpassword]=useState(localStorage.getItem('password') || null)
  const navigateTo=useNavigate()
  const [card,setCard]=useRecoilState(CardState)
  const[mount,setmount]=useState(false)
  const [token,setToken]=useState(null) 

  const cookies=new Cookies();
  
  localStorage.setItem('email',email);
  localStorage.setItem('password',password);
  useEffect(()=>{
    localStorage.setItem('email',email);
  },[email])
  useEffect(()=>{
    localStorage.setItem('password',password);
  },[password])
  // if(storedemail&&storedpw){
  //   setemail(storedemail)
  //   setpassword(storedpw)
  // }
  
  //   useEffect(()=>{
  //   if(!mount){
  //     setmount(true)
  //     return
  //   }
  // })
  var handlelogin=async(e)=>{
    let cookies=new Cookies()
  
    //console.log(token)
  // let token=localStorage.getItem("token")
  // console.log(token)
  try{
  const response=await fetch("http://localhost:5001/api/v1/auth/login",{
    method:"POST",
    body:JSON.stringify({
      email:email,
      password:password
    }),
    headers:{
      "Content-type":"application/json",
      
    }
    })
 //.then(async(response) => {
//   // const tokencookie=await response.headers
//   //  console.log(tokencookie)
// })
if (!response.ok) {
  const errorData = await response.json();
  toast.error(errorData.error); // Show toast error
} else {
    toast.success("logged in")
  const data=await response.json()
  // const tokenval= response.headers.get("Set-Cookie")
  // console.log(tokenval)
  //console.log(data)
  //console.log(data.error)
 
    let userdata={title: data.data.title,
      description: data.data.description}
      datas.push(userdata)
      const latest=datas[datas.length-1]
      setCard(latest)
     // console.log(userdata)
      //console.log(card)
      localStorage.setItem("title", data.data.title)
      localStorage.setItem("des", data.data.description)
      cookies.set("token", data.data.token)
      
      // let token=cookies.get('token')  
      // const cookivalue=document.cookie.split(';').find(row=>row.startsWith("jwt="))
      // if(cookivalue){
      //   const token=cookivalue.split('=')[1];
      //   setToken(token)
      //   console.log(token)
      // }
     
      
      datas.splice(0,datas.length)
      navigateTo('/create/')
    }
   
  }catch(error){
      toast.error("internal")
  }
}
    
  





// useEffect(()=>{
//   handlelogin()
// },[])




return (
    <section className="h-screen">
      <div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div  className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div style={{marginLeft:130}} className="mb-12 md:mb-0  md:w-8/12 lg:w-5/12 xl:w-5/12">
         
              {/* <!--Sign in section--> */}
             
               
              {/* <!-- Email input --> */}
              <input

                type="email"
                placeholder="Email address"
                size="lg"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                className=" w-3/4 outline-none mb-4 border border-grey-300 px-2 py-2 rounded-xl"
                ></input>
                <br></br>

                {/* <!--Password input--> */}
                <input  type="password"
                placeholder="Password"
                className="w-3/4 outline-none mb-4 border border-grey-300 px-2 py-2 rounded-xl"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                size="lg"
                ></input>
               
                 <span><ToastContainer /></span>
              <div className="mt-3 text-center lg:text-left">
              
                <button
                  onClick={handlelogin}
                  className=" bg-blue-600 rounded-2xl bg-primary px-5  pb-2 pt-2 text-sm font-medium uppercase leading-normal text-white transition duration-500 hover:bg-blue-700 transform hover:translate-y-[-10px]"
                  >
                  LOGIN
                </button>
                <br/>
                <div className="flex justify-between mr-36">
                <div>
                <Link to="/signup" className="text text-sm ">
                Not registered yet?
                Sign up
                </Link>
                </div>
                <div>
                <Link to="/forgotpassword" className="text text-sm ">
                  Forgot password ?
                  </Link>
                </div>

                </div>
                
                
             
            </div>

              {/* <!-- Login button --> */}
     
              
           
          </div>
        </div>
      </div>
    </section>
  );
}