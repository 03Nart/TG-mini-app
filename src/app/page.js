'use client';
import Maincomponent from './(components)/maincomponent';
import { useState, useEffect } from 'react';
import { BackButton } from '@vkruglikov/react-telegram-web-app';

// Function to fetch data from the API
async function getData() {
  const res = await fetch("https://d.lazaristcatholicschool.org/items", { cache: 'no-store' });
  const data = await res.json();
  return data;
}

// Function to make a POST request with the telegram_id
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
    <div className="flex w-full p-6 h-screen bg-gradient-to-b from-gray-900 to-black flex-col overflow-x-hidden overflow-y-scroll space-y-6">
      {poo.map((each) => (
        <Maincomponent 
          key={each.id} 
          className='' 
          name={each.name} 
          image={`https://d.lazaristcatholicschool.org${each.image}`} 
          link={each.id} 
        />
      ))}
    </div>
  );
}
