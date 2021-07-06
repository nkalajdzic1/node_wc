const User = require('../models/user');
const Token = require('../models/token');
const ShoppingList = require('../models/shopping_list');

const deleteData = async () => {
    try {
        await Token.deleteMany();
        console.log("User token data cleared.");
        await ShoppingList.deleteMany();
        console.log("Shopping list data cleared.");
        await User.deleteMany();
        console.log("User data cleared.");
    } catch (exception) {
        console.log(exception);
    }
}

module.exports = deleteData;