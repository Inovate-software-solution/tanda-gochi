"use client";

import Sidebar from "../../../components/Info/Sidebar";
import Inventory from "../../../components/Pet/Inventory";
import React, { useEffect, useState } from "react";
import rightwalkingImage from "../../../public/images/walk.gif";
import leftwalkingImage from "../../../public/images/walkleft.gif";
import addOilImage from "../../../public/images/addoil.gif";
import eatImage from "../../../public/images/eat.gif";
import walkImageWithHat from "../../../public/images/walkhat.gif";
import walkLeftImageWithHat from "../../../public/images/walklefthat.gif";
import wearHatImage from "../../../public/images/wearhat.gif";
import Image from "../../../public/images/food.jpg";
import playImage from "@/public/images/playball.gif";

const Page: React.FC = () => {
  
  // Pet interaction related states
  const [happiness, setHappiness] = useState(50);
  const [fullness, setFullness] = useState(50);

  // Pet animation related states
  const [positionX, setPositionX] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDancing, setIsDancing] = useState(false);
  const [isEating, setIsEating] = useState(false); 
  const [isplaying, setIsplaying] = useState(false); 
  const [isHat, setHat] = useState(false);
  const [isWearingHat, setIsWearingHat] = useState(false);
  // shop 
  const [coins, setCoins] = useState(0);
  const [hasFood1, setHasFood1] = useState(false);
  const [hasFood2, setHasFood2] = useState(false);
  
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
      //console.log("x:", positionX); 

      if (newPositionX >= 250) {
        setDirection(-1);
        setPositionX(newPositionX);
        //console.log("left:", positionX); 
      } else if (newPositionX <=-10) {
        setDirection(1);
        setPositionX(newPositionX);
        //console.log("right:", positionX); 
      } else {
        setPositionX(newPositionX);
        //console.log("isEating:", positionX); 
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
  const buyFood = (foodType: number) => {
    if (coins >= 10) { // Assuming each food costs 10 coins
      setCoins(coins - 10);
  
      if (foodType === 1) {
        setHasFood1(true);
      } else if (foodType === 2) {
        setHasFood2(true);
      }
    }
  };
{/* <button className="btn btn-success px-2 px-4 py-2" onClick={() => buyFood(1)} disabled={coins < 10 || hasFood1}>
  Buy Food 1
</button>
<button className="btn btn-success px-2 px-4 py-2" onClick={() => buyFood(2)} disabled={coins < 10 || hasFood2}>
  Buy Food 2
</button> */}
  
  const startEatAnimation = () => {
    setIsEating(true);
    setTimeout(() => {
      setIsDancing(false);
      setIsEating(false);
      
    }, 2000);
  };

  const feedPet = () => {
    setFullness((prevFullness) => (prevFullness < 90 ? prevFullness + 10 : 100));
  };

  const playWithPet = () => {
      setHappiness((prevHappiness) => (prevHappiness < 90 ? prevHappiness + 10 : 100));
  };

  const toggleWindow = (title = "", type = "") => {
    setWindowTitle(title);
    setWindowVisible(!isWindowVisible);
    setInventoryType(type);
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
  
  // decrement happiness and fullness
  useEffect(() => {
    const interval = setInterval(() => {
      setHappiness((prevHappiness) => (prevHappiness > 10 ? prevHappiness - 10 : 0));
      setFullness((prevFullness) => (prevFullness > 10 ? prevFullness - 10 : 0));
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden" data-theme="emerald">
      <Sidebar>
          <main className="bg-gray-100 min-h-screen p-4">
            {/* <h1 className="text-4xl font-bold mb-4">Virtual Pet</h1> */}
            <div className="flex flex-col justify-center items-center h-full">
              <div className="border-4 border-sky-500 relative bg-bg_pet bg-center bg-no-repeat flex justify-center items-center" style={{ height: '50vh' }}>
                <Inventory visibilityProp={isWindowVisible} titleProp={windowTitle} toggleProp={toggleWindow} typeProp={inventoryType} />
                <div style={{ position: "relative", width: "100vw", height: "50vh", overflow: "hidden" }}>
                  <div style={{ width: "500px", height: "500px", position: "absolute", top: "60%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <img
                        src={
                            isEating
                            ? eatImage.src
                            :isplaying
                            ?playImage.src
                            : isDancing
                                ? addOilImage.src
                                : isWearingHat
                                    ? wearHatImage.src
                                    : isHat
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
              </div>

            <div className="navbar bg-base-100 flex flex-col md:flex-row justify-center items-center md:w-3/4 lg:w-1/3 xl:w-3/4">
              <div className="w-full md:w-1/3">
                <p className="font-bold mr-2">Happiness</p>
                <progress className="progress progress-accent w-full md:w-2/3 xl:w-56 mr-2" value={happiness} max="100"></progress>
                <p className="text-xs mt-1">{happiness}%</p>
              </div>

              <div className="w-full md:w-1/3">
                <p className="font-bold mr-2">Fullness</p>
                <progress className="progress progress-success w-full md:w-2/3 xl:w-56 mr-2" value={fullness} max="100"></progress>
                <p className="text-xs mt-1">{fullness}%</p>
              </div>

              <div className="flex space-x-4 mt-4 md:mt-0">
                <button className="btn btn-info px-2 md:px-4 py-2" onClick={() => { toggleWindow("Actions and Toys", "toys"); playWithPet(); }}>
                    Toys
                </button>
                <button className="btn btn-primary px-2 px-4 py-2" onClick={() => { toggleWindow("Food", "food"); feedPet(); }}>
                    Food
                </button>
                <button className="btn btn-warning px-2 px-4 py-2" onClick={() => toggleWindow("Inventory", "costume")}>
                    Costumes
                </button>
                <button className="btn btn-error px-2 px-4 py-2" onClick={() => toggleWindow("Shop", "shop")}>
                    Shop
                </button>
              </div>
            </div>
          </div>
        </main>
      </Sidebar>
  </div>
  );
}

export default Page;