import React from 'react'
import './About.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling,faCloud,faBell,faSun,faChartLine } from '@fortawesome/free-solid-svg-icons';


const About = () => {
  return (
      <div className='about-page'>
          <header>
          <h1>Welcome to AgriSense</h1>
          </header>
          <section className='intro'>
              <p>
                  AgriSense is an innovative agriculture smart web application designed to provide farmers with valuable insights about various types of crops, market trends, and weather predictions.
              </p>
          </section>
          <section className='mission'>
              <h2>My Mission</h2>
              <p>
              My mission is to empower farmers with data-driven decision making, enabling them to optimize their farming practices, reduce costs, and increase yields.
              </p>
          </section>
          <section className='features'>
              <h2>Key Features</h2>
              <ul>
          <li>
            <i className="fas fa-seedling"></i><FontAwesomeIcon icon={faSeedling} />
            Crop Analysis: Get real-time crop data to optimize various crop practices.
          </li>
          <li>
            <i className="fas fa-cloud"></i><FontAwesomeIcon icon={faCloud} />
            Historical Weather Data: Access past weather information to identify patterns and plan ahead.
          </li>
          <li>
            <i className="fas fa-bell"></i><FontAwesomeIcon icon={faBell} />
            Personalized Weather Alerts: Receive timely notifications about weather conditions that matter to you.
          </li>
          <li>
            <i className="fas fa-chart-line"></i><FontAwesomeIcon icon={faChartLine} />
            Market Trends: Stay up-to-date with the latest crop prices and market trends.
          </li>
          <li>
            <i className="fas fa-sun"></i><FontAwesomeIcon icon={faSun} />
            Weather Predictions: Get accurate weather forecasts to plan your farming activities.
          </li>
        </ul>
          </section>
          <section className='footer'>
              <p>
              At AgriSense, I am are committed to providing a robust and user-friendly platform that helps farmers succeed in today's competitive agricultural landscape.
              </p>
          </section>
      </div>
  )
}

export default About