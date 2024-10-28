'use client';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import WebApp from '@twa-dev/sdk';

import "feeder-react-feedback/dist/feeder-react-feedback.css";

const Feedback = dynamic(() => import("feeder-react-feedback"), { ssr: false });
var converter = require('number-to-words');

async function getData(wildcard) {
  const res = await fetch(`https://d.lazaristcatholicschool.org/${wildcard}/`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data;
}

async function Rst(listss) {
  const str = listss;
  const cleanedStr = str.replace(/^\[|\]$/g, '');
  const resultArray = cleanedStr.split(',').map(item => item.trim());
  return resultArray;
}

export default function Page({ params }) {
  const router = useRouter();
  const [poo, setPoo] = useState(null);
  const [criteria, setCriteria] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(params.id);
        setPoo(data);
        const criteriaData = await Rst(data.qualification);
        setCriteria(criteriaData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => {
          setLoading(false); 
      }, 2); 
      }
    }

    fetchData();

    if (window.Telegram.WebApp.initDataUnsafe?.user) {
      setUserData(window.Telegram.WebApp.initDataUnsafe.user);
    }
  }, [params.id]);

  const handleButtonClick = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className='h-screen w-screen flex justify-center items-center bg-black'>
        <div role="status" className="animate-pulse max-w-sm w-full p-4 space-y-4 border border-gray-700 divide-y divide-gray-700 rounded-lg shadow-lg dark:divide-gray-600">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-600 rounded-full w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-500 rounded-full"></div>
              </div>
              <div className="h-2.5 bg-gray-600 rounded-full w-12"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      </Head>
    
      <div className="relative flex flex-col items-center min-h-screen w-full bg-gradient-to-b from-gray-900 to-black font-poppins px-4 text-white">
        {/* Back Button */}
        <button
          onClick={handleButtonClick}
          className="absolute top-4 left-4 p-2 text-white bg-gray-700 rounded-full shadow-lg focus:outline-none"
        >
          <FontAwesomeIcon icon={faChevronLeft} style={{ color: '#ffffff' }} />
        </button>

        {/* Title */}
        <p className="text-4xl font-extrabold text-center mt-16 md:text-5xl lg:text-6xl underline w-full">
          {poo.name}
        </p>

        {/* Overview */}
        <p className="text-center text-sm md:text-base mt-4 mb-8 px-4 max-w-lg">
          {poo.overview}
        </p>

        {/* Step by Step Guide */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-xl font-semibold mb-4">Step-by-Step Guide:</h1>
          <ul className="space-y-2">
            {criteria.map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-yellow-300 font-bold">{index + 1}.</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Dates Section */}
        <div className="mt-6 text-center max-w-md w-full p-4 bg-gray-800 rounded-lg shadow-md space-y-2">
          <h1>Listing Date: <span className="font-semibold text-yellow-300">{poo.listing_date}</span></h1>
          <h1>Farming Ending Date: <span className="font-semibold text-yellow-300">{poo.farming_ending_date}</span></h1>
        </div>

        {/* Additional Info Section */}
        <div className="mt-6 text-center max-w-md w-full p-4 bg-gray-800 rounded-lg shadow-md space-y-2">
          <h1>WhitePaper: <a href={poo.whitepaper} className="underline text-yellow-300">View Whitepaper</a></h1>
          <h1>Total Supply: <span className="font-semibold text-yellow-300">{converter.toWords(poo.total_supply).toUpperCase()}</span></h1>
          <h1>Supply For The Airdrop: <span className="font-semibold text-yellow-300">{converter.toWords(poo.supply_for_airdrop).toUpperCase()}</span></h1>
        </div>

        {/* Start Button */}
        <div className="mt-6 mb-10">
          <a href={poo.starting_link} className="text-sm md:text-base text-center text-black bg-yellow-400 px-6 py-3 rounded-full shadow-lg font-semibold">
            CLICK HERE TO START THE AIRDROP
          </a>
        </div>

        {/* Feedback */}
        <div className="mt-4 w-full max-w-md bg-gray-700 p-2 rounded-lg">
          <Feedback projectId="67170d3fcc57a800029434b8" className='bg-white' />
        </div>
      </div>
    </>
  );
}
