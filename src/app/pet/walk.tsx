"use client";
import React, { useEffect, useState } from "react";
import rightwalkingImage from "../walk.gif";
import leftwalkingImage from "../walkleft.gif";
import addOilImage from "../addoil.gif"; // Import the addoil.gif image

const WalkingAnimation: React.FC = () => {
  const [positionX, setPositionX] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isDancing, setIsDancing] = useState(false); // Add state for dancing status
  const step = 1; // Increase step size for a more noticeable movement

  const animateWalking = () => {
    if (isDancing) return; // Don't update position if dancing

    const newPositionX = positionX + step * direction;

    if (newPositionX >= 250) {
      setDirection(-1); // Change direction to left when hitting the right border
    } else if (newPositionX <= 0) {
      setDirection(1); // Change direction to right when hitting the left border
    } else {
      setPositionX(newPositionX);
    }

    requestAnimationFrame(animateWalking);
  };

  const startAutoDance = () => {
    setIsDancing(true);
    setTimeout(() => {
      setIsDancing(false);
    }, 2000); // Dance animation lasts for 4 seconds
  };

  useEffect(() => {
    const animationId = requestAnimationFrame(animateWalking);

    const autoDanceInterval = setInterval(() => {
      startAutoDance();
    }, 8000); // Auto dance every 10 seconds

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(autoDanceInterval);
    };
  }, [positionX, direction]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          width: "500px",
          height: "500px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid black"
        }}
      >
        <img
          src={isDancing ? addOilImage.src : (direction === 1 ? rightwalkingImage.src : leftwalkingImage.src)}
          alt={isDancing ? "Dancing Image" : "Walking Image"}
          style={{
            position: "absolute",
            top: "50%",
            left: positionX + "px",
            transform: "translateY(-50%)",
            width: "100px"
          }}
        />
      </div>
    </div>
  );
};

export default WalkingAnimation;
