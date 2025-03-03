import PropTypes from "prop-types";
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Correct casing

const Card = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const [requestSent, setRequestSent] = useState(false);

  const sendFriendRequest = async (receiverId) => {
    if (!currentUser) {
      alert("Please log in to send friend requests.");
      return;
    }

    if (receiverId === currentUser._id) {
      alert("You cannot send a friend request to yourself!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/friends/send-friend-request", {
        senderId: currentUser._id,
        receiverId,
      });
      setRequestSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Error sending request");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
      <h1 className="text-2xl font-semibold">{user.name}</h1>

      {!requestSent ? (
        <button
          onClick={() => sendFriendRequest(user._id)}
          className="mt-4 w-full bg-white text-blue-600 p-2 rounded-lg hover:bg-gray-200 transition"
        >
          + Add Friend
        </button>
      ) : (
        <p className="mt-4 text-center text-gray-300">Request Sent ✅</p>
      )}
    </div>
  );
};

Card.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Card;