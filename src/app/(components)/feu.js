"use client";  // Add this at the very top

import React from 'react'
import { FaFire, FaTelegramPlane } from 'react-icons/fa';

export default function Feu() {
  return (
     <div className="p-6 rounded-3xl bg-gray-200 text-grey-900 mx-4 shadow-lg space-y-4">
    <h2 className="text-2xl font-bold text-purple-400">Solana</h2>
    <p className="text-sm text-gray-900">Find your luck with mnemonics</p>
    <p className="text-gray-900">Just play with me and earn points for free</p>

    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <FaTelegramPlane className="text-purple-500" />
        <span className="font-semibold">Mnemonics</span>
      </div>
      <button className="px-4 py-2 rounded-full bg-white text-gray-800 font-semibold hover:bg-purple-500 hover:text-white transition duration-200">
        Open
      </button>
    </div>
  </div>
  )
}
