import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast"
import axios from "axios"
import {useNavigate, useLocation} from "react-router-dom"
import "../../styles/AuthStyles.css"
import { useAuth } from '../context/auth'



const Login = () => {
    const[email,setEmail]= useState("")
    const[password,setPassword]= useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const [auth, setAuth] = useAuth()

    const handleSubmit = async (e)=>{
      e.preventDefault()
      try {
        const res = await axios.post('/api/v1/auth/login',
        {email,password})
        if(res && res.data.success){
          toast.success(res.data && res.data.message)
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token
          })
          localStorage.setItem("auth",JSON.stringify(res.data))
          navigate(location.state || "/")
        }else{
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went Wrong")
      }
   
    }
  return (
    <>
     <Layout title="Login - Ecommerce">
        <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
  <div className="mb-3">
    <input type="email" className="form-control" value={email} 
    onChange={(e)=>setEmail(e.target.value)} id="email" placeholder='Enter Your Email' required />
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" value={password} 
     onChange={(e)=>setPassword(e.target.value)}
     id="password" placeholder='Enter Your Password' required />
  </div>
  <div className="mb-3">
  <button type="button" className="btn btn-primary" onClick={()=>{navigate("/forgot-password")}}>Forgot Password</button>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form> 
        </div>
      </Layout> 
    </>
  )
}

export default Login
