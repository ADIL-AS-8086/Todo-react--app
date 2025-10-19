import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-lime-600 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">MyTodoApp</div>
      <ul className="flex space-x-6">
        <li className="hover:text-green-400 cursor-pointer">Home</li>
        <li className="hover:text-green-400 cursor-pointer">Events</li>
        <li className="hover:text-green-400 cursor-pointer">Orders</li>
      </ul>
    </nav>
  );
}

export default Navbar;
