require('dotenv').config();

const express = require('express');

const ShoppingList = require('../database/models/shopping_list');
const authenticateToken = require('./authMiddleware');

const router = express.Router();

function createListObject(body, user) {
    return {
        name: body.name,
        user_id: user.id,
        user_email: user.email,
        created_at: new Date(),
        list: body.list
    }
}

router.post('/add', authenticateToken, async (req, res) => {

    if (req.body == null) return res.sendStatus(400);

    if (req.body.name == "" || req.body.list == null) return res.sendStatus(400);

    const listObject = createListObject(req.body, req.user);

    try {
        const list = await ShoppingList.create(listObject);
        return res.status(201).json(list);
    } catch (exception) {
        return res.status(400).json({
            message: exception.message
        });
    }

});

router.get('/all', authenticateToken, async (req, res) => {
    const list = await ShoppingList.find({
        user_email: req.user.email
    });
    res.json(list);
});

router.delete('/:listname', authenticateToken, async (req, res) => {
    console.log(req.params.listname);
    try {
        const list = await ShoppingList.remove({
            name: req.params.listname,
            user_email: req.user.email
        });
        res.json(list);
    } catch (exception) {
        return res.status(400).json({
            message: exception.message
        });
    }

});

router.put('/update', authenticateToken, async (req, res) => {

    if (req.body == null) return res.sendStatus(400);

    if (req.body.name == "" || req.body.list == null) return res.sendStatus(400);

    if (req.body.modifiedListName != null && req.body.modifiedListName != "") {
        const listObjectModifyWithName = {
            name: req.body.modifiedListName,
            updated_at: new Date(),
            list: req.body.list,
        };

        ShoppingList.updateOne({
                name: req.body.name,
                user_email: req.user.email,
            }, listObjectModifyWithName)
            .then(x => res.json(x)).catch(err => res.json(err));
        return;
    }

    const listObjectModifyWithoutName = {
        updated_at: new Date(),
        list: req.body.list
    };


    ShoppingList.updateOne({
        name: req.body.name,
        user_email: req.user.email
    }, listObjectModifyWithoutName).then(x => res.json(x)).catch(err => res.json(err));

});


module.exports = router;