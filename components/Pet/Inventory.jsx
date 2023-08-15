import React, { useState, useEffect } from 'react';

const Inventory = (props) => {
    return(
        <div className="h-screen flex flex-col justify-center">
            {props.visibilityProp && (
                <div 
                    className="fixed bg-gray-50 p-8 rounded shadow-lg z-10" 
                    style={{ top: '40%', left: '60%', transform: 'translate(-50%, -50%)', minWidth: '35vw', minHeight: '30vh' }}
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl mb-4">{props.titleProp}</h2>
                        <button className="bg-pink-500 text-white px-3 rounded-md" onClick={props.toggleProp}>Close</button>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-6">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div key={index} className="h-16 w-16 bg-gray-400 rounded"></div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Inventory;