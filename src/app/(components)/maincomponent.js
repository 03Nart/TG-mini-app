import Image from "next/image";

const Maincomponent = (params) => {
  return (
    <a
      href={params.link}
      className="flex flex-row items-center rounded-lg bg-gray-900 shadow-lg border-2 border-transparent px-2 py-2"
      style={{ height: 'fit-content' }}
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
        <span className="ml-2 inline-flex items-center justify-center bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full border border-green-700 shadow">
          Verified
        </span>
      )}
    </a>
  );
};

export default Maincomponent;
