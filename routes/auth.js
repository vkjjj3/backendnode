/*
Rutas de Usuarios /Auth
host + /api/auth
*/

const {Router} = require('express');
//const router = express.Router;
const router = Router();
const {check} = require('express-validator');
const {crearUsuario ,loginUsuario, revalidarToken } = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



router.post(
    '/new', 
    [//midleware
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el debe de ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario);

router.post('/'  , 
            [//midleware
                check('email', 'el email es obligatorio').isEmail(),
                check('password', 'el password es obligatorio'),
                validarCampos
            ]
        ,loginUsuario);

router.get('/renew',validarJWT, revalidarToken);



module.exports = router;