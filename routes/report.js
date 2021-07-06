require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const heplingF = require('./functions');
const User = require('../database/models/user');
const Token = require('../database/models/token');
const ShoppingList = require('../database/models/shopping_list');
const authenticateToken = require('./authMiddleware');


const dateFormat = 'MM/DD/YYYY';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    let fromDateValid = moment(req.body.from, dateFormat, true).isValid();
    let toDateValid = moment(req.body.to, dateFormat, true).isValid();
    if (!fromDateValid || !toDateValid)
        return res.status(400).json({
            message: `Invalid date format. Date must be in the ${dateFormat} format!`
        });

    const from = new Date(req.body.from);
    const to = new Date(req.body.to);

    ShoppingList.aggregate([{
            $group: {
                _id: "$list.product",
                sum: {
                    $max: "$list.quantity"
                }
            }
        }])
        .then(res => res.json(res)).catch(err => res.json(err));


    //res.json(report);
});


module.exports = router;