import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Card from "../components/Card";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  // Fetch all users except the current user
  const fetchUsers = useCallback(async () => {
    if (!currentUser?._id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/friends/all-users/${currentUser._id}`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [currentUser]);

  // Fetch friend requests for the current user
  const fetchFriendRequests = useCallback(async () => {
    if (!currentUser?._id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/friends/friend-requests/${currentUser._id}`);
      setFriendRequests(res.data);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  }, [currentUser]);

  // Fetch friends list for the current user
  const fetchFriends = useCallback(async () => {
    if (!currentUser?._id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/friends/${currentUser._id}`);
      setFriends(res.data);
    } catch (error) {
      console.error("Error fetching friends list:", error);
    }
  }, [currentUser]);

  // Respond to a friend request (accept or reject)
  const respondToRequest = async (senderId, action) => {
    if (!currentUser?._id) return; // Ensure currentUser._id exists
    try {
      await axios.post("http://localhost:5000/api/friends/respond-friend-request", {
        userId: currentUser._id,
        senderId,
        action, // "accept" or "reject"
      });

      // Update friendRequests state by removing the responded request
      setFriendRequests((prevRequests) => prevRequests.filter((req) => req._id !== senderId));

      // If the action is "accept", refetch the friends list
      if (action === "accept") fetchFriends();
    } catch (error) {
      console.error("Error responding to request:", error);
    }
  };

  // Fetch data when the component mounts or currentUser changes
  useEffect(() => {
    if (currentUser) {
      fetchUsers();
      fetchFriendRequests();
      fetchFriends();
    }
  }, [currentUser, fetchUsers, fetchFriendRequests, fetchFriends]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">All Users</h1>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <Card key={user._id} user={user} />
        ))}
      </div>

      {friendRequests.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-6">Pending Friend Requests</h2>
          <div className="grid grid-cols-2 gap-4">
            {friendRequests.map((req) => (
              <div key={req._id} className="p-4 bg-yellow-200 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{req.name}</h3>
                <div className="mt-2">
                  <button
                    onClick={() => respondToRequest(req._id, "accept")}
                    className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => respondToRequest(req._id, "reject")}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {friends.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-6">My Friends</h2>
          <div className="grid grid-cols-3 gap-4">
            {friends.map((friend) => (
              <div key={friend._id} className="p-4 bg-blue-200 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{friend.name}</h3>
                <p className="text-gray-700">{friend.email}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;