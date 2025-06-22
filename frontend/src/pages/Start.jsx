import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative flex-1 bg-cover bg-center bg-[url('https://plus.unsplash.com/premium_photo-1682091907070-4985a6fbe6d2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmVsJTIwYm9va2luZ3xlbnwwfHwwfHx8MA%3D%3D')] flex flex-col justify-between">

        {/* 🔳 Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-0"></div>

        {/* 🚖 Logo */}
        <div className="flex justify-end">
          <img
            className="w-32 h-auto mt-2 mr-6 drop-shadow-md z-10"
            src="/SafeLogo.png"
            alt="SafeGo Logo"
          />
        </div>

        {/* 🪟 Glassmorphic Card */}
        <div className="z-10 w-full max-w-lg mx-auto px-6 py-8 mb-12 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 text-center">
          <h2 className="text-4xl font-extrabold text-white/70 mb-3 tracking-tight">
            Get Started with{' '}
            <span className="text-[#0074E4]">Safe</span>
            <span className="text-[#00A676]">Go</span>
          </h2>
          <p className="text-lg text-black-200 mb-8">
            Your reliable ride, just a tap away.
          </p>
          <Link
            to="/login"
            className="block w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-md"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Start
