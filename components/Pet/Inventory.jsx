import React, { useState, useEffect } from 'react';
import Item from "./Item.jsx";

const Inventory = (props) => {
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
                effect: '+10 happiness'
            },
            {
                id: 2,
                name: 'Dog Bone',
                image: '/images/uphappy.png',
                description: 'A delicious bone for dogs.',
                effect: '+20 fullness'
            }
        ],
        'costumes': [],
        'pets': []
    }

    // API call to fetch credit for the shop 

    // API call to fetch item list accordingly

    useEffect(() => {
        if (props.typeProp && type[props.typeProp]) {
            setItems(type[props.typeProp]);
        }
        console.log(items);
    }, [props.typeProp]);

    return(
        <div className="h-screen flex flex-col justify-center">
            {props.visibilityProp && (
                <div 
                    className="fixed bg-gray-50 p-8 rounded shadow-lg z-10" 
                    style={{ top: '40%', left: '60%', transform: 'translate(-50%, -50%)', minWidth: '35vw', minHeight: '30vh' }}
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl mb-4">{props.titleProp}</h2>
                        {props.typeProp === "shop" && (
                            <h3 className="mb-4">Credits: </h3>
                        )}
                        <button className="bg-pink-500 text-white px-3 rounded-md" onClick={props.toggleProp}>Close</button>
                    </div>
                    <div className="p-4 overflow-y-auto h-96">
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            {items.map(item => (
                                <Item key={item.id} image={item.image} name={item.name}/>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Inventory;