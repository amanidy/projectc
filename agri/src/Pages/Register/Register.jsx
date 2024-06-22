import './Register.css';
import Axios from "axios"
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:5000/auth/signup', {
            username,
            email,
            password
        }).then(response => {
            if (response.data.status) {
                navigate("/login")
            } else {
                alert(response.data.message)
            }
            
        }).catch(err => {
            console.error("Error :",err)
        })
    }

  return (
      <div className='sign-up-container'>
          <h2>Sign Up</h2>

          <form className='sign-up-form' onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input type='text' id='username' placeholder='username'
              onChange={(e) => setUsername(e.target.value)} />

              <label htmlFor='email'>Email:</label>
              <input type="email" id='email' autoComplete="off" placeholder="email"
              onChange={(e) => setEmail(e.target.value)}/>
              
              <label htmlFor='password'>Password:</label>
              <input type='password' id='password' placeholder='******'
              onChange={(e) => setPassword(e.target.value)}/>
              
              <button type='submit'>Sign Up</button>
              <p>Have an account? <Link to="/login">Login</Link></p>
          </form>
      
      </div>
  )
}

export default Register;