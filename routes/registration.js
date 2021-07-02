const express = require('express');
const router = express.Router();
const User = require('../database/models/user');

router.get('/', async (req, res) => {

  try {
    const users = await User.find();
    res.json(users);
  } catch (exception) {
    res.status(500).json({
      message: exception.message
    });
  }

});

router.get('/list', (req, res) => {
  res.send('users list');
});

module.exports = router;