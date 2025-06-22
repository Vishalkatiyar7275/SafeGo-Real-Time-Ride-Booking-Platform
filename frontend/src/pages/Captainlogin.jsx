import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CapatainContext';

const CaptainLogin = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200) {
      const data = response.data

      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')

    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#1e3a8a] to-[#1e40af]">
      <div className="w-[90%] max-w-5xl flex bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-[#0f172a] to-[#3b82f6] text-white p-10 flex flex-col justify-center items-center">
          <div className="bg-white p-4 rounded-full shadow-md mb-6">
            <img
              src="/SafeLogo.png"
              alt="Captain Logo"
              className="w-28 h-28"
            />
          </div>
          <h2 className="text-3xl font-bold mb-2">Captain Login</h2>
          <p className="text-center text-gray-200 max-w-sm">
            Access your SafeGo Fleet account and start earning today.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10 flex flex-col justify-center bg-[#f9fafb]">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Welcome Back, Captain!</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="captain@example.com"
                className="w-full mt-1 px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
            >
              Login as Captain
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-gray-600">
            Don’t have an account?{' '}
            <Link to="/captain-signup" className="text-blue-600 font-medium hover:underline">
              Register as a Captain
            </Link>
          </p>

          <div className="mt-6">
            <Link
              to="/login"
              className="w-full bg-[#1e293b] text-white flex items-center justify-center py-2 rounded-md hover:bg-[#0f172a] transition font-semibold"
            >
              Sign in as User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
