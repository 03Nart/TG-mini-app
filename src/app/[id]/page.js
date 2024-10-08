
import Head from 'next/head'; // Assuming you are using Next.js for the project

const Criteria = [
  "Complete the registration form",
  "Verify your email",
  "Participate in the airdrop event",
  "Follow the social media accounts",
  "Join the Telegram group"
];


async function getData(wildcard){
  const res = await fetch(`https://d.lazaristcatholicschool.org/${wildcard}`, { cache:'no-store' })
  const data = await res.json()
  console.log(wildcard)
  return data

} 

async function Page({ params }) {
   console.log(params.id)
   console.log('props')
  const poo = await getData(params.id)
  console.log(poo)

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-b from-gray-900 to-black font-poppins">
        <p className="text-6xl font-extrabold text-center mt-10 text-white underline w-full">{poo.name}</p>
        
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

export default Page;
