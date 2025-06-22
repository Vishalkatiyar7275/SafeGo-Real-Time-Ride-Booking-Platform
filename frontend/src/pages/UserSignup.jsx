import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
      );
      console.log('Signup response:', response); // Debug: log the full response
      if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');
      navigate('/home');
      } else {
      console.log('Unexpected status:', response.status); // Debug: log unexpected status
      setError('Unexpected response from server.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="w-[90%] max-w-5xl bg-white rounded-2xl overflow-hidden flex shadow-lg">
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-br from-blue-100 to-green-100 p-10 flex flex-col justify-center items-center">
          <img
            src="/SafeLogo.png"
            alt="SafeGo Logo"
            className="w-36 h-36"
          />
          <h2 className="text-2xl font-bold text-center mb-2">Welcome to SafeGo</h2>
          <p className="text-center text-gray-700">
            Seamlessly book rides and get to your destination securely and on time. Let&apos;s get started!
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-6">Sign up for your account</h2>

          <form onSubmit={submitHandler}>
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="First name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 bg-gray-100 border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Last name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 bg-gray-100 border rounded-lg px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                placeholder="email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 border rounded-lg px-4 py-2"
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 border rounded-lg px-4 py-2"
              />
            </div>

            {error && (
              <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>

          <p className="text-[10px] leading-tight mt-8 text-center text-gray-400">
            This site is protected by reCAPTCHA and the{' '}
            <span className="underline">Google Privacy Policy</span> and{' '}
            <span className="underline">Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
