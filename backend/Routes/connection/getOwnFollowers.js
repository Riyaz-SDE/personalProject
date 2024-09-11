const express = require('express');
const mongoose = require('mongoose');
const Follow = require('../../model/follow');
// const User = require('../../model/User');

const router = express.Router();

router.get('/users/:userId/followers', async (req, res) => {
    const { userId } = req.params;

    console.log(userId);
    // Check if provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
  
    try {
      // Find all follow relationships where the user is being followed
      const followers = await Follow.find({ followed: userId }).populate('follower', 'username email');
      
      res.status(200).json(followers);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

module.exports = router