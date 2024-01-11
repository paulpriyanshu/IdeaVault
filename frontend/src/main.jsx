import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './index.css'
import CreateUser from './CreateUser.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Auth from './components/Auth.jsx'
const router=createBrowserRouter([
  {
    path:'/',
    element:<Auth/>
    
  },
  {
    path:'/create',
    element:<CreateUser/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
