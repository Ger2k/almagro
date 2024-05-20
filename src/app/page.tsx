"use client";
import { useState } from 'react';
import Dashboard from './dashboard/page';
import Users from './users/page';

export default function Home() {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <nav className="h-screen w-64 text-[#171725] fixed flex flex-col border-r-2 border-r-[#00000014]">

        <div className="logo p-4">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSejBYMhS5LNGSoI5DZEjM6fNfuH8Bf--8-U43aoDj9eQ&s" 
            alt="Logo" 
            className="w-full h-auto"
          />
        </div>
        <ul className="flex flex-col space-y-2 p-4">
          <li>
            <button 
              onClick={() => setActiveComponent('dashboard')} 
              className="block p-2 rounded hover-bg-nav hover-text-nav w-full text-left"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveComponent('users')} 
              className="block p-2 rounded hover-bg-nav hover-text-nav w-full text-left"
            >
              Usuarios
            </button>
          </li>
        </ul>
      </nav>
      <main className="ml-64 p-4">
        {renderComponent()}
      </main>
    </>
  );
}
