import { useEffect, useState } from 'react';

const RandomGradientHeader = () => {
  const [gradient, setGradient] = useState('');

  const generateRandomGradient = () => {
    const colors = [
      'from-red-400 to-yellow-500',
      'from-blue-400 to-purple-500',
      'from-green-400 to-blue-500',
      'from-pink-400 to-indigo-500',
      'from-yellow-400 to-red-500',
      'from-teal-400 to-blue-500',
      'from-purple-400 to-pink-500',
      'from-orange-400 to-yellow-500',
      'from-indigo-400 to-purple-500',
      'from-green-400 to-teal-500',
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useEffect(() => {
    // Generate initial gradient
    setGradient(generateRandomGradient());

    // Change gradient every 3 seconds
    const intervalId = setInterval(() => {
      setGradient(generateRandomGradient());
    }, 1000); // Change the interval here (in milliseconds)

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-center items-center  bg-gray-900">
      <h1
        className={`text-6xl font-bold tracking-wider shadow-lg p-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent transition duration-500 ease-in-out`}
      >
        Just Gleam
      </h1>
    </div>
  );
};

export default RandomGradientHeader;
