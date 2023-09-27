const passport = require('passport');
const { getUserController } = require("../controllers/usersControler");

const isAdmin = async (req, res, next) => {
  //const user = await getUserController(req.user)
  console.log(req.user)
  console.log(req.session)

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  // Verificar si el usuario es administrador
  if (!req.user || !req.user.admin) {
    return res.status(403).json({ message: 'Acceso prohibido para usuarios no administradores' });
  }

  // Si el usuario es administrador, permitir el acceso a la ruta
  next();
};

module.exports = { isAdmin }