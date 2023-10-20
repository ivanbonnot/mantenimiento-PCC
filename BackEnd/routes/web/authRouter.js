const { Router } = require('express')
const flash = require('connect-flash');
const passport = require('passport');
const logger = require("../../log/log4js")

const { newUserController, getUserController, checkUserController, updateUserController } = require('../../controllers/usersControler')
require('../../middleware/auth');
const { generateJwtToken, destroyJWT, isDeletedJWT } = require('../../middleware/auth')
const { isAdmin } = require('../../middleware/isAdmin')

const authWebRouter = Router()
authWebRouter.use(flash())


//__LOGIN__//


authWebRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login', failureFlash: true }), async (req, res) => {
    try {
        req.session.passport.user = req.user.username
        let userData = await getUserController(req.session.passport.user)
        userData = Object.assign({}, userData._doc, { token: generateJwtToken(req.session.passport.user) })
        res.status(200).json(userData)
        //res.redirect('/')
    } catch (error) {
        logger.error(error);
        res.status(500).json('Error interno del servidor');
    }
});

authWebRouter.put('/changepassword', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, newPassword } = req.body;
        
        const checkUser = await checkUserController(username, password)

        if( checkUser.result ) {
            const userUpdate = {
                newPassword
            };

            const user = await updateUserController(id, userUpdate);
            res.status(200).json(user)
        }
        
    } catch (error) {
        logger.error(error);
        res.status(500).json('Error interno del servidor');
    }
});



//__REGISTER__//

authWebRouter.post('/admin/register', isAdmin, async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await getUserController(username)

        if (user) {
            logger.info("Usuario existente ")
            res.status(302).json({ message: 'El usuario ya existe' });
        } else {

            const newUser = {
                username,
                password
            };
            console.log(newUser)
            await newUserController(newUser)
            res.status(200).json({ message: 'Usuario registrado con éxito' });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json('Error interno del servidor');
    }
});

//__LOGOUT__//

authWebRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    try {
        const nombre = req.user.username

        if (nombre) {
            userSave = {}
            destroyJWT(req.headers.authorization)
            req.session.destroy(err => {
                if (!err) {

                } else {
                    res.redirect('/')
                }
            })
        } else {
            res.redirect('/login')
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json('Error interno del servidor');
    }
})


authWebRouter.get('/verify', passport.authenticate('jwt', { session: false }), (req, res) => {
    try {
        res.status(200).json('Token valido');
    } catch (error) {
        logger.error(error);
        res.status(500).json('Error interno del servidor');
    }
})


module.exports = authWebRouter 
