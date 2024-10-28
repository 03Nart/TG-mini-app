'use client';
import Maincomponent from './(components)/maincomponent';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import "feeder-react-feedback/dist/feeder-react-feedback.css";
import Head from 'next/head'
const Feedback = dynamic(() => import("feeder-react-feedback"), {
  ssr: false, // Disable server-side rendering
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

  useEffect(() => {
    getData().then(setPoo).catch(console.error);
    const userData = window.Telegram?.WebApp?.initDataUnsafe?.user;

    if (userData) {
      const telegram_id = userData.id;
      postTelegramId(telegram_id);
    }
  }, []);

  return (
    
     <>
      <div className="flex w-full h-screen bg-gradient-to-b from-gray-900 to-black overflow-x-scroll  snap-x snap-mandatory">
        <div className='flex flex-col space-y-4 w-screen p-1 snap-start shrink-0'>
        <h1 className='text-white text-center text-4xl font-bold tracking-wider shadow-lg p-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
          Telegram Based Airdrop
        </h1>
          <Feedback projectId="67170d3fcc57a800029434b8" />
          <div className='flex flex-col space-y-2 w-full'>
            {poo.map((each) => (
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

        <div className='flex flex-col w-screen snap-start shrink-0'>
        <h1 className='text-white text-center text-4xl font-bold tracking-wider shadow-lg p-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
          Web Based Airdrop (Under Devlopment)
        </h1>

        </div>
      </div>
    </>

  );
}
