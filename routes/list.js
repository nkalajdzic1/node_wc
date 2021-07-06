require('dotenv').config();

const express = require('express');

const ShoppingList = require('../database/models/shopping_list');
const authenticateToken = require('./authMiddleware');

const router = express.Router();

function createListObject(body, user) {
    return {
        name: body.name,
        user_id: user.id,
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

router.get('/all', async (req, res) => {
    const list = await ShoppingList.find();
    res.json(list);
});

router.put('/update', authenticateToken, async (req, res) => {

    if (req.body == null) return res.sendStatus(400);

    if (req.body.name == "" || req.body.list == null) return res.sendStatus(400);

    if (req.body.modifiedListName != null && req.body.modifiedListName != "") {
        const listObjectModifyWithName = {
            name: req.body.modifiedListName,
            user_id: req.user.id,
            updated_at: new Date(),
            list: req.body.list,
        };

        ShoppingList.updateOne({
                name: req.body.name,
                user_id: req.user.id
            }, listObjectModifyWithName)
            .then(x => res.json(x)).catch(err => res.json(err));
        return;
    }

    const listObjectModifyWithoutName = {
        user_id: req.user.id,
        updated_at: new Date(),
        list: req.body.list
    };


    ShoppingList.updateOne({
        name: req.body.name,
        user_id: req.user.id
    }, listObjectModifyWithoutName).then(x => res.json(x)).catch(err => res.json(err));

});


module.exports = router;