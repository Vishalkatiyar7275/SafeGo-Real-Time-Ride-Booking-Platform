import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainSignup = () => {

  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')


  const { captain, setCaptain } = React.useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#1e3a8a] to-[#1e40af]">
      <div className="w-[90%] max-w-6xl flex bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-[#0f172a] to-[#3b82f6] text-white p-10 flex flex-col justify-center items-center">
          <div className="bg-white p-4 rounded-full shadow-md mb-6">
            <img
              src="/SafeLogo.png"
              alt="Captain Logo"
              className="w-28 h-28"
            />
          </div>
          <h2 className="text-3xl font-bold mb-2">Join as a Captain</h2>
          <p className="text-center text-gray-200 max-w-sm">
            Create your SafeGo Fleet account and start accepting rides today.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10 overflow-y-auto bg-[#f9fafb]">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Captain Account</h2>
          <form onSubmit={submitHandler} className="space-y-5">
            <div className="flex gap-4">
              <input
                required
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-1/2 px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
              />
              <input
                required
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-1/2 px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
            />

            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-4">
              <input
                required
                type="text"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                placeholder="Vehicle Color"
                className="w-1/2 px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
              />
              <input
                required
                type="text"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                placeholder="Vehicle Plate"
                className="w-1/2 px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <input
                required
                type="number"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                placeholder="Vehicle Capacity"
                className="w-1/2 px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
              />
              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-1/2 px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
            >
              Create Captain Account
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{' '}
            <Link to="/captain-login" className="text-blue-600 font-medium hover:underline">
              Login here
            </Link>
          </p>

          <p className="text-[10px] mt-6 leading-tight text-gray-400">
            This site is protected by reCAPTCHA and the{' '}
            <span className="underline hover:cursor-pointer">Google Privacy Policy</span> and{' '}
            <span className="underline hover:cursor-pointer">Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup
