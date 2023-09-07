import React, { useState, useEffect } from 'react';

const Item = (props) => {
    return (
        <div className="h-16 w-16 bg-gray-400 rounded border p-2 m-2 rounded-md">
            <img src={props.image} alt={props.name} className="w-full h-full object-cover rounded-md" />
            <h3 className="text-lg mt-2">{props.name}</h3>
        </div>
    );
}

export default Item;