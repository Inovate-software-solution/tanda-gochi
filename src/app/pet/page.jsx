"use client";

import Sidebar from "../../../components/Info/Sidebar";
import Inventory from "../../../components/Pet/Inventory";
import React, { useEffect, useState } from "react";
import eatbanana from "@/public/images/eatbanana.gif";
import rightwalkingImage from "../../../public/images/walk.gif";
import leftwalkingImage from "../../../public/images/walkleft.gif";
import addOilImage from "../../../public/images/addoil.gif";
import eatImage from "../../../public/images/eat.gif";
import walkImageWithHat from "../../../public/images/walkhat.gif";
import walkLeftImageWithHat from "../../../public/images/walklefthat.gif";
import wearHatImage from "../../../public/images/wearhat.gif";
import playImage from "@/public/images/playball.gif";
import Image from "next/image";
import Item from "@/components/Pet/Item.jsx";

// For testing purpose
const mockItems = {
  ToysInventory: [
    {
      ToyId: "TestToy1",
    },
    {
      ToyId: "TestToy2",
    },
  ],
  Inventory: [
    {
      ItemId: "TestFood1",
      Quantity: 3,
    },
    {
      ItemId: "TestFood2",
      Quantity: 1,
    },
  ],
  OutfitsInventory: [
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
};

const Page = () => {
  // API related states
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [toyInventory, setToyInventory] = useState([]);
  const [outfitInventory, setOutfitInventory] = useState([]);
  const [credits, setCredits] = useState(10);
  const [lastInteracted, setLastInteracted] = useState();
  const [id, setid] = useState();
  // Stats related states
  const [loneliness, setLoneliness] = useState(50);
  const [hungriness, setHungriness] = useState(50);

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
  const [windowTitle, setWindowTitle] = useState("");
  const [inventoryType, setInventoryType] = useState("");

  const [ToysWindow, setToysWindow] = useState(false);
  const [ItemWindow, setItemWindow] = useState(false);
  const [OutfitWindow, setOutfitWindow] = useState(false);

  function ToggleWindow(window) {
    if (window == "Toys") {
      setToysWindow(false);
      setItemWindow(false);
      setOutfitWindow(false);

      setToysWindow(true);
    } else if (window == "Item") {
      setToysWindow(false);
      setItemWindow(false);
      setOutfitWindow(false);

      setItemWindow(true);
    } else if (window == "Outfit") {
      setToysWindow(false);
      setItemWindow(false);
      setOutfitWindow(false);

      setOutfitWindow(true);
    }
  }

  // Get the Current User's Inventory
  useEffect(() => {
    fetch(`https://capstone.marcusnguyen.dev/api/Users/current`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCredits(data.Credits);
          setInventory(data.Inventory);
          setOutfitInventory(data.OutfitInventory);
          setToyInventory(data.ToysInventory);
          setLastInteracted(data.LastInteracted);
          setLastInteracted(data.LastInteracted);
          if (lastInteracted !== undefined) {
            const timePast = Date.now() - lastInteracted;
            const newStats = (timePast / (1000 * 60 * 60)) * 3;
            setHungriness(newStats + hungriness);
            setLoneliness(newStats + loneliness);
          } else {
            setHungriness(50);
            setLoneliness(50);
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

  // useEffect(() => {
  //   setInventory(mockItems.Inventory);
  //   setToyInventory(mockItems.ToysInventory);
  //   setOutfitInventory(mockItems.OutfitsInventory);
  // }, []);

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

  // Stats related functions
  const feedPet = () => {
    setHungriness((prevHungriness) =>
      prevHungriness > 10 ? prevHungriness - 10 : 0
    );
  };

  const playWithPet = () => {
    setLoneliness((prevLoneliness) =>
      prevLoneliness > 10 ? prevLoneliness - 10 : 0
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
    if (hasFood1 && hasFood2) {
      setIsEating(true);
      setTimeout(() => {
        setIsEating(false);
        setIsDancing(false);
        setDirection(1);
        requestAnimationFrame(animateWalking);
      }, 4000);
    }
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

  const buyFood = (foodType) => {
    if (coins >= 10) {
      setCoins(coins - 10);

      // First useEffect
      useEffect(() => {
        fetch(`https://capstone.marcusnguyen.dev/api/Users/addcredits`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TargetUserId: id,
            Credits: coins,
          }),
        })
          .then((res) => res.json())
          .then((data) => {})
          .catch((error) => {
            setError(error);
          });
      }, [coins, id]); // Dependencies: coins and id

      useEffect(() => {
        fetch(`https://capstone.marcusnguyen.dev/api/User/action/buy/item`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ItemId: "651c0f1a9abd0bd9086f62c1",
            Quantity: 1,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // Handle the response if needed
          })
          .catch((error) => {
            setError(error);
          });
      }, [Quantity]); // Dependency: Quantity
    }
  };

  // UI related functions
  const toggleWindow = (title = "", type = "") => {
    setWindowTitle(title);
    setInventoryType(type);
    setWindowVisible(!isWindowVisible);
  };

  return (
    <div className="overflow-x-hidden" data-theme="emerald">
      <Sidebar>
        <main className="bg-gray-100 min-h-screen p-4">
          {/* <h1 className="text-4xl font-bold mb-4">Virtual Pet</h1> */}
          <div className="flex flex-col justify-center items-center h-full">
            <div
              className="relative bg-bg_pet bg-center bg-no-repeat flex justify-center items-center"
              style={{ height: "50vh" }}
            >
              <Inventory
                visibilityProp={isWindowVisible}
                titleProp={windowTitle}
                toggleProp={toggleWindow}
                typeProp={inventoryType}
                startEatAnimation={startEatAnimation}
                startPlayAnimation={startPlayAnimation}
                startWearHatAnimation={startWearHatAnimation}
                credits={credits}
                inventory={inventory}
                outfitInventory={outfitInventory}
                toyInventory={toyInventory}
                feedPet={feedPet}
                playWithPet={playWithPet}
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
                <p className="font-bold mr-2">Loneliness</p>
                <progress
                  className="progress progress-accent w-full md:w-2/3 xl:w-56 mr-2"
                  value={loneliness}
                  max="100"
                ></progress>
                <p className="text-xs mt-1">{loneliness}%</p>
              </div>

              <div className="w-full md:w-1/3">
                <p className="font-bold mr-2">Hungriness</p>
                <progress
                  className="progress progress-success w-full md:w-2/3 xl:w-56 mr-2"
                  value={hungriness}
                  max="100"
                ></progress>
                <p className="text-xs mt-1">{hungriness}%</p>
              </div>

              {ToysWindow ? <div>Actual Toys windows</div> : null}

              <div className="flex space-x-4 mt-4 md:mt-0">
                <button
                  className="btn btn-info px-2 md:px-4 py-2"
                  onClick={() => {
                    toggleWindow("Toys", "toy");
                  }}
                >
                  Toys
                </button>
                <button
                  className="btn btn-primary px-2 px-4 py-2"
                  onClick={() => {
                    toggleWindow("Food", "food");
                  }}
                >
                  Food
                </button>
                <button
                  className="btn btn-warning px-2 px-4 py-2"
                  onClick={() => toggleWindow("Outfits", "outfit")}
                >
                  Outfits
                </button>
                <button
                  className="btn btn-error px-2 px-4 py-2"
                  onClick={() => toggleWindow("Shop", "shop")}
                >
                  Shop
                </button>
              </div>
            </div>
          </div>
        </main>
      </Sidebar>
    </div>
  );
};

export default Page;
