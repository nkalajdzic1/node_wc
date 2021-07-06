require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const heplingF = require('./functions');
const User = require('../database/models/user');
const Token = require('../database/models/token');

const router = express.Router();

router.post('/token', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);

    const token = await Token.find({
        token: refreshToken
    });

    if (token == null) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = heplingF.generateAccesToken({
            user_email: user.email
        });
        res.json({
            accessToken: accessToken
        });
    });


});

router.post('/', async (req, res) => {

    if (req.body.email == null)
        return res.status(400).send('You must send a email!');
    else if (req.body.password == null)
        return res.status(400).send('You have not send any password. Password is blank!');
    else if (!heplingF.validateEmail(req.body.email))
        return res.status(400).send(`${req.body.email} is an invalid email.`);

    try {

        const userExists = await User.findOne({
            email: req.body.email
        });

        if (userExists == null)
            return res.status(400).send(`User with email ${req.body.email} does not exist. You need to register first.`);


        if (await bcrypt.compare(req.body.password, userExists.password)) {

            const user = {
                id: userExists.id,
                email: userExists.email,
                password: userExists.password
            };

            const accessToken = heplingF.generateAccesToken(user);
            const refreshToken = heplingF.generateRefreshToken(user);

            await Token.create({
                user_id: userExists.id,
                token: refreshToken
            });

            res.json({
                accessToken: accessToken,
                refreshToken: refreshToken
            });

        } else return res.send(`Invalid password for email ${userExists.email}`);

    } catch (exception) {
        return res.status(400).json({
            message: exception.message
        });
    }


});

module.exports = router;