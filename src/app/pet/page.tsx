"use client";


import Sidebar from "../../../components/Sidebar";
import Inventory from "../../../components/Pet/Inventory";
import React, { useEffect, useState } from "react";
import rightwalkingImage from "../walk.gif";
import leftwalkingImage from "../walkleft.gif";
import addOilImage from "../addoil.gif";
import eatImage from "../eat.gif";
import walkImageWithHat from "../walkhat.gif";
import walkLeftImageWithHat from "../walklefthat.gif";
import wearHatImage from "../wearhat.gif";
import Image from "../food.jpg";

const WalkingAnimation: React.FC = () => {
  const [positionX, setPositionX] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDancing, setIsDancing] = useState(false);
  const [isEating, setIsEating] = useState(false); 
  const [isHat, setHat] = useState(false);
  const [isWearingHat, setIsWearingHat] = useState(false);
  
  const step = 1;
  const [isWindowVisible, setWindowVisible] = useState(false);
  const [windowTitle, setWindowTitle] = useState("");
  const [inventoryType, setInventoryType] = useState("");

  const toggleWearingHat = () => {
    setHat(!isHat);
  };

  const toggleWindow = (title = "", type = "") => {
    setWindowTitle(title);
    setWindowVisible(!isWindowVisible);
    setInventoryType(type);
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
  const [sections, setSections] = useState([
    {
      title: 'Toys',
      data: [
        { image: Image.src, name: 'Toy 1' },
        { image: 'toy_image_2.jpg', name: 'Toy 2' },
        // Add more toy data here...
      ],
    },
    {
      title: 'Food',
      data: [
        { image: Image.src, name: 'Food 1' },
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
  ]);

  
  // Create state to keep track of clicked items
  const [clickedItems, setClickedItems] = useState<string[]>([]);

  
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
  // Create state to keep track of the current section
  

  const handleItemClick = (itemName: string) => {
    // Check if the item has already been clicked
    if (!clickedItems.includes(itemName)) {
      // Start the eat animation
      startEatAnimation();
  
      // After a delay, change the image and prevent further clicks on this item
      setTimeout(() => {
        setSections((prevSections) =>
          prevSections.map((section) => {
            return {
              ...section,
              data: section.data.map((item) => {
                if (item.name === itemName) {
                  return {
                    ...item,
                    image: 'new_image.jpg', // Change to the new image URL
                  };
                }
                return item;
              }),
            };
          })
        );
  
        // Add the item to the clicked items list
        setClickedItems((prevClickedItems) => [...prevClickedItems, itemName]);
      }, 3000); // Adjust the delay as needed (3 seconds in this example)
    }
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
          
          {/* Buttons */}
          {/* <div className="flex space-x-4 mt-4 md:mt-0">
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
          </div> */}
          
          {/* Inventory */}
          {/* <Inventory visibilityProp={isWindowVisible} titleProp={windowTitle} toggleProp={toggleWindow} typeProp={inventoryType} /> */}
  
          {/* Box Sections */}
          <div className="grid grid-cols-3">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-blue-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                <div className="grid grid-cols-3 gap-2">
                  {section.data.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`bg-white p-2 rounded-md ${
                        clickedItems.includes(item.name) ? 'hidden' : ''
                      }`} // Use CSS to hide the item if it's in the clickedItems array
                    >
                      {/* Make the photo clickable */}
                      <button
                        onClick={() => handleItemClick(item.name)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.image && <img src={item.image} alt={item.name} />}
                      </button>
                      <p className="text-sm mt-1">{item.name}</p>
                    </div>
                  ))}
                  {/* Add empty boxes if there's no data */}
                  {section.data.length < 9 &&
                    [...Array(9 - section.data.length)].map((_, emptyIndex) => (
                      <div key={`empty-${emptyIndex}`} className="bg-white p-2 rounded-md" />
                    ))}
              </div>
            </div>
          ))}
        </div>
        </div>
      </main>
    </Sidebar>
  );
}


export default WalkingAnimation;

   
