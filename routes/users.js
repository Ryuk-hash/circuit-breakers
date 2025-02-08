const express = require('express');
const Users = require('../models/users');

const router = express.Router();

router.get('/:id', async function (req, res) {
  try {
    const user = await Users.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ success: false, message: 'User not found.', data: { user: null } });

    return res.status(200).json({ success: true, message: 'Fetched single user.', data: { user } });
  } catch (error) {
    console.error('Error fetching user:', error);

    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
});

router.post('/', async function (req, res) {
  try {
    const { name, email, mobile } = req.body;
    if (!name || !email || !mobile)
      return res.status(400).json({ success: false, message: 'Missing required fields.', data: null });

    const newUser = await Users.create(req.body);

    return res.status(201).json({ success: true, message: 'Created new user.', data: { user: newUser } });
  } catch (error) {
    console.error('Error creating new user:', error);

    return res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
});

module.exports = router;
