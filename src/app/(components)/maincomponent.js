import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Maincomponent = (params) => {
  // Function to handle button click and open the link
  const handleButtonClick = () => {
    window.open(params.start, "_blank"); // Open the link passed as prop in a new tab
  };

  return (
    <div className="flex flex-row items-center justify-between rounded-lg bg-gray-900 shadow-lg border-2 border-transparent px-2 py-2">
      {/* Main link content */}
      <a
        href={params.link}
        className="flex items-center"
      >
        <div className="w-12">
          <Image
            className="rounded-lg object-cover"
            src={params.image}
            alt="Airdrop Image"
            width={50}
            height={90}
            layout="intrinsic"
            quality={100}
          />
        </div>

        <div className="flex flex-col items-center justify-center px-2 leading-normal">
          <h5 className="text-2xl font-bold tracking-tight text-white text-center mr-1">
            {params.name}
          </h5>
        </div>

        {params.verified && (
          <span className="ml-2 inline-flex items-center justify-center text-green-500 text-xs font-semibold">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
          </span>
        )}
      </a>

      {/* Open Button */}
      <button 
        onClick={handleButtonClick} // Call the function to open the link
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-md"
      >
        Open
      </button>
    </div>
  );
};

export default Maincomponent;
