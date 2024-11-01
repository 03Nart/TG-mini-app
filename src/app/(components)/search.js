// components/Search.js
'use client';
import { FiSearch } from 'react-icons/fi';

export default function Search({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative overflow-y-hidden w-full bg-transparent max-w-md mx-auto">
     <input
  type="text"
  className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
  placeholder="Search items..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}
