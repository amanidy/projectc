
import React from "react";
import PropTypes from 'prop-types';
import "./Background.css";
import video from "../../assets/agrivideo.mp4";
import image1 from "../../assets/plant2.jpg";
import image2 from "../../assets/pexels-skyriusmarketing-2129819.jpg";
import image3 from "../../assets/plant.jpg";

const Background = ({ playStatus, heroStatus }) => {
  console.log('Background component:', { playStatus, heroStatus });

  if (playStatus === true) {
    return (
      <video className="background fade-in" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    );
  } else if (heroStatus === 0) {
    return <img src={image1} className="background fade-in " alt="" />;
  } else if (heroStatus === 1) {
    return <img src={image2} className="background fade-in" alt="" />;
  } else if (heroStatus === 2) {
    return <img src={image3} className="background fade-in" alt="" />;
  } else {
    return null;
  }
};

Background.propTypes = {
  playStatus: PropTypes.bool.isRequired,
  heroStatus: PropTypes.number.isRequired,
};

export default Background;
