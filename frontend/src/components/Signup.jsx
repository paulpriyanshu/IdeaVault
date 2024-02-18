import React, { useState } from 'react'
import {TERipple } from 'tw-elements-react'
import {useNavigate} from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Cookies from 'universal-cookie'

//import { userState } from './UserState'
//import {setobjectid} from '../CreateUser'
function Signup() {
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [name,setname]=useState("")
  const [Confpassword,setConfpassword]=useState("")
  const [notesid,setnotesid]=useState("")
  const cookie=new Cookies()
    const navigateTo=useNavigate()

  //   let signup={
  //     name:name,
  //     email:email,
  //     password:password,
  //     Confpassword:Confpassword
  // }
    const handlesignup=async(e)=>{
      e.preventDefault()
      localStorage.removeItem('email')
      localStorage.removeItem('title')
      localStorage.removeItem('des')
      await fetch("http://localhost:5001/api/v1/auth/signup",{
          method:"POST",
          body: JSON.stringify({
            Name:name,
            Email:email,
            Password:password,
            ConfPassword:Confpassword
          }),
          headers:{
            "Content-type":"application/json",
            
          },
          
        }).then(async(response)=>{
          
         
          const data = await response.json();
          console.log(data)
          cookie.set("token", data.token)
          const id = data.id;
          console.log(id)
          
          navigateTo(`/create/`)

        })
        

  }
  // const updateemptynotes=async()=>{
  //   await fetch(`http://localhost:5001/notes/update/${objectid}`,{
  //     method:"PATCH",
  //     body: JSON.stringify({
  //       title:user,
  //       description:des
  //     }),
  //     headers:{
  //       "Content-type":"application/json"
  //     }
  //   }) 
  //   .then(async function(res) {
  //     const json = await res.json();
  //     console.log(json)
  //     alert("Data updated");
    
  //   })
  // }
 


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
        <div style={{marginLeft:80}} className="mb-12 md:mb-0  md:w-8/12 lg:w-5/12 xl:w-5/12">
          <form onSubmit={handlesignup}>
            {/* <!--Sign in section--> */}
          <div>
          <input
          
              type="text"
              placeholder="Full Name"
              size="lg"
              value={name}
              onChange={(e)=>setname(e.target.value)}
              className="mb-4 outline-none border-grey-300 w-2/3 border border-grey-300 px-2 py-2 rounded-lg"
              ></input>
          </div>
            
             
            {/* <!-- Email input --> */}
            <div>
            <input
              type="email"
              placeholder="Email address"
              size="lg"
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              className="mb-4 outline-none w-2/3 border border-grey-300 px-2 py-2 rounded-lg"
              ></input>

            
            </div>
              {/* <!--Password input--> */}
              <div>
              <input
              type="password"
              placeholder="Password"
              className="mb-4 w-2/3 outline-none border border-grey-300 px-2 py-2 rounded-lg"
              value={password}
              onChange={(e)=>{setpassword(e.target.value)}}
              size="lg"
              ></input>
              
              </div>
              <div>
              <input
              type="password"
              placeholder="Confirm Password"
              className="mb-4  w-2/3  outline-none border border-grey-300 px-2 py-2 rounded-lg"
              value={Confpassword}
              onChange={(e)=>{setConfpassword(e.target.value)}}
              size="lg"
              ></input>

              </div>
              
           
            {/* <!-- Login button --> */}
            <div className="text-center lg:text-left">
              <TERipple rippleColor="light">
                <button
                  type="submit"
                  className="inline-block bg-blue-600 rounded   bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    
                >
                  Sign Up
                </button>
              </TERipple>

              {/* <!-- Register link --> */}
             
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  )
}

export default Signup
