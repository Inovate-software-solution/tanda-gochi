// Customers.js
import React, { useState } from 'react';
import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs';
import { data } from '../data/data.js';

const Customers = ({ onTitleChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onTitleChange(inputValue);
    setInputValue('');
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-between p-4'>
        <h2></h2>
      </div>
      <div className='p-4'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          <form onSubmit={handleSubmit}>
            <label>
              Enter new title:
              <input
                type='text'
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
            </label>
            <button type='submit'>Submit</button>
          </form>
          <ul>
            {data.map((order, id) => (
              <li
                key={id}
                className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'
              >
                <div className='flex items-center'>
                  <BsPersonFill className='text-gray-800 mr-2' />
                  <div>
                    <p className='text-gray-800 font-bold'>{order.name.first}</p>
                    <p className='text-gray-400 text-sm'>{order.email}</p>
                  </div>
                </div>
                <p className='lg:flex md:hidden text-sm'>{order.date}</p>
                <div className='flex items-center'>
                  
                  <BsThreeDotsVertical className='text-gray-400 ml-2' />
                </div>
              </li>
            ))}   
          </ul>
        </div>
      </div>
  
    </div>
  );
};

export default Customers;