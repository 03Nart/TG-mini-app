'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Maincomponent from './(components)/maincomponent';
import Search from './(components)/search';
import Feu from './(components)/feu';
import Types from './(components)/types';
import RandomGradientHeader from './(components)/header';
import "feeder-react-feedback/dist/feeder-react-feedback.css";

const Feedback = dynamic(() => import("feeder-react-feedback"), {
  ssr: false,
});

async function getData(searchQuery) {
  const res = await fetch(`https://d.lazaristcatholicschool.org/items/?search=${searchQuery}`, { cache: 'no-store' });
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

async function getFeaturedData() {
  const res = await fetch("https://d.lazaristcatholicschool.org/feautred/", { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch featured data');
  }
  const data = await res.json();
  return data.featured; // Return the featured array
}

async function communityFav() {
  const res = await fetch("https://d.lazaristcatholicschool.org/community/", { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch community favorites');
  }
  const data = await res.json();
  return data.community; // Return the community array
}

async function endingsoonairdrop() {
  const res = await fetch("https://d.lazaristcatholicschool.org/endingsoon/", { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch ending soon data');
  }
  const data = await res.json();
  return data; // Return the ending soon array
}

async function scamss() {
  const res = await fetch("https://d.lazaristcatholicschool.org/scams/", { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch scams');
  }
  const data = await res.json();
  return data; // Return the scams array
}

async function verify() {
  const res = await fetch("https://d.lazaristcatholicschool.org/verified/", { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch verified projects');
  }
  const data = await res.json();
  return data.verified_projects;
}

async function getAirdropDetails(airdrop_id) {
  const res = await fetch(`https://d.lazaristcatholicschool.org/${airdrop_id}/`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch data for airdrop_id: ${airdrop_id}`);
  }
  return await res.json(); // Return the details for the specific airdrop
}

export default function Home() {
  const [poo, setPoo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredItems, setFeaturedItems] = useState([]);
  const [community, setCommunity] = useState([]);
  const [scams, setScams] = useState([]);
  const [details, setDetails] = useState([]);
  const [endingsoondata, setEndingSoonData] = useState([]);
  const [verified, setVerified] = useState([]);
  const [comunitylove, setLove] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data based on the search query
        const data = await getData(searchQuery);
        setPoo(data);

        // Post Telegram ID
        const userData = window.Telegram?.WebApp?.initDataUnsafe?.user;
        if (userData) {
          const telegram_id = userData.id;
          postTelegramId(telegram_id);
        }

        // Fetch featured data
        const featuredData = await getFeaturedData();
        const detailedDataPromises = featuredData.map(item => getAirdropDetails(item.airdrop_id));
        const detailedData = await Promise.all(detailedDataPromises);
        setFeaturedItems(featuredData);
        setDetails(detailedData);

        // Fetch community favorites
        const communityData = await communityFav();
        const communityDetailedDataPromises = communityData.map(item => getAirdropDetails(item.airdrop_id));
        const communityDetailedData = await Promise.all(communityDetailedDataPromises);
        setLove(communityDetailedData);

        // Fetch scams
        const scamData = await scamss();
        if (scamData.length > 0) {
          setScams(scamData);
        }

        // Fetch verified projects
        const verifiedData = await verify();
        setVerified(verifiedData);

        // Fetch ending soon data
        const endingSoonData = await endingsoonairdrop();
        setEndingSoonData(endingSoonData);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData().finally(() => setLoading(false));
  }, [searchQuery]);

  // Filtered items based on search query
  const filteredItems = details.filter(item =>
    item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-b from-gray-900 to-black">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400"></div>
        </div>
      ) : (
        <div className="flex w-screen min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden" style={{ width: '100%' }}>
          <div className="flex flex-col w-full space-y-2 py-2 bg-transparent">
            <RandomGradientHeader />
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}  className={'bg-tr'} />
            <div className="flex overflow-x-auto overscroll-y-none py-1 px-2 scrollbar-hidden h-16 items-center flex-shrink-0 space-x-3" style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none' }}>
              <Types className='scrollbar-hidden overscroll-y-none' style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none' }}/>
            </div>
            {!searchQuery && <Feu className="overflow-y-clip" />}
            <Feedback projectId="67170d3fcc57a800029434b8" />
            <div className="flex flex-col space-y-4 px-2">
              {!searchQuery && (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-white text-xl font-extrabold">Featured Airdrops</h2>
                    <a href="#" className="text-blue-400 text-sm font-semibold">See All</a>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {poo.slice(0, 3).map((each) => (
                      <Maincomponent
                        key={each.id}
                        name={each.name}
                        date={each.farming_ending_date}
                        start={each.starting_link}
                        image={`https://d.lazaristcatholicschool.org${each.image}`}
                        link={each.id}
                        verified={each.verified}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <h2 className="text-white text-xl font-extrabold">Verified Airdrops</h2>
                    <a href="#" className="text-blue-400 text-sm font-semibold">See All</a>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {verified.slice(0, 3).map((each) => (
                      <Maincomponent
                      
                      date={each.farming_ending_date}
                        key={each.id}
                        name={each.name}
                        start={each.starting_link}
                        image={`https://d.lazaristcatholicschool.org${each.image}`}
                        link={each.id}
                        verified={each.verified}
                      />
                    ))}
                  </div>

                  {/* <div className="flex items-center justify-between pt-0">
                    <h2 className="text-white text-xl font-extrabold">Ending Soon</h2>
                    <a href="#" className="text-blue-400 text-sm font-semibold">See All</a>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {endingsoondata.map((each) => (
                      <Maincomponent
                      
                      date={each.farming_ending_date}
                        key={each.id}
                        name={each.name}
                        start={each.starting_link}
                        image={each.image}
                        link={each.id}
                        verified={each.verified}
                      />
                    ))}
                  </div> */}

                  <div className="flex items-center justify-between pt-0">
                    <h2 className="text-white text-xl font-extrabold">Community Favorite</h2>
                    <a href="#" className="text-blue-400 text-sm font-semibold">See All</a>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {comunitylove.map((each) => (
                      <Maincomponent
                      
                      date={each.farming_ending_date}
                        key={each.id}
                        name={each.name}
                        start={each.starting_link}
                        image={`https://d.lazaristcatholicschool.org${each.image}`}
                        link={each.id}
                        verified={each.verified}
                      />
                    ))}
                  </div>

                  {/* ending soon */}
                  
                  {endingsoondata.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between pt-0">
                      <h2 className="text-white text-xl font-extrabold">Ending Soon</h2>
                      <a href="#" className="text-blue-400 text-sm font-semibold">See All</a>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {endingsoondata.map((each) => (
                        <Maincomponent
                          date={each.farming_ending_date}
                          key={each.id}
                          name={each.name}
                          start={each.starting_link}
                          image={each.image}
                          link={each.id}
                          verified={each.verified}
                        />
                      ))}
                    </div>
                  </div>
                )}


                  {scamss.length > 0 && (
                    <div>

                    
                  <div className="flex items-center justify-between pt-0">
                    <h2 className="text-white text-xl font-extrabold">Scams</h2>
                    <a href="#" className="text-blue-400 text-sm font-semibold">See All</a>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {scams.map((each) => (
                      <Maincomponent
                      
                      date={each.farming_ending_date}
                        key={each.id}
                        name={each.name}
                        start={each.starting_link}
                        image={`https://d.lazaristcatholicschool.org${each.image}`}
                        link={each.id}
                        verified={each.verified}
                      />
                    ))}
                  </div></div>
                         )}

                </>
              )}
              
              {searchQuery && filteredItems.length > 0 && (
                <>
                  <div className="flex items-center justify-between pt-0">
                    <h2 className="text-white text-xl font-extrabold">Search Results</h2>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {filteredItems.map((item) => (
                      <Maincomponent
                      
                      date={item.farming_ending_date}
                        key={item.airdrop_id}
                        name={item.name}
                        start={item.starting_link}
                        image={`https://d.lazaristcatholicschool.org${item.image}`}
                        link={item.airdrop_id}
                        verified={item.verified}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
