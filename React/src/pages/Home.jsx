import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">MySocialApp</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Connect with Friends and the World
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Discover new connections, and stay updated with
            what matters to you.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/about")} // Redirect to /about
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose MySocialApp?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-blue-600 text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Easy to Use
            </h3>
            <p className="text-gray-600">
              Our intuitive interface makes it easy to connect and share with
              friends.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-blue-600 text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600">
              Your data is safe with us. We prioritize your privacy and security.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-blue-600 text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Global Reach
            </h3>
            <p className="text-gray-600">
              Connect with people from all over the world and expand your network.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} MySocialApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
