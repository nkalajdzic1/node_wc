const User = require('../models/user');
const Token = require('../models/token');

const deleteData = async () => {
    try {
        await User.deleteMany();
        console.log("User data cleared.");
        await Token.deleteMany();
        console.log("User token data cleared.");
    } catch (exception) {
        console.log(exception);
    }
}

module.exports = deleteData;