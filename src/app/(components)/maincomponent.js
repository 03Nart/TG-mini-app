import Image from "next/image";

const Maincomponent = (params) => {
  return (
    <a href={params.link} className="flex flex-col md:flex-row items-center bg-gray-900 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 border-2 border-transparent hover:border-gray-600 p-4">
      <Image 
        className="rounded-t-lg md:rounded-none md:rounded-s-lg object-cover h-96 md:h-auto md:w-48" 
        src={params.image}
        alt="Airdrop Image" 
        width={500}
        height={300}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{params.name}</h5>
      </div>
    </a>
  );
};

export default Maincomponent;
