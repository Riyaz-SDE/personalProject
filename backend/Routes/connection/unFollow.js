const express = require('express');
const mongoose = require('mongoose');
const Follow = require('../../model/follow');
// const User = require('../../model/model');

const router = express.Router();

router.post('/unfollow', async (req, res) => {
    const { followerId, followedId } = req.body;
  
    // Check if provided IDs are valid MongoDB ObjectIds
    if (!mongoose.Types.ObjectId.isValid(followerId) || !mongoose.Types.ObjectId.isValid(followedId)) {
      return res.status(400).json({ message: 'Invalid user IDs' });
    }
  
    try {
      // Delete the follow relationship
      await Follow.deleteOne({ follower: followerId, followed: followedId });
  
      res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });