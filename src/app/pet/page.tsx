"use client";
import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import happyDog from "./dog.jpeg";
import sadDog from "./uphappy.png";
import Image from "next/image";
export default function Page() {
  const [happiness, setHappiness] = useState(50);
  const [hunger, setHunger] = useState(50);

  const feedPet = () => {
    setHunger((prevHunger) => (prevHunger > 10 ? prevHunger - 10 : 0));
  };

  const playWithPet = () => {
    setHappiness((prevHappiness) => (prevHappiness < 90 ? prevHappiness + 10 : 100));
  };

  return (
    <div>
      <Sidebar>
        <main className="bg-gray-100 min-h-screen">
          <Header title="Virtual Pet" />
          <div className="p-4">
            <h1 className="text-4xl font-bold mb-4">Virtual Pet</h1>
            <div className="flex items-center justify-center mb-8">
              {happiness > 50 ? (
                <Image src={happyDog} alt="Happy Virtual Pet" className="w-48 h-48" />
              ) : (
                <Image src={sadDog} alt="Sad Virtual Pet" className="w-48 h-48" />
              )}
            </div>
            <div className="flex justify-between">
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
            </div>
            <div className="mt-8 flex justify-center">
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
            </div>
          </div>
        </main>
      </Sidebar>
    </div>
  );
}

