const moongose = require('mongoose');

const shoppingListSchema = moongose.Schema({
    user_id: {
        type: Number,
        required: true,
    },
    product_id: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

module.exports = moongose.model('ShoppingList', shoppingListSchema);