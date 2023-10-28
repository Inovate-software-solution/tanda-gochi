import React, { useState, useEffect } from 'react';

const Item = (props) => {
    console.log(props.type);
    return (
        // <div className="h-16 w-16 bg-gray-400 rounded border m-2 rounded-md" onClick={props.onClick}>
        //     <img src={props.image} alt={props.name} className="w-full h-full object-cover rounded-md p-1" />
        //     <div className='flex justify-center'>
        //         <h4 className="text-lg mt-2">{props.name}</h4>
        //         <h4>{props.quantity}</h4>
        //     </div>
        // </div>
        <div className="h-14 w-14 bg-gray-400 rounded border relative group hover:bg-gray-500 transition duration-150" onClick={props.onClick}>
            <img src={props.image} alt={props.name} className="w-full h-full object-cover rounded-md" />
            <p className="mb-1"><strong>{props.name}</strong></p>
            {props.type==="shop" && <p className="mb-1"><strong>Price: </strong>{props.price}</p>}
            
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10 px-2 py-1 rounded-md bg-white shadow text-sm opacity-0 group-hover:opacity-100">
                <p><strong>Description:</strong> {props.description}</p>
                {props.type==="items" && <p><strong>Quantity: </strong>{props.quantity}</p>}
            </div>
        </div>
    );
}

export default Item;