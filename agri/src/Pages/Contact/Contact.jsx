import React, { useState } from 'react'
import Axios from 'axios';
import './Contact.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone,faMapMarkerAlt,faEnvelope} from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('http://localhost:5000/auth/contact', { name, email, message });
            console.log(response.data);
            alert("Message sent successfully")
            setName('');
            setEmail('');
            setMessage('');
            
        } catch (error) {
            console.error(error);
            alert('Error sending message.Please try again.')
        }
    }


  return (
      <div className='contact-page'>
          <header>
          <h1>Get in touch</h1>
          </header>
          <section className='contact-info'>
              <h2>Contact Information</h2>
              <ul>
                  <li>
                     <i className="fas fa-map-marker-alt"></i> <FontAwesomeIcon  icon={faMapMarkerAlt}/> 
                  <span>Address:</span>****
                  </li>  
                  
                  <li>
                      <i className="fas fa-phone"></i><FontAwesomeIcon  icon={faPhone}/>
                  <span>Phone:</span> *****
                  </li>

                  <li>
                      <i className="fas fa-envelope"></i><FontAwesomeIcon icon={faEnvelope}/>
                  <span>Email:</span><a href='mailto:amaniarnold08@gmail.com'>amaniarnold08@gmail.com</a>
                  </li>
              </ul>
          
          </section>
          <section className='contact-form'>
              <h2>Message Us</h2>
              <form onSubmit={handleSubmit}>
                  <label>
                      Name:
                      <input type='text'  name='name'value={name} onChange={(e) => setName(e.target.value)}/>
                  </label>
                  <label>
                      Email:
                      <input type='email'  name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </label>
                  <label>
                      Message:
                      <textarea  name='message'value={message} onChange={(e) => setMessage(e.target.value)}/>
                  </label>
              <button type='submit'>Send</button>
              </form>
          
          </section>
      </div>
  )
}

export default Contact;