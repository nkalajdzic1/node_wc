require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}, (err) => {
    if (err) return false;
    return true;
});

const db = mongoose.connection;

db.on('error', () => {
    mongoose.connect('mongodb://localhost/database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    });
    console.log('Connected via localhost on error. Expected docker connection.');
});
db.once('open', () => console.log('Connected to database.'));

module.exports = db;