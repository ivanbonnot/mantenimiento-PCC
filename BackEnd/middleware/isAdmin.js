const passport = require('passport');
const { getUserController } = require("../controllers/usersControler");
let user = []

const isAdmin = async (req, res, next) => {
  try {
    user = await getUserController(req.user.username)
    console.log(user)
    console.log(user.admin, user.administrator)

    if (user && user.administrator === true) {
      // El usuario es un administrador
      next();
    } else {
      // El usuario no es un administrador
      return res.status(403).json({ message: 'Acceso prohibido para usuarios no administradores' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }

};

module.exports = { isAdmin }