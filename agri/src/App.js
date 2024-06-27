import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Background from './Components/Background/Background';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Explore from "./Pages/Explore/Explore.jsx"
import ForgotPassword from './Components/forgotPassword/ForgotPassword.jsx';
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx';
import About from './Pages/About/About.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css'

const App = () => {
  const heroData = [
    { text1: "Discover new farming techniques", text2: "agriculture with my application" },
    { text1: "Discover modern crop methods", text2: "and practices that you'll be using" },
    { text1: "Stay up to date on the", text2: " latest agri news and trends" }
  ];

  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  console.log('App component:', { playStatus, heroCount });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeroCount((count) => (count === heroData.length - 1 ? 0 : count + 1));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [heroData.length]);

  return (
    <div className='App' >
      <Navbar />
      <Background playStatus={playStatus} heroStatus={heroCount} />
      <Routes>
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route
          path="/about"
          element ={<About />}
        />
        <Route
          path="/contact"
          element ={<Contact />}
        />
        <Route 
          path="/resetPassword/:token" 
          element={<ResetPassword />} 
        />
        <Route
          path='/forgotPassword'
          element ={<ForgotPassword />}
        />
        
        <Route
          path='/explore'
          element ={<Explore />}
        />
        <Route 
          path="/signup" 
          element={<Register />} 
        />
         
        <Route 
          path="/agrisense" 
          element={
            <Hero
              heroData={heroData}
              setHeroCount={setHeroCount}
              heroCount={heroCount}
              playStatus={playStatus}
              setPlayStatus={setPlayStatus}
            />
          } 
        />
      </Routes>
    </div>
  );
};

export default App;
