const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../database/models/user');

//<<<<<< registration route >>>>>>//
router.post('/', async (req, res) => {

  try {

    const userAlreadyExists = await User.findOne({
      email: req.body.email
    });

    if (userAlreadyExists != null) {
      res.status(409).send(`User with email ${req.body.email} already exists.`);
    } else {

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      User.create({
        email: req.body.email,
        password: hashedPassword
      });

      res.status(201).send(`User with email ${req.body.email} created.`);
    }

  } catch (exception) {
    return res.status(400).json({
      message: exception.message
    });
  }
});

module.exports = router;