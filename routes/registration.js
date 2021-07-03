const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../database/models/user');
const authenticateToken = require('./authMiddleware');

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

      res.status(200).send(`User with email ${req.body.email} created.`);
    }

  } catch (exception) {
    console.log(exception);
  }
});

router.get('/list', authenticateToken, async (req, res) => {
  res.json(req.user);
  /*try {
    const users = await User.find();
    res.json(users);
  } catch (exception) {
    console.log(exception);
  }*/
  res.sendStatus(200);
});

module.exports = router;