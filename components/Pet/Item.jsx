import React, { useState, useEffect } from 'react';

const Item = (props) => {
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
    
      const startplayAnimation = () => {
        setIsplaying(true);
        setTimeout(() => {
          setIsEating(false);
          setIsDancing(false);
          setIsplaying(false);
          setDirection(1);
        requestAnimationFrame(animateWalking);
        }, 4000); 
      };

    return (
        <div className="h-16 w-16 bg-gray-400 rounded border p-2 m-2 rounded-md">
            <img src={props.image} alt={props.name} className="w-full h-full object-cover rounded-md" />
            <h3 className="text-lg mt-2">{props.name}</h3>
        </div>
        // <div className="h-14 w-14 bg-gray-400 rounded border relative group hover:bg-gray-500 transition duration-150">
        //     <img src={props.image} alt={props.name} className="w-full h-full object-cover rounded-md" />
        //     <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10 px-2 py-1 rounded-md bg-white shadow text-sm opacity-0 group-hover:opacity-100">
        //         <p className="mb-1"><strong>{props.name}</strong></p>
        //         {props.effect && <p className="mb-1"><strong>Effect:</strong> {props.effect}</p>}
        //         <p><strong>Description:</strong> {props.description}Placeholder blah blah blah blah</p>
        //     </div>
        // </div>
    );
}

export default Item;