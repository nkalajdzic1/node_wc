const moongose = require('mongoose');

const shoppingListSchema = moongose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    },
    list: {
        type: [{
            product: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
        required: true
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