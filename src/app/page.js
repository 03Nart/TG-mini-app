"use client";  // Add this at the very top


import Maincomponent from './(components)/maincomponent';
import Search from './(components)/search';
import Feu from './(components)/feu';
import Types from './(components)/types';
import RandomGradientHeader from './(components)/header';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import "feeder-react-feedback/dist/feeder-react-feedback.css";
import { FiSearch, FiGlobe, FiSmartphone, FiDatabase, FiClock } from 'react-icons/fi';
import { FaFire, FaTelegramPlane } from 'react-icons/fa';

const Feedback = dynamic(() => import("feeder-react-feedback"), {
  ssr: false,
});

async function getData() {
  const res = await fetch("https://d.lazaristcatholicschool.org/items/", { cache: 'no-store' });
  const data = await res.json();
  return data;
}

async function postTelegramId(telegram_id) {
  try {
    const response = await fetch('https://d.lazaristcatholicschool.org/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ telegram_id }),
    });

    if (!response.ok) {
      throw new Error('Failed to post telegram_id');
    }

    const result = await response.json();
    console.log('Successfully posted telegram_id:', result);
  } catch (error) {
    console.error('Error posting telegram_id:', error);
  }
}

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
        <div className="flex flex-col w-full space-y-4 py-2">
          <RandomGradientHeader />

          {/* Search Bar */}
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="flex overflow-x-auto overscroll-y-none py-1 px-2 scrollbar-hidden h-16 items-center flex-shrink-0 space-x-3">
            <Types />
          </div>

          {/* Conditionally Render Feu Component */}
          {!searchQuery && <Feu />}

          <Feedback projectId="67170d3fcc57a800029434b8" />

          <div className="flex flex-col flex-wrap space-y-2 px-2">
            {(searchQuery ? filteredItems : poo).map((each) => (
              <Maincomponent
                key={each.id}
                name={each.name}
                start={each.starting_link}
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
