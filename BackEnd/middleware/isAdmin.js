const passport = require('passport');
const { getUserController } = require("../controllers/usersControler");

const isAdmin = async (req, res, next) => {

  const user = await getUserController(req.user.username)
  //const isAdm = user.admin
  console.log(user)
  

  

  // Verificar si el usuario es administrador
  if (!user.admin) {
    return res.status(403).json({ message: 'Acceso prohibido para usuarios no administradores' });
  }

  // Si el usuario es administrador, permitir el acceso a la ruta
  next();
};

module.exports = { isAdmin }