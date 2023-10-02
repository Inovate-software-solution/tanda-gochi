import React, { useState, useEffect } from 'react';
import Item from "./Item.jsx";

const Inventory = (props) => {
    const [itemsToDisplay, setItemsToDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEating, setIsEating] = useState(false);

    // #### TO-DO ###
    // Handle shop
    // if (props.typeProp === 'shop') {
    //     useEffect(() => {
    //         fetch(`'https://capstone.marcusnguyen.dev/api/items'`)
    //         .then("do something about it")
    //     })
    // }

    // Load items to display based on which button was pressed
    useEffect(() => {
        if (props.typeProp === 'food') {
            setItemsToDisplay(props.inventory);
        } else if (props.typeProp === 'toy') {
            setItemsToDisplay(props.toyInventory);
        } else if (props.typeProp === 'outfit') {
            setItemsToDisplay(props.outfitInventory);
        }
        console.log(itemsToDisplay);
    }, [props.typeProp, props.inventory, props.toyInventory, props.outfitInventory, itemsToDisplay]);

    // #### TO-DO ###
    // Need to search the loaded items from database to be able to load them


    // const [items, setItems] = useState([]);
    // useEffect(() => {
    //     if (props.typeProp && type[props.typeProp]) {
    //         setItems(type[props.typeProp]);
    //     }
    //     console.log(items);
    // }, [props.typeProp]);

    // useEffect(() => {
    //     if (isEating) {
    //         setTimeout(() => {
    //             setIsEating(false);
    //         }, 3000); // Play the animation for 3 seconds
    //     }
    // }, [isEating]);

    return(
        <div className="h-screen flex justify-center">
            {props.visibilityProp && (
                <div 
                    className="fixed bg-gray-50 p-4 rounded shadow-lg z-10" 
                    style={{ top: '75%', left: '55%', transform: 'translate(-50%, -50%)', minWidth: '35vw', minHeight: '30vh' }}
                >
                    <div className="flex justify-between flex-col md:flex-row">
                        <h2 className="text-base font-bold md:text-base lg:text-lg xl:text-xl mb-4">{props.titleProp}</h2>
                        {props.titleProp === "Shop" && (
                            <div className="sm:text-sm md:text-base flex items-center">
                                <img src='/images/coinGold.png' alt="Gold Coin" width={30} height={30} style={{ marginRight: '10px' }}/>  
                                Credits: {props.credits}
                            </div>
                        )}
                        <button className="btn btn-circle btn-outline"  onClick={props.toggleProp}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {isEating && (
                        <div className="mt-3 p-2">
                            {/* Show the eating animation for 3 seconds */}
                            <img src="/images/eating.gif" alt="Eating" style={{ width: '100%', animationDuration: '3s' }} />
                        </div>
                    )}

                    {isLoading && (
                        <div className='alert alert-warning mt-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span>Loading Items...</span>
                        </div> 
                    )}

                    {!isLoading && (
                        <div className="mt-3 p-2 h-48 overflow-y-scroll bg-blue-100 rounded-lg grid grid-cols-4 gap-2 place-items-center">
                            {itemsToDisplay.map(item => {
                                if (props.typeProp === 'food') {
                                    return (
                                        <Item
                                            key={item.ItemId}
                                            image={item.ImageURL}
                                            name={item.ItemId}
                                            quantity={item.Quantity}
                                            onClick={() => {props.startEatAnimation(); props.feedPet()}}
                                        />
                                    );
                                } else if (props.typeProp === 'toy') {
                                    return (
                                        <Item
                                            key={item.ItemId}
                                            image={item.ImageURL}
                                            name={item.ToyId}
                                            onClick={() => {props.startPlayAnimation(); props.playWithPet()}}
                                        />
                                    );
                                } else if (props.typeProp === 'outfit') {
                                    return (
                                        <Item
                                            key={item.ItemId}
                                            image={item.ImageURL}
                                            name={item.OutfitId}
                                            onClick={props.startWearHatAnimation()}
                                        />
                                    );
                                }
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Inventory;
