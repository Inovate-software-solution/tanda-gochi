"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Info/Sidebar";
import Header from "../../../components/Info/Header";
import Inventory from "../../../components/Pet/Inventory";

import foxGif from "./fox.gif";
import dodoGif from "./dodobirf.gif"
import standSprite0 from "./sprite_0.png";
import standSprite1 from "./sprite_1.png";
import moveRightSprite4 from "./sprite_4.png";
import moveRightSprite5 from "./sprite_5.png";
import badgeImage from './badge.png';
import Image from "next/image";

export default function Page() {
  // Pet related states
  const [happiness, setHappiness] = useState(50);
  const [fullness, setFullness] = useState(50);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState("stand");
  const [currentPet, setCurrentPet] = useState("sprite");

  // Inventory related states
  const [ownedToy, setOwnedToy] = useState([]);
  const [ownedFood, setOwnedFood] = useState([]);
  const [ownedCostume, setOwnedCostume] = useState([]);
  const [ownedPet, setOwnedPet] = useState([]);

  // UI related states
  const [isWindowVisible, setWindowVisible] = useState(false);
  const [windowTitle, setWindowTitle] = useState("");
  const [inventoryType, setInventoryType] = useState("");

  const feedPet = () => {
    setFullness((prevFullness) => (prevFullness < 90 ? prevFullness + 10 : 100));
  };

  const playWithPet = () => {
    setHappiness((prevHappiness) => (prevHappiness < 90 ? prevHappiness + 10 : 100));
  };

  const switchPet = () => {
    setCurrentPet((prevPet) => (prevPet === "sprite" ? "gif" : "sprite"));
  };

  const toggleWindow = (title = "", type = "") => {
    setWindowTitle(title);
    setWindowVisible(!isWindowVisible);
    setInventoryType(type);
  };
  
  // decrement happiness and fullness
  useEffect(() => {
    const interval = setInterval(() => {
      setHappiness((prevHappiness) => (prevHappiness > 10 ? prevHappiness - 10 : 0));
      setFullness((prevFullness) => (prevFullness > 10 ? prevFullness - 10 : 0));
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval;
    if (direction === "right") {
      interval = setInterval(() => {
        setPosition((prevPosition) => (prevPosition + 1) % 3);
      }, 1000); // Adjust the interval duration to control the speed of movement
    } else if (direction === "left") {
      interval = setInterval(() => {
        setPosition((prevPosition) => (prevPosition - 1 + 3) % 3);
      }, 1000); // Adjust the interval duration to control the speed of movement
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    const timer = setInterval(() => {
      const random = Math.random();
      if (random < 0.33) {
        setDirection("stand");
      } else if (random < 0.67) {
        setDirection("right");
      } else {
        setDirection("left");
      }
    }, 3000); // Adjust the interval duration to control the frequency of direction changes

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Sidebar>
        <main className="bg-gray-100 min-h-screen p-4">
          <h1 className="text-4xl font-bold mb-4">Virtual Pet</h1>
          <div className="flex flex-col justify-center items-center h-full">
            <div className="relative bg-bg_pet bg-center bg-no-repeat flex justify-center items-center w-full" style={{ height: '50vh' }}>
              <Inventory visibilityProp={isWindowVisible} titleProp={windowTitle} toggleProp={toggleWindow} typeProp={inventoryType}/>
              <div
                className="relative min-h-128 bg-bg_pet bg-center bg-no-repeat 
                  flex justify-center items-center w-full"
                style={{ height: '50vh' }}
              >
                <div className="relative flex justify-center items-center"
                  style={{
                    position: "absolute",
                    left: `${position * 96}px`,
                    top: "60%",
                    width: "48px",
                    height: "48px",
                    transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
                  }}
                >
                  {currentPet === "sprite" ? (
                    <Image
                      src={
                        direction === "stand"
                          ? position === 0
                            ? standSprite0
                            : standSprite1
                          : position === 0
                          ? moveRightSprite4
                          : moveRightSprite5
                      }
                      alt="Virtual Pet Sprite"
                      layout="fill"
                      objectFit="contain"
                    />
                  ) : (
                    <Image src={dodoGif} alt="Virtual Pet GIF" style={{ width: "64px", height: "64px" }} />
                  )}
                  <div className="absolute mt-2">
                    {/* <Image src={badgeImage} alt="testing badge" style={{ width: "16px", height: "16px"}}/> */}
                  </div>
                </div>
              </div>
              </div>

            <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 lg:w-1/2 mt-4 p-4 space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/3">
                  <p className="font-bold">Happiness</p>
                  <div className="bg-gray-300 h-3 rounded-md w-32">
                      <div className="bg-green-400 h-full rounded-md" style={{ width: `${happiness}%` }}></div>
                  </div>
                  <p className="text-xs mt-1">{happiness}%</p>
                </div>

                <div className="w-full md:w-1/3">
                  <p className="font-bold">Fullness</p>
                  <div className="bg-gray-300 h-3 rounded-md w-32"> 
                      <div className="bg-red-400 h-full rounded-md" style={{ width: `${fullness}%` }}></div>
                  </div>
                  <p className="text-xs mt-1">{fullness}%</p>
                </div>

              <div className="flex space-x-4 mt-4 md:mt-0">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => {toggleWindow("Actions and Toys", "toys"); playWithPet();}}>
                    Toys
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => {toggleWindow("Food", "food"); feedPet();}}>
                    Food
                </button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md" onClick={() => toggleWindow("Inventory", "costume")}>
                    Costumes
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => toggleWindow("Pets", "pet")}>
                    Pets
                </button>
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-md" onClick={() => toggleWindow("Shop", "shop")}>
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