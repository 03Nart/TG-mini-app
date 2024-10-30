import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Maincomponent = (params) => {
  return (
    
      <a
        href={params.link}
        className="flex  flex-row items-center rounded-lg bg-gray-900 shadow-lg border-2 border-transparent px-2 py-2"
        
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
   
  );
};

export default Maincomponent;
