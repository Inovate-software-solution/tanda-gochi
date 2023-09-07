"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Info/Sidebar";
import Header from "../../../components/Info/Header";
import Inventory from "../../../components/Pet/Inventory";

// Henry
import rightwalkingImage from "../walk.gif";
import leftwalkingImage from "../walkleft.gif";
import addOilImage from "../addoil.gif";
import eatImage from "../eat.gif";
import walkImageWithHat from "../walkhat.gif";
import walkLeftImageWithHat from "../walklefthat.gif";
import wearHatImage from "../wearhat.gif";
import Image from "next/image";

const Page: React.FC = () => {
  // Pet interaction related states
  const [happiness, setHappiness] = useState(50);
  const [fullness, setFullness] = useState(50);
  //const [currentPet, setCurrentPet] = useState(50);

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

  const sections = [
    {
      title: 'Toys',
      data: [
        { image: 'toy_image_1.jpg', name: 'Toy 1' },
        { image: 'toy_image_2.jpg', name: 'Toy 2' },
        // Add more toy data here...
      ],
    },
    {
      title: 'Food',
      data: [
        { image: 'food_image_1.jpg', name: 'Food 1' },
        { image: 'food_image_2.jpg', name: 'Food 2' },
        // Add more food data here...
      ],
    },
    {
      title: 'Shop',
      data: [
        { image: 'shop_image_1.jpg', name: 'Shop 1' },
        { image: 'shop_image_2.jpg', name: 'Shop 2' },
        // Add more shop data here...
      ],
    },
  ];

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

  const feedPet = () => {
    setFullness((prevFullness) => (prevFullness < 90 ? prevFullness + 10 : 100));
  };

  const playWithPet = () => {
    setHappiness((prevHappiness) => (prevHappiness < 90 ? prevHappiness + 10 : 100));
  };

  // const switchPet = () => {
  //   setCurrentPet((prevPet) => (prevPet === "sprite" ? "gif" : "sprite"));
  // };

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

  return (
    <div>
      <Sidebar>
        <main className="bg-gray-100 min-h-screen p-4">
          <h1 className="text-4xl font-bold mb-4">Virtual Pet</h1>
          <div className="flex flex-col justify-center items-center h-full">
            <div className="relative bg-bg_pet bg-center bg-no-repeat flex justify-center items-center w-full" style={{ height: '50vh' }}>
              <Inventory visibilityProp={isWindowVisible} titleProp={windowTitle} toggleProp={toggleWindow} typeProp={inventoryType}/>
            </div>

            <div style={{ position: "relative", width: "100vw", height: "50vh", overflow: "hidden" }}>
            <div style={{ width: "500px", height: "500px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", border: "1px solid black" }}>
              <img
                src={
                  isEating
                    ? eatImage.src
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
{/* Box Sections */}
      <div className="grid grid-cols-3  ">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-blue-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <div className="grid grid-cols-3 gap-2">
                {section.data.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white p-2 rounded-md">
                    {item.image && (
                      <img src={item.image} alt={item.name} />
                    )}
                    <p className="text-sm mt-1">{item.name}</p>
                  </div>
                ))}
                {/* Add empty boxes if there's no data */}
                {section.data.length < 9 && [...Array(9 - section.data.length)].map((_, emptyIndex) => (
                  <div key={`empty-${emptyIndex}`} className="bg-white p-2 rounded-md" />
                ))}
              </div>
            </div>
          ))}
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

export default Page;