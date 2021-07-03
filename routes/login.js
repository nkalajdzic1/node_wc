require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../database/models/user');
const validateEmail = require('./functions');

router.post('/', async (req, res) => {

    if (req.body.email == null)
        res.status(400).send('You must send a email!');
    else if (req.body.password == null) {
        res.status(400).send('You have not send any password. Password is blank!');
    } else if (!validateEmail(req.body.email))
        res.status(400).send(`${req.body.email} is an invalid email.`);
    else {
        try {

            const userExists = await User.findOne({
                email: req.body.email
            });

            if (userExists == null)
                res.status(400).send(`User with email ${req.body.email} does not exist. You need to register first.`);
            else {

                if (await bcrypt.compare(req.body.password, userExists.password)) {

                    const user = {
                        email: userExists.email,
                        password: userExists.password
                    };

                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                    res.json({
                        accessToken: accessToken
                    });

                } else
                    res.send(`Invalid password for email ${userExists.email}`);
            }
        } catch (exception) {
            res.status(400).send('Error');
        }

    }

});

module.exports = router;