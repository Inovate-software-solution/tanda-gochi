"use client";
import React, { useEffect, useState } from "react";
import rightwalkingImage from "../walk.gif";
import leftwalkingImage from "../walkleft.gif";
import addOilImage from "../addoil.gif";
import eatImage from "../eat.gif";

const WalkingAnimation: React.FC = () => {
  const [positionX, setPositionX] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDancing, setIsDancing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(0);
  const [isEating, setIsEating] = useState(false); 
  const step = 1;

  
  const animateWalking = () => {
    if (!(isDancing || isEating)){

    const newPositionX = positionX + step * direction;

    if (newPositionX >= 250) {
      setDirection(-1);
    } else if (newPositionX <= 0) {
      setDirection(1);
    } else {
      setPositionX(newPositionX);
      setCurrentLocation(newPositionX);
    }

    requestAnimationFrame(animateWalking);}
  };

  const startAutoDance = () => {
    setIsDancing(true);
    setTimeout(() => {
      setIsDancing(false);
      setIsEating(false);
      requestAnimationFrame(animateWalking);
    }, 2000);
   
  };

  const startEatAnimation = () => {
    setIsEating(true);
    setTimeout(() => {
      setIsEating(false);
      setIsDancing(false);
      setDirection(1);
     
      
      requestAnimationFrame(animateWalking);
    }, 3000); 
  };

  useEffect(() => {
    const animationId = requestAnimationFrame(animateWalking);

    const autoDanceInterval = setInterval(() => {
      startAutoDance();
    }, 8000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(autoDanceInterval);
    };
  }, [positionX, direction]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div style={{ width: "500px", height: "500px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", border: "1px solid black" }}>
        <img
          src={isEating ? eatImage.src : isDancing ? addOilImage.src : direction === 1 ? rightwalkingImage.src : leftwalkingImage.src}
          alt={isEating ? "Eating Image" : isDancing ? "Dancing Image" : "Walking Image"}
          style={{ position: "absolute", top: "50%", left: positionX + "px", transform: "translateY(-50%)", width: "100px" }}
        />
      </div>
      <button onClick={() => alert(`Current Location: ${currentLocation}`)}>Show Current Location</button>
      <button onClick={() => { startEatAnimation(); setIsDancing(false); }}>Eat and Stop</button>
    </div>
  );
};

export default WalkingAnimation;

