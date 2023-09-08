"use client";

import Sidebar from "@/components/Info/Sidebar";
import Inventory from "@/components/Pet/Inventory";
import React, { useEffect, useState } from "react";
import rightwalkingImage from "@/public/images/walk.gif";
import leftwalkingImage from "@/public/images/walkleft.gif";
import addOilImage from "@/public/images/addoil.gif";
import eatImage from "@/public/images/eat.gif";
import walkImageWithHat from "@/public/images/walkhat.gif";
import walkLeftImageWithHat from "@/public/images/walklefthat.gif";
import wearHatImage from "@/public/images/wearhat.gif";

const Page: React.FC = () => {
    // Pet animation related states
  const [positionX, setPositionX] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDancing, setIsDancing] = useState(false);
  const [isEating, setIsEating] = useState(false); 
  const [isHat, setHat] = useState(false);
  const [isWearingHat, setIsWearingHat] = useState(false);
  
  const step = 1;

  // Inventory related states
  const [ownedToy, setOwnedToy] = useState([]);
  const [ownedFood, setOwnedFood] = useState([]);
  const [ownedCostume, setOwnedCostume] = useState([]);
  const [ownedPet, setOwnedPet] = useState([]);

  // UI related states
  const [isWindowVisible, setWindowVisible] = useState(false);
  const [windowTitle, setWindowTitle] = useState("");
  const [inventoryType, setInventoryType] = useState("");

  const toggleWearingHat = () => {
    setHat(!isHat);
  };
  
  const animateWalking = () => {
    if (!(isDancing || isEating||isWearingHat)) {
      const newPositionX = positionX + step * direction;
      console.log("x:", positionX); 

      if (newPositionX >= 250) {
        setDirection(-1);
        setPositionX(newPositionX);
        console.log("left:", positionX); 
      } else if (newPositionX <=-10) {
        setDirection(1);
        setPositionX(newPositionX);
        console.log("right:", positionX); 
      } else {
        setPositionX(newPositionX);
        console.log("isEating:", positionX); 
      }
    }
  };

  const startAutoDance = () => {
    setIsDancing(true);
    setTimeout(() => {
      setIsDancing(false);
      setIsEating(false);
    }, 2000);
  };

  const startWearHatAnimation = () => {
    if(isHat==false){setIsWearingHat(true);};
    setTimeout(() => {
      setIsDancing(false);
      setIsEating(false);
      setIsWearingHat(false);
      toggleWearingHat();
     
    }, 1000);
  };

  const startEatAnimation = () => {
    setIsEating(true);
    setTimeout(() => {
      setIsEating(false);
      setIsDancing(false);
      setDirection(1);
    requestAnimationFrame(animateWalking);
    }, 4000); 
  };

  useEffect(() => {
    const animationId = requestAnimationFrame(animateWalking);

    const autoDanceInterval = setInterval(() => {
      startAutoDance();
    }, 2000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(autoDanceInterval);
    };
  }, [positionX, direction, isDancing, isEating, isWearingHat]);

  // const switchPet = () => {
  //   setCurrentPet((prevPet) => (prevPet === "sprite" ? "gif" : "sprite"));
  // };

  const toggleWindow = (title = "", type = "") => {
    setWindowTitle(title);
    setWindowVisible(!isWindowVisible);
    setInventoryType(type);
  };

  return (
    <Sidebar>
      <main className="bg-gray-100 min-h-screen p-4">
        <div className="relative bg-bg_pet bg-center bg-no-repeat flex flex-col items-center w-full">
          {/* Pet Image */}
          <div style={{ position: "relative", width: "100vw", height: "50vh", overflow: "hidden" }}>
            <div style={{ width: "500px", height: "500px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", border: "1px solid black" }}>
              <img
                src={
                  isEating
                    ? eatImage.src
                    : isDancing
                    ? addOilImage.src
                    :isWearingHat
                    ?wearHatImage.src
                    :isHat
                    ? direction === 1
                      ? walkImageWithHat.src
                      : walkLeftImageWithHat.src
                    : direction === 1
                    ? rightwalkingImage.src
                    : leftwalkingImage.src
                }
                alt={
                  isEating
                    ? "Eating Image"
                    : isDancing
                    ? "Dancing Image"
                    : isWearingHat
                    ? "Wearing Hat Image"
                    : isHat
                    ? "Hat Walking Image"
                    : "Walking Image"
                }
                style={{ position: "relative", top: "50%", left: positionX + "px", transform: "translateY(-50%)", width: "100px" }}
              />
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => {toggleWindow("Actions and Toys", "toys"); }}>
              Toys
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => {toggleWindow("Food", "food"); }}>
              Food
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md" onClick={() => toggleWindow("Inventory", "costume")}>
              Costumes
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => { startEatAnimation(); setIsDancing(false); }}>Eat and Stop</button>
             
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md" onClick={() => toggleWindow("Shop", "shop")}>
              Shop
            </button>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-md" onClick={() => { startWearHatAnimation(); }}>
              Wear
            </button>
          </div>
          
          {/* Inventory */}
          <Inventory visibilityProp={isWindowVisible} titleProp={windowTitle} toggleProp={toggleWindow} typeProp={inventoryType} />
        </div>
      </main>
    </Sidebar>
  );
}

export default Page;