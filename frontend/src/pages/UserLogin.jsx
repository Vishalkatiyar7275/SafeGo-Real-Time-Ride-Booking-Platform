import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userData, setUserData ] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }


    setEmail('')
    setPassword('')
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#0074E4] to-[#00A676] items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side - Welcome Section */}
        <div className="bg-gradient-to-br from-[#D1EEFC] to-[#C3F5E7] text-[#0A2540] flex flex-col items-center justify-center p-10">
          <img
            src="/SafeLogo.png"
            alt="SafeGo Logo"
            className="w-36 h-36 mr-4 drop-shadow-md"
          />
          <h2 className="text-3xl font-bold mb-4">Welcome to SafeGo</h2>
          <p className="text-center text-black/80 max-w-xs">
            Seamlessly book rides and get to your destination securely and on time. Let's get started!
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Sign in to your account</h3>

          <form onSubmit={(e) => submitHandler(e)} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">E-mail Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A676]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A676]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0074E4] hover:bg-[#005ec1] text-white py-3 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            New here?{' '}
            <Link to="/signup" className="text-[#0074E4] font-medium hover:underline">
              Create new Account
            </Link>
          </p>

          <Link
            to="/captain-login"
            className="mt-6 block w-full text-center bg-[#00A676] hover:bg-[#008f5c] text-white py-3 rounded-lg font-semibold transition"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
