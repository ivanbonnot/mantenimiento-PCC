const { Router } = require('express')
const flash = require('connect-flash');
const path = require('path');
const passport = require('passport');
const logger = require("../../log/log4js")

const { newUserController, getUserController } = require('../../controllers/usersControler')
require('../../middleware/auth');
const { generateJwtToken, destroyJWT } = require('../../middleware/auth')

const authWebRouter = Router()
authWebRouter.use(flash())


//__LOGIN__//

authWebRouter.get('/login', (req, res) => {
    try {
        const userEmail = req.session.user
        if (userEmail) {
            res.redirect('/')
        } else {

        }
    } catch (error) {
        logger.error(error);
        res.status(500).json('Error interno del servidor');
    }
})


authWebRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login', failureFlash: true }), async (req, res) => {
    try {
        req.session.passport.user = req.user.username
        console.log(`passport: ${req.session.passport.user}`)
        let userData = await getUserController(req.session.passport.user)
        userData = Object.assign({}, userData._doc, { token: generateJwtToken(req.session.passport.user, res) })
        res.status(200).json(userData)
        console.log(`passport: ${req.session.passport.user}, user: ${userData}`)
        //res.redirect('/')
    } catch (error) {
        logger.error(error);
        res.status(500).json('Error interno del servidor');
    }
});


//__REGISTER__//

authWebRouter.get('/register', (req, res) => {
    try {
        const nombre = req.session.user
        if (nombre) {
            res.redirect('/')
        } else {
            res.render(path.join(process.cwd(), './public/views/register.ejs'), { message: req.flash('error') })
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json('Error interno del servidor');
    }
})


authWebRouter.post('/register', passport.authenticate('register', { failureRedirect: '/login', failureFlash: true }), async (req, res) => {
    try {
        req.session.passport.user = req.user.username
        const username = req.user.username;
        console.log(req.user)
        const user = await getUserController(username)

        if (user) {
            logger.info("Usuario existente ")
            res.status(302).json({ message: 'El usuario ya existe' });
        } else {

            const { username, password } = req.body;

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
