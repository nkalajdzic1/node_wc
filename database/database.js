require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() => console.log('Database connected.')).catch(() => console.log('Database failed to connect.'));

const db = mongoose.connection;


module.exports = db;