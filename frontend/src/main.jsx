import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './index.css'
import CreateUser from './CreateUser.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Auth from './components/Auth.jsx'
import Signup from './components/Signup.jsx'
import { RecoilRoot } from 'recoil'
import AllCards from './AllCards.jsx'
const router=createBrowserRouter([
  {
    path:'/',
    element:<Auth/>
    
  },
  {
    path:'/allnotes',
    element:<AllCards/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/create/',
    element:<CreateUser/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
    <RouterProvider router={router}/>
    </RecoilRoot>
  </React.StrictMode>,
)
