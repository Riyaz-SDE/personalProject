const User = require("../../../../model/model");

async function checkUser(userId){
    const isUserValid = await User.findById({_id : userId})
    console.log(`isUserExist`,isUserValid)
    return isUserValid
}
module.exports = checkUser