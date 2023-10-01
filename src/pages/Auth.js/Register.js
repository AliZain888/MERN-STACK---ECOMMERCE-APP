import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import {toast} from "react-hot-toast"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "../../styles/AuthStyles.css"

const Register = () => {
    const[name,setName]= useState("")
    const[email,setEmail]= useState("")
    const[password,setPassword]= useState("")
    const[phone,setPhone]= useState("")
    const[address,setAddress] = useState("")
    const[answer, setAnswer] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
      e.preventDefault()
      try {
        const res = await axios.post('/api/v1/auth/register',
        {name,email,password,address,phone,answer})
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
    <>
      <Layout title="Sign Up - Ecommerce">
        <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1>Sign-Up Form</h1>
  <div className="mb-3">
    <input type="text" className="form-control" value={name} 
    onChange={(e)=>setName(e.target.value)} id="name" placeholder='Enter Your Name' required />
  </div>
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
  <input type="text" className="form-control" value={phone} 
  onChange={(e)=>setPhone(e.target.value)} id="phone" placeholder='Enter Your Phone No' required/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" value={address} onChange={(e)=>setAddress(e.target.value)} id="address" placeholder='Enter Your Address' required/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" value={answer} onChange={(e)=>setAnswer(e.target.value)} id="answer" placeholder='Your Favourite Game' required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
      </Layout>
    </>
  )
}

export default Register
