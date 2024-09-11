const express = require('express');
const mongoose = require('mongoose');
const Follow = require('../../model/follow');
const User = require('../../model/model');

const router = express.Router();  // Create a new router object

// Follow a user
router.post('/', async (req, res) => {
  const { followerId, followedId } = req.body;
  console.log(followedId,followerId);
  // Check if provided IDs are valid MongoDB ObjectIds
  if (!mongoose.Types.ObjectId.isValid(followerId) || !mongoose.Types.ObjectId.isValid(followedId)) {
    return res.status(400).json({ message: 'Invalid user IDs' });
  }

  try {
    // Check if both users exist
    const follower = await User.findById(followerId);
    const followed = await User.findById(followedId);

    if (!follower || !followed) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new follow relationship
    await Follow.create({ follower: followerId, followed: followedId });

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router