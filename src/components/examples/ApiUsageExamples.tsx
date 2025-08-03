import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  programService,
  bookingService,
  userService,
  orderService,
  reviewService,
  locationService,
  facilityService,
  amenityService,
  type Program,
  type Booking,
  type Order,
  type Review,
  type Country,
  type Facility,
  type LoginRequest,
  type RegisterRequest,
  type CreateBookingRequest,
  type CreateReviewRequest
} from '../../services';

const ApiUsageExamples: React.FC = () => {
  const { user, login, register, logout, isAuthenticated, isLoading, error } = useAuth();
  
  // State for examples
  const [programs, setPrograms] = useState<Program[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  // Form states
  const [loginForm, setLoginForm] = useState<LoginRequest>({
    email: 'test@user.com',
    password: 'password'
  });
  const [registerForm, setRegisterForm] = useState<RegisterRequest>({
    email: '',
    password: '',
    role: 'user'
  });

  // Load data when component mounts
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load user-specific data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserData();
    }
  }, [isAuthenticated, user]);

  const loadInitialData = async () => {
    try {
      // Load public data
      const [programsData, countriesData, facilitiesData] = await Promise.all([
        programService.getPrograms(),
        locationService.getCountries(),
        facilityService.getAllFacilities()
      ]);
      
      setPrograms(programsData);
      setCountries(countriesData);
      setFacilities(facilitiesData);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  };

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      // Load user-specific data
      const [bookingsData, ordersData] = await Promise.all([
        bookingService.getUserBookings(user.code),
        orderService.getUserOrders(user.code)
      ]);
      
      setBookings(bookingsData);
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginForm);
      alert('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(registerForm);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleCreateBooking = async (program: Program) => {
    if (!user) {
      alert('Please login first');
      return;
    }

    try {
      const bookingData: CreateBookingRequest = {
        orderId: `ORD${Date.now()}`,
        programCode: program.code,
        userCode: user.code,
        startDate: program.startDate,
        endDate: program.endDate,
        status: 'confirmed',
        code: `BK${Date.now()}`
      };

      const booking = await bookingService.createBooking(bookingData);
      setBookings(prev => [...prev, booking]);
      alert('Booking created successfully!');
    } catch (error) {
      console.error('Failed to create booking:', error);
      alert('Failed to create booking');
    }
  };

  const handleCreateReview = async (program: Program, rating: number, comment: string) => {
    if (!user) {
      alert('Please login first');
      return;
    }

    try {
      const reviewData: CreateReviewRequest = {
        programCode: program.code,
        userCode: user.code,
        rating,
        comment
      };

      const review = await reviewService.createReview(reviewData);
      setReviews(prev => [...prev, review]);
      alert('Review created successfully!');
    } catch (error) {
      console.error('Failed to create review:', error);
      alert('Failed to create review');
    }
  };

  const handleGetProgramReviews = async (program: Program) => {
    try {
      const programReviews = await reviewService.getProgramReviews(program.code);
      setReviews(programReviews);
      setSelectedProgram(program);
    } catch (error) {
      console.error('Failed to get reviews:', error);
    }
  };

  const handleSearchPrograms = async (city: string) => {
    try {
      const cityPrograms = await programService.getProgramsByCity(city);
      setPrograms(cityPrograms);
    } catch (error) {
      console.error('Failed to search programs:', error);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">API Usage Examples</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Authentication Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
        
        {!isAuthenticated ? (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Login Form */}
            <div>
              <h3 className="text-lg font-medium mb-3">Login</h3>
              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Login
                </button>
              </form>
              <p className="text-sm text-gray-600 mt-2">
                Try: test@user.com / password
              </p>
            </div>

            {/* Register Form */}
            <div>
              <h3 className="text-lg font-medium mb-3">Register</h3>
              <form onSubmit={handleRegister} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <select
                  value={registerForm.role || 'user'}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, role: e.target.value as 'user' | 'facility' | 'admin' }))}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="user">User</option>
                  <option value="facility">Facility</option>
                  <option value="admin">Admin</option>
                </select>
                <button 
                  type="submit" 
                  className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg">Welcome, {user?.email}!</p>
              <p className="text-sm text-gray-600">Role: {user?.role}</p>
              <p className="text-sm text-gray-600">Code: {user?.code}</p>
            </div>
            <button 
              onClick={logout}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </section>

      {/* Programs Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Programs ({programs.length})</h2>
        
        <div className="mb-4">
          <button 
            onClick={() => handleSearchPrograms('Delhi')}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
          >
            Search Delhi Programs
          </button>
          <button 
            onClick={() => handleSearchPrograms('Mumbai')}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
          >
            Search Mumbai Programs
          </button>
          <button 
            onClick={loadInitialData}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Show All Programs
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.slice(0, 6).map((program) => (
            <div key={program.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">{program.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{program.description}</p>
              <p className="text-sm text-gray-500 mb-3">
                {program.facility?.city}, {program.facility?.country}
              </p>
              <p className="text-lg font-semibold mb-3">${program.price}</p>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleCreateBooking(program)}
                  className="w-full bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700"
                  disabled={!isAuthenticated}
                >
                  Book Now
                </button>
                <button
                  onClick={() => handleGetProgramReviews(program)}
                  className="w-full bg-purple-600 text-white py-1 px-3 rounded text-sm hover:bg-purple-700"
                >
                  View Reviews
                </button>
                <button
                  onClick={() => handleCreateReview(program, 5, 'Great program!')}
                  className="w-full bg-yellow-600 text-white py-1 px-3 rounded text-sm hover:bg-yellow-700"
                  disabled={!isAuthenticated}
                >
                  Add Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* User Data Section (only when authenticated) */}
      {isAuthenticated && (
        <>
          {/* Bookings Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">My Bookings ({bookings.length})</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-600">No bookings yet. Book a program to see it here!</p>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded p-3">
                    <p className="font-medium">Booking #{booking.orderId}</p>
                    <p className="text-sm text-gray-600">Status: {booking.status}</p>
                    <p className="text-sm text-gray-600">Code: {booking.code}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Orders Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">My Orders ({orders.length})</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded p-3">
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">Status: {order.status}</p>
                    <p className="text-sm text-gray-600">Amount: ${order.totalAmount}</p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(order.createdAt || '').toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* Reviews Section */}
      {selectedProgram && (
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Reviews for {selectedProgram.name} ({reviews.length})
          </h2>
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet for this program.</p>
          ) : (
            <div className="space-y-3">
              {reviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded p-3">
                  <div className="flex items-center mb-2">
                    <span className="font-medium mr-2">{review.user?.email}</span>
                    <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                    <span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Locations Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Locations ({countries.length})</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {countries.slice(0, 6).map((country) => (
            <div key={country.id} className="border border-gray-200 rounded p-3">
              <h3 className="font-medium">{country.name}</h3>
              <p className="text-sm text-gray-600">Code: {country.code}</p>
              <p className="text-sm text-gray-600">
                Cities: {country.cities?.length || 0}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Facilities ({facilities.length})</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilities.slice(0, 6).map((facility) => (
            <div key={facility.id} className="border border-gray-200 rounded p-3">
              <h3 className="font-medium">{facility.name}</h3>
              <p className="text-sm text-gray-600">{facility.description}</p>
              <p className="text-sm text-gray-600">{facility.city}, {facility.country}</p>
              <p className="text-sm text-gray-600">Type: {facility.ctype}</p>
            </div>
          ))}
        </div>
      </section>

      {/* API Documentation */}
      <section className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Available API Services</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Authentication</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• authService.login()</li>
              <li>• authService.register()</li>
              <li>• authService.logout()</li>
              <li>• authService.getProfile()</li>
              <li>• authService.googleLogin()</li>
              <li>• authService.sendOTP() / verifyOTP()</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Programs</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• programService.getPrograms()</li>
              <li>• programService.getProgramByCode()</li>
              <li>• programService.createProgram()</li>
              <li>• programService.getProgramsByCity()</li>
              <li>• programService.searchPrograms()</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Bookings</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• bookingService.createBooking()</li>
              <li>• bookingService.getUserBookings()</li>
              <li>• bookingService.getBookingByCode()</li>
              <li>• bookingService.cancelBooking()</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Reviews</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• reviewService.createReview()</li>
              <li>• reviewService.getProgramReviews()</li>
              <li>• reviewService.getUserReviews()</li>
              <li>• reviewService.updateReview()</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h4 className="font-medium text-blue-900 mb-2">Environment Configuration</h4>
          <p className="text-sm text-blue-800">
            Set VITE_API_BASE_URL in your .env file to connect to your backend API.
            Without it, the app will use sample data for demonstration.
          </p>
          <p className="text-sm text-blue-800 mt-1">
            Example: VITE_API_BASE_URL=http://localhost:3000/api
          </p>
        </div>
      </section>
    </div>
  );
};

export default ApiUsageExamples;