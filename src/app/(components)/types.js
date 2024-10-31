"use client";  // Add this at the very top

import {React,useState} from 'react'
import { FiSearch, FiGlobe, FiSmartphone, FiDatabase, FiClock } from 'react-icons/fi';
import { FaFire, FaTelegramPlane } from 'react-icons/fa';

export default function Types() {
  const [selectedType, setSelectedType] = useState(null);
    const types = [
        { id: 6, name: 'Telegram', icon: <FaTelegramPlane /> },
        { id: 1, name: 'Web', icon: <FiGlobe /> },
        { id: 2, name: 'App', icon: <FiSmartphone /> },
        { id: 4, name: 'Hot', icon: <FaFire /> },
        { id: 5, name: 'Soon', icon: <FiClock /> },
      ];

  return (
    <div className="flex overflow-x-auto py-1 overflow-y-hidden px-2 scrollbar-hidden h-16 items-center flex-shrink-0 space-x-3">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full 
                  ${selectedType === type.id ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'} 
                  transition duration-200 ease-in-out hover:bg-purple-500 hover:text-white`}
              >
                <span className={`${selectedType === type.id ? 'text-white' : 'text-gray-300'} text-2xl`}>
                  {type.icon}
                </span>
                <span className="font-medium">{type.name}</span>
              </button>
            ))}
    </div>
  )
}
