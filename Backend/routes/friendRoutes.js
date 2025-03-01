const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");

router.get("/all-users/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const users = await User.find({ _id: { $ne: userId } }).select("name email _id");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/friend-requests/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId).populate("friendRequests", "name email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.friendRequests);
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId).populate("friends", "name email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error fetching friends list:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.post("/send-friend-request", async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Find sender and receiver
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the request already exists
    if (receiver.friendRequests.includes(senderId)) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Add senderId to receiver's friendRequests array
    receiver.friendRequests.push(senderId);
    await receiver.save();

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;