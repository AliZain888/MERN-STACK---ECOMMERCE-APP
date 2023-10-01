import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import "../../styles/AuthStyles.css"
import axios from 'axios'

const ForgotPassword = () => {
    const[email,setEmail]= useState("")
    const[newPassword,setNewPassword]= useState("")
    const[answer,setAnswer]= useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
      e.preventDefault()
      try {
        const res = await axios.post('/api/v1/auth/forgot-password',
        {email,newPassword,answer})
        if(res && res.data.success){
          toast.success(res.data && res.data.message)
       
          navigate("/login")
        }else{
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went Wrong")
      }
   
    }
  return (
    <Layout title="Forgot Password - Ecommerce App">
       <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
  <div className="mb-3">
    <input type="email" className="form-control" value={email} 
    onChange={(e)=>setEmail(e.target.value)} id="email" placeholder='Enter Your Email' required />
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" value={answer} 
    onChange={(e)=>setAnswer(e.target.value)} id="answer" placeholder='Enter Name Of Favourite Game' required />
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" value={newPassword} 
     onChange={(e)=>setNewPassword(e.target.value)}
     id="newpassword" placeholder='Enter Your New Password' required />
  </div>
  <button type="submit" className="btn btn-primary">Reset</button>
</form> 
        </div>
    </Layout>
  )
}

export default ForgotPassword
