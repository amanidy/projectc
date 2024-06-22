import React from 'react';
import { useNavigate } from 'react-router-dom';
import play_icon from '../../assets/icons8-play-button-30.png';
import pause_icon from '../../assets/pause.png';
import arrow_btn from '../../assets/right-arrow (1).png';
import './Hero.css';

const Hero = ({ setPlayStatus, heroData, heroCount, setHeroCount, playStatus }) => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/login");
  };

  return (
    <div className='hero'>
      <div className='hero-text'>
        <p>{heroData[heroCount].text1}</p>
        <p>{heroData[heroCount].text2}</p>
      </div>
      <div className='hero-explore' onClick={handleExploreClick}>
        <p>Explore features</p>
        <img className='explore-arrow' src={arrow_btn} alt='Explore features' />
      </div>
      <div className='hero-dot-play'>
        <ul className='hero-dots'>
          <li onClick={() => setHeroCount(0)} className={heroCount === 0 ? "hero-dot-orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(1)} className={heroCount === 1 ? "hero-dot-orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(2)} className={heroCount === 2 ? "hero-dot-orange" : "hero-dot"}></li>
        </ul>
        <div className='hero-play'>
          <img onClick={() => setPlayStatus(!playStatus)} src={playStatus ? pause_icon : play_icon} alt="Play/Pause" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
