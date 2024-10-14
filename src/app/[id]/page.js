'use client';
import { useRouter } from 'next/navigation';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import Head from 'next/head';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(params.id);
        setPoo(data);
        const criteriaData = await Rst(data.qualification);
        setCriteria(criteriaData);
      } catch (error) {
        console.error('Error fetching data:', error);
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

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      </Head>

      <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-b from-gray-900 to-black font-poppins">
        <BackButton onClick={handleButtonClick} />

    
          <p className="text-6xl font-extrabold text-center mt-4 text-white underline w-full">
           {poo.name}
          </p>
     

        {poo ? (
          <>
            <p className="text-white mt-8 p-6 bg-opacity-50 bg-gray-800 rounded-lg shadow-md max-w-3xl text-center">
              {poo.overview}
            </p>

            <div className="mt-6 bg-gray-800 bg-opacity-60 p-6 rounded-lg shadow-lg max-w-xl w-full">
              <h1 className="text-yellow-500 text-center text-4xl mb-4">Airdrop Criteria</h1>
              <ul className="space-y-2">
                {criteria.map((item, index) => (
                  <li key={index} className="text-lg text-white">
                    <span className="font-bold text-yellow-300">{index + 1}.</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 text-center max-w-xl w-full bg-gray-900 p-4 rounded-lg shadow-lg">
              <h1 className="text-white text-lg">
                Listing Date: <span className="font-semibold text-yellow-300">{poo.listing_date}</span>
              </h1>
              <h1 className="text-white text-lg">
                Farming Ending Date: <span className="font-semibold text-yellow-300">{poo.farming_ending_date}</span>
              </h1>
            </div>

            <div className="mt-8 text-center max-w-xl w-full bg-gray-900 p-4 rounded-lg shadow-lg">
              <h1 className="text-white text-lg">
                WhitePaper: <a href={poo.whitepaper} className="underline text-yellow-300">{poo.whitepaper}</a>
              </h1>
              <h1 className="text-white text-lg">
                Total Supply: <span className="font-semibold text-yellow-300">{poo.total_supply}</span>
              </h1>
              <h1 className="text-white text-lg">
                Supply For The Airdrop: <span className="font-semibold text-yellow-300">{poo.supply_for_airdrop}</span>
              </h1>
            </div>

            <div className="mt-8 mb-10">
              <a href={poo.starting_link} className="text-white bg-yellow-500 px-8 py-4 rounded-full">
                CLICK HERE TO START THE AIRDROP
              </a>
            </div>
          </>
        ) : (
          <p>Loading airdrop data...</p>
        )}
      </div>
    </>
  );
}
