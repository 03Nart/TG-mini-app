import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { isAfter, parseISO ,format} from 'date-fns'; // Import date-fns functions

const Maincomponent = (params) => {
  // Function to handle button click and open the link
  const handleButtonClick = () => {
    if (!isEnded) {
      window.open(params.start, "_blank"); // Open the link passed as prop in a new tab
    }
  };

  // Determine if the event has ended
  let isEnded = false;

  if (params.date) {
    
    const endDate = format(parseISO(params.date), "yyyy-MM-dd") // Parse the date string into a date object
    const currentDate = new Date();

    // Check if the current date is after the end date using date-fns
    isEnded = isAfter(currentDate, endDate);
  }

  return (
    <div className="flex flex-row items-center justify-between rounded-lg bg-transparent shadow-lg border-2 border-transparent px-2 py-2">
      {/* Main link content */}
      <a
        href={params.link}
        className="flex items-center"
        // target="_blank" // Open the link in a new tab
        rel="noopener noreferrer" // Security feature for opening links
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
      {isEnded ? (
        <button 
          className="bg-red-500 text-white font-semibold py-1 px-4 rounded-md cursor-not-allowed"
          disabled // Make the button unclickable
        >
          Ended
        </button>
      ) : (
        <button 
          onClick={handleButtonClick} // Call the function to open the link
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-md"
        >
          Open
        </button>
      )}
    </div>
  );
};

export default Maincomponent;
