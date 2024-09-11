const express = require('express');
const mongoose = require('mongoose');
const Follow = require('../../model/follow');
// const User = require('../../model/User');

const router = express.Router();

router.get('/users/:userId/following', async (req, res) => {
    const { userId } = req.params;
  
    // Check if provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
  
    try {
      // Find all follow relationships where the user is following others
      const following = await Follow.find({ follower: userId }).populate('followed', 'username email');
      
      res.status(200).json(following);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });