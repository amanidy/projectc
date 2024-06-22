import './Login.css';
import Axios from "axios"
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {

   
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
     
  Axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:5000/auth/login", {
            email,
            password
        }).then(response => {
            if (response.data.status) {
                navigate("/explore")
            }
            
        }).catch(err => {
            console.error("Error :",err)
        })
    }

  return (
      <div className='sign-in-container'>
          <h2>Sign In</h2>

          <form className='sign-in-form' onSubmit={handleSubmit}>
              
              <label htmlFor='email'>Email:</label>
              <input type="email" id='email' autoComplete="off" placeholder="email"
              onChange={(e) => setEmail(e.target.value)}/>
              
              <label htmlFor='password'>Password:</label>
              <input type='password' id='password' placeholder='******'
              onChange={(e) => setPassword(e.target.value)}/>
              
              <button type='submit'>Sign In</button>
              <Link to="/forgotPassword">Forgot Password?</Link>
              <p>Do not have an account? <Link to="/signup">Register</Link></p>
          </form>
      
      </div>
  )
}

export default Login;