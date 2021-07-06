require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const heplingF = require('./functions');
const User = require('../database/models/user');
const Token = require('../database/models/token');
const authenticateToken = require('./authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {

});


module.exports = router;