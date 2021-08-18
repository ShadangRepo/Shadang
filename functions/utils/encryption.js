const bcrypt = require('bcrypt');
const saltRounds = 12;

const encryptPassword = async plainTextPassword => {
    const hash = bcrypt.hashSync(plainTextPassword, saltRounds);
    return hash
}

const checkPassword = async (plainTextPassword, hash) => {
    const passwordMatched = bcrypt.compareSync(plainTextPassword, hash);
    if (passwordMatched) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    encryptPassword,
    checkPassword
}