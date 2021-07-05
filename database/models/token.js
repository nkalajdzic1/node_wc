const moongose = require('mongoose');

const tokenSchema = moongose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    token: {
        type: String,
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

module.exports = moongose.model('Token', tokenSchema);