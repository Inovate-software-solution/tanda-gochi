import React from 'react';
import Head from 'next/head';
import { data } from '../data/data.js';

const customers = () => {
  return <>
    <Head>
    <title>tanda</title>
    <meta name='viewport' content='width=device-width, initial-scale=10' />
    <link rel='icon' href='../public/images/Tandalogo.png' />
    </Head>
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-between p-4'>
        <h2>anno</h2>
      </div>
      <div className='p-4'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <span>pet</span>
            
          </div>
          <ul>
            {data.map((order, id) => (
                <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                    <div className='flex items-center'>
               
                    </div>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    
  );</>
};

export default customers;
