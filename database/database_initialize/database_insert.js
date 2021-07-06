const fs = require('fs');
const User = require('../models/user');

//<<<<<< database seeders >>>>>>//
const user_seeds = JSON.parse(fs.readFileSync(`${__dirname}/../seeders/user.json`, "utf-8"));

//<<<<<< database import of seeds >>>>>>//
const importData = async () => {
    try {
        await User.create(user_seeds);
        console.log("Data for users imported.");
        //process.exit();
    } catch (exception) {
        console.log(exception);
    }
}

module.exports = importData;