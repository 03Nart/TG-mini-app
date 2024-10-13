
'use client';
import { useRouter,redirect } from 'next/navigation';
import { BackButton,useInitData  } from '@vkruglikov/react-telegram-web-app';
import Head from 'next/head';
import { global } from 'styled-jsx/css';



async function userData(){
  
  try {
    const [ initDataUnsafe  ] = await useInitData();
    const chatInfo = await initDataunsafe.user.id;
    return await  chatInfo;
  } catch (error) {
    return 'airdrop';
  }

}
async function getData(wildcard) {
   
  

  const res = await fetch(`https://d.lazaristcatholicschool.org/${wildcard}`, { cache: 'no-store' });
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

export default async function Page({ params }) {
    const router = useRouter();
    const poo =  await getData(params.id);
    const Criteria = await Rst(poo.qualification)
    const chatinf = await userData()
    console.log(Criteria)
    const handleButtonClick = () => {
      'use client';
      router.push('/'); 
    };

  

  

  

  

  
  return (
    
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      </Head>


      <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-b from-gray-900 to-black font-poppins">

       
        {/* <button 
          className="bg-yellow-500 text-white px-6 py-3 rounded-full mt-4 mb-4 hover:bg-yellow-400 transition-all transform hover:scale-105" 
          onClick={handleButtonClick}

        >
          Back to Home
        </button> */}
        <BackButton onClick={handleButtonClick} />;



        <p className="text-6xl font-extrabold text-center mt-4 text-white underline w-full">{chatinf.id}</p>
        
        <p className="text-white mt-8 p-6 bg-opacity-50 bg-gray-800 rounded-lg shadow-md max-w-3xl text-center transition-transform transform hover:scale-105">
          {poo.overview}
        </p>

        <div className="mt-6 bg-gray-800 bg-opacity-60 p-6 rounded-lg shadow-lg max-w-xl w-full transition-transform transform hover:scale-105">
          <h1 className="text-yellow-500 text-center text-4xl mb-4">Airdrop Criteria</h1>
          <ul className="space-y-2">
            {Criteria.map((item, index) => (
              <li key={index} className="text-lg text-white flex items-start space-x-2">
                <span className="font-bold text-yellow-300">{index + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center max-w-xl w-full bg-gray-900 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h1 className="text-white text-lg">Listing Date: <span className="font-semibold text-yellow-300">{poo.listing_date}</span></h1>
          <h1 className="text-white text-lg">Farming Ending Date: <span className="font-semibold text-yellow-300">{poo.farming_ending_date}</span></h1>
        </div>

        <div className="mt-8 text-center max-w-xl w-full bg-gray-900 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h1 className="text-white text-lg">WhitePaper: <a href="https://google.com" className="underline text-yellow-300 hover:text-yellow-500 transition-all">{poo.whitepaper}</a></h1>
          <h1 className="text-white text-lg">Total Supply: <span className="font-semibold text-yellow-300">{poo.total_supply}</span></h1>
          <h1 className="text-white text-lg">Supply For The Airdrop: <span className="font-semibold text-yellow-300">{poo.supply_for_airdrop}</span></h1>
        </div>

        <div className="mt-8 mb-10">
          <a href={poo.starting_link} className="text-white bg-yellow-500 px-8 py-4 rounded-full text-lg hover:bg-yellow-400 transition-all transform hover:scale-105">
            CLICK HERE TO START THE AIRDROP
          </a>
        </div>
      </div>
    </>
  );
}


