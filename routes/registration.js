const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../database/models/user');

router.post('/', async (req, res) => {

  try {

    const userAlreadyExists = await User.findOne({
      email: req.body.email
    });

    if (userAlreadyExists != null) {
      res.status(409).send(`User with email ${req.body.email} already exists.`);
    } else {

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      console.log(`${hashedPassword}`);

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

router.get('/list', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (exception) {
    console.log(exception);
  }
  res.sendStatus(200);
});

module.exports = router;