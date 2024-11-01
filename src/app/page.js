'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Maincomponent from './(components)/maincomponent';
import Search from './(components)/search';
import Feu from './(components)/feu';
import Types from './(components)/types';
import RandomGradientHeader from './(components)/header';
import "feeder-react-feedback/dist/feeder-react-feedback.css";
import { FiGlobe, FiSmartphone, FiClock } from 'react-icons/fi';
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
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    getData()
      .then((data) => {
        setPoo(data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch(console.error);

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
      {loading ? (
        <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-b from-gray-900 to-black">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400"></div>
        </div>
      ) : (
        <div className="flex w-screen min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden" style={{width:'100%'}}>
          <div className="flex flex-col w-full space-y-2 py-2 bg-transparent">
            <RandomGradientHeader />

            {/* Search Bar */}
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <div className="flex overflow-x-auto overscroll-y-none py-1 px-2 scrollbar-hidden h-16 items-center flex-shrink-0 space-x-3">
              <Types />
            </div>

            {/* Conditionally Render Feu Component */}
            {!searchQuery && <Feu className="overflow-y-hidden"/>}

            <Feedback projectId="67170d3fcc57a800029434b8" />

            <div className="flex flex-col space-y-4 px-2">
              {/* Show these sections only if there's no search query */}
              {!searchQuery && (
                <>
                  {/* Trending This Week Section */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-white text-xl font-extrabold">Trending This Week</h2>
                    <a href="#" className="text-blue-400 text-sm font-semibold">See All</a>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {poo.slice(0, 3).map((each) => (
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

                  {/* Listing Soon Section */}
                  <div className="flex items-center justify-between pt-0">
                    <h2 className="text-white text-xl font-extrabold">Listing Soon</h2>
                    <a href="#" className="text-blue-400 text-sm font-semibold">See All</a>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {poo.slice(3, 6).map((each) => (
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
                </>
              )}

              {/* Render search results when there is a search query */}
              {searchQuery && (
                <div className="flex flex-col space-y-2">
                  {filteredItems.map((each) => (
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
              )}
            </div>
          </div>
        </div>
      )}

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
