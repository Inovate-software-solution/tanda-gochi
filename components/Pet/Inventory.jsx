
import React, { useState, useEffect } from 'react';
import Item from "./Item.jsx";

const Inventory = (props) => {
    const [userID, setUserID] = useState();
    const [itemsToDisplay, setItemsToDisplay] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ havebanana, setbanana ] = useState(true);
    const [ error, setError ] = useState(null);
    // State variable to track whether the fod box is filled
    const [foodBoxFilled, setFoodBoxFilled] = useState(true);
    const [isEating, setIsEating] = useState(false);
    
    const renderFoodBox = () => {
        if (foodBoxFilled) {
            return (
                <div
                    className="food-box"
                    onClick={() => {
                        startEatAnimation();
                        setbanana(false);
                    }}
                >
                    <img src="/images/food.jpg" alt="Food" />
                </div>
            );
        } else {
            return (
                <div className="food-box empty">
                    {/* Empty box */}
                </div>
            );
        }
    };
    // Get the user's ID/Email here
    
    // Then use it to fetch their inventory
    // useEffect(() => {
    //     fetch(`https://capstone.marcusnguyen.dev/api/Users/${userID}`)
    //     .then((res) => res.json())
    //     .then(setItemsToDisplay(res.Inventory))
    //     .catch(error => {
    //         setError(error);
    //     })
    //     .finally(() => {
    //         setIsLoading(false);
    //     })
    // }, [userID])

    // 
    // if (props.typeProp === 'shop') {
    //     useEffect(() => {
    //         fetch(`'https://capstone.marcusnguyen.dev/api/items'`)
    //         .then("do something about it")
    //     })
    // }

    
    const [items, setItems] = useState([]);
    // mock items
    const type = {
        'toys': [],
        'food': [
            {
                id: 1,
                name: 'Toy Ball',
                image: '/images/uphappy.png', 
                description: 'A fun toy ball for your pet.',
                type: 'food' // Add this line to set the type
            },
            {
                id: 2,
                name: 'Dog Bone',
                image: '/images/uphappy.png',
                description: 'A delicious bone for dogs.',
                type: 'food' // Add this line to set the type
            }
        ],
        'costumes': [],
        'pets': []
    }
    
    useEffect(() => {
        if (props.typeProp && type[props.typeProp]) {
            setItems(type[props.typeProp]);
        }
        console.log(items);
        }, [props.typeProp]);
        // Function to start the eat animation
        const startEatAnimation = () => {
            setIsEating(true);
            setTimeout(() => {
            setIsEating(false);
        }, 2000); // Assuming the animation takes 2 seconds
    };

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
                                    Credits: {}
                            </div>
                        )}
                        <button className="btn btn-circle btn-outline"  onClick={props.toggleProp}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    {isEating && (
                        <div className="mt-3 p-2">
                            <p>The pet is eating a banana!</p>
                            {/* You can add an animation or image here */}
                        </div>
                    )}

                    {/* Render the food box */}
                               
                    {isLoading && (
                        <div className='alert alert-warning mt-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span>Loading Items...</span>
                        </div> 
                    )}

                    {!isLoading && (
                        <div className="mt-3 p-2 h-48 overflow-y-scroll bg-blue-100 rounded-lg grid grid-cols-4 gap-2 place-items-center">
                        <Item></Item>
                        {havebanana ? (
      renderFoodBox()
    ) : (
      <>
        <Item></Item>
        <Item></Item>
      </>
    )}
                       
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                        <Item></Item>
                 
                    </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Inventory;