require('dotenv').config();

const express = require('express');
const moment = require('moment');

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

    const products = await ShoppingList.aggregate([{
        $match: {
            "created_at": {
                "$gte": from,
                "$lte": to
            }
        }

    }, {
        $project: {
            "product": "$list.product",
            "quantity": "$list.quantity"
        }
    }]);

    var valueArray = products.map(x => x.product.map((y, i) => [y, x.quantity[i]]));

    var productObjArray = [];
    valueArray.forEach(x => {
        x.forEach(y => {
            productObjArray.push({
                product: y[0],
                quantity: y[1]
            });
        })
    });

    var report = [];
    for (var i = 0; i < productObjArray.length; i++) {
        productObjArray[i].quantity = productObjArray.reduce((a, b) => b.product == productObjArray[i].product ?
            a + b.quantity : a, 0);
        if (report.filter(x => x.product === productObjArray[i].product).length == 0) report.push(productObjArray[i]);
    }

    res.json(report);


    //res.json(report);
});


module.exports = router;