const { noteModel, userModel } = require("../models/mongoDBModels")
const logger = require('../log/log4js')
const bcrypt = require('bcrypt')

class mongoDBDAO {

    //___USER__//

    addUser = async (userToAdd) => {
        const user = new userModel(userToAdd);
        await user.save();
    };

    getUsers = async () => await userModel.find({});

    checkUser = async (username, password) => {
        try {
            const userExist = await userModel.findOne({ username: username })
            if (userExist !== null) {
                if (bcrypt.compareSync(password, userExist.password)) {
                    return { msg: 'Usuario y contrasena correctos', result: true }
                } else {
                    logger.info(`Se ha intentado logear ${username} con una contrasena incorrecta`)
                    return { msg: 'Contrasena incorrecta', result: false }
                }
            }
            return { msg: 'No existe usuario', result: false }
        } catch (err) {
            logger.error(`Error: ${err}`)
        }
    }

    async getUserBy(username) {
        try {
            const userExiste = await userModel.findOne({ username: username })
            return userExiste ? userExiste : null
        } catch (err) {
            logger.error(`Error: ${err} al intentar recuperar el usuario id:${username} de la base de datos`)
            return null
        }
    }

    deleteUser = async (id) => await userModel.deleteOne({ _id: id });

    updateUser = async (id, userToUpdate) => {
        return await userModel.updateOne(
            { _id: id },
            { $set: { ...userToUpdate } }
        );
    };

    //___note___//

    saveNote = async (noteToAdd) => {
        const note = new noteModel(noteToAdd);
        await note.save();
        console.log("guardado", note)
    };

    getNotes = async () => await noteModel.find({});

    getNoteById = async (id) => await noteModel.findOne({ _id: id });

    deleteNote = async (id) => await noteModel.deleteOne({ _id: id });

    deleteAllNotes = async () => await noteModel.deleteMany();

    updateNote = async (id, noteToUpdate) => {
        return await noteModel.updateOne(
            { _id: id },
            { $set: { ...noteToUpdate } }
        );
    };

}

module.exports = mongoDBDAO;
