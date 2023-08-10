  "use client";
  import React, { useState, useEffect } from "react";
  import Sidebar from "../../../components/Info/Sidebar";
  import Header from "../../../components/Info/Header";
  import foxGif from "./fox.gif";
  import standSprite0 from "./sprite_0.png";
  import standSprite1 from "./sprite_1.png";
  import moveRightSprite4 from "./sprite_4.png";
  import moveRightSprite5 from "./sprite_5.png";
  import Image from "next/image";

  export default function Page() {
    const [happiness, setHappiness] = useState(50);
    const [hunger, setHunger] = useState(50);
    const [position, setPosition] = useState(0);
    const [direction, setDirection] = useState("stand");
    const [currentPet, setCurrentPet] = useState("sprite");

    const feedPet = () => {
      setHunger((prevHunger) => (prevHunger > 10 ? prevHunger - 10 : 0));
    };

    const playWithPet = () => {
      setHappiness((prevHappiness) => (prevHappiness < 90 ? prevHappiness + 10 : 100));
    };

    const switchPet = () => {
      setCurrentPet((prevPet) => (prevPet === "sprite" ? "gif" : "sprite"));
    };

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
          <main className="bg-gray-100 min-h-screen">
            <div>
              <h1 className="text-4xl font-bold mb-4 p-4">Virtual Pet</h1>
              <div
                className="relative min-h-128 bg-bg_pet bg-center bg-no-repeat flex justify-center items-center w-full"
                style={{ height: '50vh' }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: `${position * 48}px`,
                    top: "60%",
                    width: "1000px",
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
                    <img src={foxGif} alt="Virtual Pet GIF" style={{ width: "100%", height: "100%" }} />
                  )}
                </div>
              </div>
              <div className="flex justify-between w-3/5 p-4">
                  <div>
                    <p className="font-bold">Happiness</p>
                    <div className="bg-gray-300 h-3 rounded-md">
                      <div
                        className="bg-green-400 h-full rounded-md"
                        style={{ width: `${happiness}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1">{happiness}%</p>
                  </div>
                  <div>
                    <p className="font-bold">Hunger</p>
                    <div className="bg-gray-300 h-3 rounded-md">
                      <div
                        className="bg-red-400 h-full rounded-md"
                        style={{ width: `${hunger}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1">{hunger}%</p>
                  </div>
                  <div>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md mr-4"
                      onClick={playWithPet}
                    >
                      Play
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={feedPet}
                    >
                      Feed
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
                      onClick={switchPet}
                    >
                      Switch Pet
                    </button>
                  </div>
              </div>
            </div>
          </main>
        </Sidebar>
      </div>
    );
  }


