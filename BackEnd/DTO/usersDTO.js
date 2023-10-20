const factoryDAO = require('../DAO/factory')
const bcrypt = require('bcrypt');

const users = factoryDAO()

const checkUserDTO = async (username, password) => await users.checkUser(username, password);

const getUserDTO = async (username) => await users.getUserBy(username);

const addUserDTO = async (user) => await users.addUser(user);

const updateUserDTO = async (id, userToUpdate) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userToUpdate.password, salt);
        userToUpdate.password = hash;
        await users.updateUser(id, userToUpdate);
    } catch (err) {
        // Manejar errores aquí
        console.error(err);
    }
}


module.exports = { checkUserDTO, getUserDTO, addUserDTO, updateUserDTO }

