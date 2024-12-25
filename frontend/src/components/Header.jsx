import React from 'react';

const Header = ({ username }) => {
  // localStorage.clear()
  return (
    <header className="bg-blue-500 text-white p-4">
      <h1 className="text-xl font-bold">Welcome {username}</h1>
    </header>
  );
};

export default Header;
