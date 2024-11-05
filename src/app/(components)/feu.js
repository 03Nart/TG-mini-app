"use client";  // Add this at the very top

import { useState, useEffect } from 'react'
import { FaTelegramPlane } from 'react-icons/fa';

async function fetdata() {
  try {
    const response = await fetch('https://d.lazaristcatholicschool.org/feu/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Call json() to parse the response
  } catch (error) {
    console.error('Fetch error:', error);
    return null; // Return null in case of error
  }
}

export default function Feu() {
  const [data, setdata] = useState(null); // Initialize data as null
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchData = async () => {
      const dd = await fetdata(); // Await the fetch call
      setdata(dd); // Update state with the fetched data
      setLoading(false); // Set loading to false after data is fetched
      console.log(dd); // Log the fetched data
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array for one-time fetch

  if (loading) {
    return (
      <div className='flex w-full pr-3 justify-center items-center'>
        <div className="p-6 w-full rounded-3xl bg-gray-200 text-grey-900 mx-4 shadow-lg">
          <p className="text-center text-gray-900">Loading...</p>
        </div>
      </div>
    ); // Render loading state
  }

  if (!data) {
    return (
      <div className='flex w-full pr-3 justify-center items-center'>
        <div className="p-6 w-full rounded-3xl bg-gray-200 text-grey-900 mx-4 shadow-lg">
          <p className="text-center text-red-500">Failed to load data.</p>
        </div>
      </div>
    ); // Render error state
  }

  return (
    <div className='flex w-full pr-3 justify-center items-center'>
      <div className="p-6 w-full rounded-3xl bg-gray-200 text-grey-900 mx-4 shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-purple-400">{data.name}</h2>
        <p className="text-sm text-gray-900">{data.slang}</p>
        <p className="text-gray-900">{data.description}</p>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FaTelegramPlane className="text-purple-500" />
            <span className="font-semibold">{data.name}</span>
          </div>
          <button 
            onClick={() => window.open(data.starting_link, "_blank")} 
            className="px-4 py-2 rounded-full bg-white text-gray-800 font-semibold hover:bg-purple-500 hover:text-white transition duration-200"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
}
