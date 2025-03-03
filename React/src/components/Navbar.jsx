import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://my-social-app-r4ch.onrender.com/api/friends/all-users/${currentUser._id}`
      );
      const filteredUsers = response.data.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredUsers);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Side: App Name and Mobile Toggle */}
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">MyApp</h1>
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`md:flex space-x-4 ${
            isMobileMenuOpen ? "flex flex-col mt-4 md:mt-0" : "hidden md:flex"
          }`}
        >
          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-200 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-200 transition">
            Contact
          </Link>
          <Link to="/dashboard" className="hover:text-gray-200 transition">
            Dashboard
          </Link>
        </div>

        {/* Right Side: Search Bar and User Info */}
        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="search-container relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => setIsSearchOpen(true)}
              className="px-3 py-1 rounded-lg bg-white bg-opacity-20 placeholder-black text-black focus:outline-none focus:bg-opacity-30 transition border-2 border-red-500" // Temporary border
            />

            {/* Search Results Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-10 left-0 w-64 bg-white text-gray-800 rounded-lg shadow-lg z-50">
                {searchResults.map((user) => (
                  <div
                    key={user._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/profile/${user._id}`);
                      setIsSearchOpen(false);
                    }}
                  >
                    {user.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Info and Logout Button */}
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm hidden md:inline">
                Welcome, {currentUser.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-gray-200 transition">
              Login/Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
