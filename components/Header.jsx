// Header.js
import React from 'react';

const Header = ({ title }) => {
  return (
    <div className='flex justify-between px-4 pt-4'>
      <h2>{title}</h2>
    </div>
  );
};

export default Header;
