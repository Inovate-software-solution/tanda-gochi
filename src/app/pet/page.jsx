"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Info/Sidebar";
import Inventory from "@/components/Pet/Inventory";
import eatbanana from "@/public/images/eatbanana.gif";
import rightwalkingImage from "../../../public/images/walk.gif";
import leftwalkingImage from "../../../public/images/walkleft.gif";
import addOilImage from "../../../public/images/addoil.gif";
import eatImage from "../../../public/images/eat.gif";
import walkImageWithHat from "../../../public/images/walkhat.gif";
import walkLeftImageWithHat from "../../../public/images/walklefthat.gif";
import wearHatImage from "../../../public/images/wearhat.gif";
import playImage from "@/public/images/playball.gif";

const mockUser = {
  _id: "123123123123",
  Email: "demo_account_user199087+1@tanda.co",
  Password: "abcdxyzetc",
  Score: 9999,
  Credits: 9999,
  Badges: [
    {}
  ],
  toyInventory: [
    {
      ToyId: "TestToy1",
    },
    {
      ToyId: "TestToy2",
    },
  ],
  inventory: [
    {
      ItemId: "TestFood1",
      Quantity: 3,
    },
    {
      ItemId: "TestFood2",
      Quantity: 1,
    },
  ],
  outfitInventory: [
    {
      OutfitId: "TestOutfit1",
      Equipped: false,
    },
    {
      OutfitId: "TestOutfit2",
      Equipped: false,
    },
  ],
  pets: [],
}

const Page = () => {
  // API related states
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  // Stats related states
  const [Wellbeing, setWellbeing] = useState(100);
  const [hungriness, setHungriness] = useState(0);

  // Animation related states
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

  // UI related states
  const [isWindowVisible, setWindowVisible] = useState(false);
  const [inventoryType, setInventoryType] = useState("");

  // Get the Current User's Inventory
  useEffect(() => {
    const token = sessionStorage.getItem('jwt');
    
    fetch(`https://capstone.marcusnguyen.dev/api/Users/current`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
          setUserData(data)
          
          if (data.LastInteraction) {
              const timePast = Date.now() - data.LastInteraction;
              console.log(Date.now() - data.LastInteraction);
              const newStats = (timePast / (1000 * 60 * 60)) * 10;
              //setHungriness(prevHungriness => newStats + prevHungriness);
              setWellbeing(prevWellbeing => prevWellbeing - newStats);
          }
        }
    })
    .catch((error) => {
        setError(error);
    })
    .finally(() => {
        setIsLoading(false);
    });
    }, []);

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
  
  // Stats related function
  const interactWithPet = () => {
    setWellbeing((prevWellbeing) =>
      prevWellbeing > 100 ? prevWellbeing + 5 : 100
    );
  };

  // Animation related functions
  const toggleWearingHat = () => {
    setHat(!isHat);
  };

  const animateWalking = () => {

    if (!(isDancing || isEating || isWearingHat || isplaying)) {

      const newPositionX = positionX + step * direction;

      if (newPositionX >= 250) {
        setDirection(-1);
        setPositionX(newPositionX);
      } else if (newPositionX <= -10) {
        setDirection(1);
        setPositionX(newPositionX);
      } else {
        setPositionX(newPositionX);
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

  const startEatAnimation = () => {
    //if (hasFood1 && hasFood2) {
      setIsEating(true);
      setTimeout(() => {
        setIsEating(false);
        setIsDancing(false);
        setDirection(1);
        requestAnimationFrame(animateWalking);
      }, 4000);
    //}
  };

  const startPlayAnimation = () => {
    setIsplaying(true);
    setTimeout(() => {
      setIsEating(false);
      setIsDancing(false);
      setIsplaying(false);
      setDirection(1);
      requestAnimationFrame(animateWalking);
    }, 2000);
  };

  const startWearHatAnimation = () => {
    if (isHat == false) {
      setIsWearingHat(true);
    }
    setTimeout(() => {
      setIsDancing(false);
      setIsEating(false);
      setIsWearingHat(false);
      toggleWearingHat();
    }, 500);
  };

  // UI related functions
  function toggleWindow(windowToUse) {
    setInventoryType(windowToUse);
    setWindowVisible(!isWindowVisible);
  }

  return (
    <div className="overflow-x-hidden" data-theme="emerald">
      <main className="bg-gray-100 min-h-screen p-4">
        {/* <h1 className="text-4xl font-bold mb-4">Virtual Pet</h1> */}
        <div className="flex flex-col justify-center items-center h-full">
          <div
            className="relative bg-bg_pet bg-center bg-no-repeat flex justify-center items-center"
            style={{ height: "50vh" }}
          >
            <Inventory
              visibilityProp={isWindowVisible}
              toggleProp={toggleWindow}
              typeProp={inventoryType}
              startEatAnimation={startEatAnimation}
              startPlayAnimation={startPlayAnimation}
              startWearHatAnimation={startWearHatAnimation}
              interactWithPet={interactWithPet}
              userData={userData}
            />
            <div
              style={{
                position: "relative",
                width: "100vw",
                height: "50vh",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "500px",
                  height: "500px",
                  position: "absolute",
                  top: "60%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  src={
                    isEating
                      ? hasFood1
                        ? eatImage.src
                        : eatbanana.src
                      : isplaying
                      ? playImage.src
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
                  style={{
                    position: "relative",
                    top: "50%",
                    left: positionX + "px",
                    transform: "translateY(-50%)",
                    width: "100px",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="navbar bg-base-100 flex flex-col md:flex-row justify-center items-center mt-3 md:w-3/4 lg:w-1/3 xl:w-3/4">
            <div className="w-full md:w-1/3">
              <p className="font-bold mr-2">Wellbeing</p>
              <progress
                className="progress progress-accent w-full md:w-2/3 xl:w-56 mr-2"
                value={Wellbeing}
                max="100"
              ></progress>
              <p className="text-xs mt-1">{parseFloat(Wellbeing).toFixed(2)}%</p>
            </div>

            {/* <div className="w-full md:w-1/3">
              <p className="font-bold mr-2">Hungriness</p>
              <progress
                className="progress progress-success w-full md:w-2/3 xl:w-56 mr-2"
                value={hungriness}
                max="100"
              ></progress>
              <p className="text-xs mt-1">{parseFloat(hungriness).toFixed(3)}%</p>
            </div> */}

            {/* {useToysWindow ? <div>Actual Toys windows</div> : null} */}

            <div className="flex space-x-4 mt-4 md:mt-0">
              <button
                className="btn btn-info px-2 md:px-4 py-2"
                onClick={() => {
                  toggleWindow("Toys");
                }}
              >
                Toys
              </button>
              <button
                className="btn btn-primary px-2 px-4 py-2"
                onClick={() => {
                  toggleWindow("Food");
                }}
              >
                Food
              </button>
              <button
                className="btn btn-warning px-2 px-4 py-2"
                onClick={() => toggleWindow("Outfits")}
              >
                Outfits
              </button>
              <button
                className="btn btn-error px-2 px-4 py-2"
                onClick={() => toggleWindow("Shop")}
              >
                Shop
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
