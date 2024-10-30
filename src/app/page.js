'use client';
import Maincomponent from './(components)/maincomponent';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import "feeder-react-feedback/dist/feeder-react-feedback.css";


import { FiSearch, FiGlobe, FiSmartphone, FiDatabase, FiClock } from 'react-icons/fi';
import { FaFire, FaTelegramPlane } from 'react-icons/fa';

const Feedback = dynamic(() => import("feeder-react-feedback"), {
  ssr: false,
});


export default function Home() {
  const [poo, setPoo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState(null);

  const types = [
    { id: 6, name: 'Telegram', icon: <FaTelegramPlane /> },
    { id: 1, name: 'Web', icon: <FiGlobe /> },
    { id: 2, name: 'App', icon: <FiSmartphone /> },
    { id: 4, name: 'Hot', icon: <FaFire /> },
    { id: 5, name: 'Soon', icon: <FiClock /> },
  ];

  useEffect(() => {
    getData().then(setPoo).catch(console.error);
    const userData = window.Telegram?.WebApp?.initDataUnsafe?.user;

    if (userData) {
      const telegram_id = userData.id;
      postTelegramId(telegram_id);
    }
  }, []);

  const filteredItems = poo.filter((each) =>
    each.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex w-screen min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden" style={{ width: '100%' }}>
        <div className="flex flex-col w-full space-y-4">
          <h1 className="text-white text-center text-4xl font-bold tracking-wider shadow-lg p-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Just Gleam
          </h1>

          {/* Search Bar */}
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Types Section */}
          <div className="flex overflow-x-auto py-1 px-2 scrollbar-hidden h-16 items-center flex-shrink-0 space-x-3">
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

          {/* Featured Card */}
          <div className="p-6 rounded-3xl bg-gray-200 text-grey-900 mx-4 shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-purple-400">Solana</h2>
            <p className="text-sm text-gray-900">Find your luck with mnemonics</p>
            <p className="text-gray-900">Just play with me and earn points for free</p>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaTelegramPlane className="text-purple-500" />
                <span className="font-semibold">Mnemonics</span>
              </div>
              <button className="px-4 py-2 rounded-full bg-white text-gray-800 font-semibold hover:bg-purple-500 hover:text-white transition duration-200">
                Open
              </button>
            </div>
          </div>

          <Feedback projectId="67170d3fcc57a800029434b8" />

          <div className="flex flex-col flex-wrap space-y-2 px-2">
            {(searchQuery ? filteredItems : poo).map((each) => (
              <Maincomponent
                key={each.id}
                name={each.name}
                image={`https://d.lazaristcatholicschool.org${each.image}`}
                link={each.id}
                verified={each.verified}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        html, body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}
