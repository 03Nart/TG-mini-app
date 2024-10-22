'use client';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Feedback from "feeder-react-feedback";
import "feeder-react-feedback/dist/feeder-react-feedback.css";
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import WebApp from '@twa-dev/sdk'

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
  const [loading, setLoading] = useState(true); // Add loading state

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
      }, 4000); 
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
      <div className='h-screen  w-screen flex justify-center items-center'>


     
    <div role="status" className="max-w-md w-full space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700  dark:border-gray-700">
        <div className="flex items-center justify-between">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>

        <span className="sr-only">Loading...</span>
    </div>

    </div>

    );
  }

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      </Head>
    
      <div className="relative flex flex-col items-center min-h-screen w-full bg-gradient-to-b from-gray-900 to-black font-poppins">
        {/* Back Button */}
        <button
          onClick={handleButtonClick}
          className="absolute top-4 left-4 text-white p-3 rounded-full shadow-lg"
        >
        <FontAwesomeIcon icon={faChevronLeft} style={{ color: '#ffffff' }} />
        </button>
        <p className="text-6xl font-extrabold text-center mt-4 text-white underline w-full">
          {poo.name}
        </p>

        <p className="text-white mt-8 p-6  rounded-lg  max-w-3xl text-center">
          {poo.overview}
        </p>

        <div className="mt-6   p-6 rounded-lg shadow-lg max-w-xl w-full">
          <h1 className="text-white text-2xl mb-4 text-left">Step by Step guide:</h1>
          <ul className="space-y-2 text-center">
            {criteria.map((item, index) => (
              <li key={index} className="text-lg text-white ">
                <span className="font-bold text-white">{index + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center max-w-xl w-full p-4 rounded-lg shadow-lg">
          <h1 className="text-white text-lg">
            Listing Date: <span className="font-semibold text-yellow-300">{poo.listing_date}</span>
          </h1>
          <h1 className="text-white text-lg">
            Farming Ending Date: <span className="font-semibold text-yellow-300">{poo.farming_ending_date}</span>
          </h1>
        </div>

        <div className="mt-8 text-center max-w-xl w-full   p-4 rounded-lg shadow-lg">
          <h1 className="text-white text-lg">
            WhitePaper: <a href={poo.whitepaper} className="underline text-yellow-300">{poo.whitepaper}</a>
          </h1>
          <h1 className="text-white text-lg">
            Total Supply: <span className="font-semibold text-yellow-300">{converter.toWords(poo.total_supply).toUpperCase()}</span>
          </h1>
          <h1 className="text-white text-lg">
            Supply For The Airdrop: <span className="font-semibold text-yellow-300">{converter.toWords(poo.supply_for_airdrop).toUpperCase()}</span>
          </h1>
        </div>

        <div className="mt-8 mb-10">
          <a href={poo.starting_link} className="text-white bg-yellow-500 px-8 py-4 rounded-full">
            CLICK HERE TO START THE AIRDROP
          </a>
        </div>
        <Feedback projectId="67170d3fcc57a800029434b8" />;

      </div>
    </>
  );
}
