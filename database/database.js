require('dotenv').config();
const mongoose = require('mongoose');
/*process.env.DATABASE_URL*/

mongoose.connect('mongodb://localhost/local_wc_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', () => console.log('Failed to connect.'));
db.once('open', () => console.log('Connected to database.'));

module.exports = db;