require('dotenv').config();

const express = require('express');
const Token = require('../database/models/token');
const router = express.Router();

router.delete('/', async (req, res) => {
    if (req.body.token == null) return res.sendStatus(400);

    await Token.deleteOne({
        token: req.body.token
    });

    res.sendStatus(403);
});

module.exports = router;