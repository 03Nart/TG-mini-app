import Image from "next/image";

const Maincomponent = (params) => {
  return (
    <a href={params.link} className="flex flex-row md:flex-row items-center bg-gray-900 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 border-2 border-transparent hover:border-gray-600 p-4">
      
      <div className="w-50">
      <Image 
        className="rounded-t-lg md:rounded-none md:rounded-s-lg object-cover " 
        src={params.image}
        alt="Airdrop Image" 
        width={100} 
        height={180} 
        layout="intrinsic" 
        quality={100}
      />
      </div>
     
      <div className="flex flex-col items-center justify-center  p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white text-center">{params.name}</h5>
      </div>

      <span class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Verified</span>

    </a>
  );
};

export default Maincomponent;
