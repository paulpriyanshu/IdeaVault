import React, { useState } from 'react'
import { TEInput,TERipple } from 'tw-elements-react'
import {useNavigate} from 'react-router-dom'
function Signup() {
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [name,setname]=useState("")
    const [Confpassword,SetConfpassword]=useState("")
    const navigateTo=useNavigate()

    const handlesignup=async(e)=>{
        e.preventDefault()
        await fetch("http://localhost:5001/signup",{
            method:"POST",
            body: JSON.stringify({
              Name:name,
              Email:email,
              Password:password,
              Confpassword:Confpassword
            }),
            headers:{
              "Content-type":"application/json"
            }
          }).then(async(res)=>{
            const data=await res.json()
            navigateTo('/create')
          })
    }

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
        <div style={{marginRight:80}} className="mb-12 md:mb-0  md:w-8/12 lg:w-5/12 xl:w-5/12">
          <form onSubmit={handlesignup}>
            {/* <!--Sign in section--> */}

            <TEInput
              type="text"
              placeholder="Full Name"
              size="lg"
              value={name}
              onChange={(e)=>setname(e.target.value)}
              className="mb-4 border border-grey-300 px-1 py-1 rounded-lg"
              ></TEInput>
             
            {/* <!-- Email input --> */}
            <TEInput
              type="email"
              placeholder="Email address"
              size="lg"
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              className="mb-4 border border-grey-300 px- py-2 rounded-lg"
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
              type="password"
              placeholder="Password"
              className="mb-4 border border-grey-300 px-2 py-2 rounded-lg"
              value={password}
              onChange={(e)=>{setpassword(e.target.value)}}
              size="lg"
              ></TEInput>
              <TEInput
              type="password"
              placeholder="Confirm Password"
              className="mb-4 border border-grey-300 px-2 py-2 rounded-lg"
              value={Confpassword}
              onChange={(e)=>{SetConfpassword(e.target.value)}}
              size="lg"
              ></TEInput>

            <div className="mb-6 flex items-center justify-between">
              {/* <!-- Remember me checkbox --> */}
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                 type="checkbox"
                  value=""
                  id="exampleCheck2"
                />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="exampleCheck2"
                >
                  Remember me
                </label>
              </div>

              {/* <!--Forgot password link--> */}
              <a href="#!">Forgot password?</a>
            </div>

            {/* <!-- Login button --> */}
            <div className="text-center lg:text-left">
              <TERipple rippleColor="light">
                <button
                  type="submit"
                  className="inline-block bg-blue-600 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    
                >
                  Login
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
