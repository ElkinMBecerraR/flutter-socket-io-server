/*
path: api/login
*/ 
const { Router } = require('express'); //para poder crear rutas en la app
const { check } = require('express-validator');

// creadas por mi
const { crearUsuario, loguearUsuario, renovarToken } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');
const router = Router();

// que quiero hacer POST GET DELETE  []-->middleware
router.post('/new', [
   check('nombre','El nombre es obligatorio').not().isEmpty(),
   check('email','El email es obligatorio').isEmail(),
   check('password','El pass es obligatorio').not().isEmpty(),
   validarCampos 
] ,crearUsuario);


// ruta para el login 

router.post('/', [
   check('email','El email es obligatorio').isEmail(),
   check('password','El password es obligatorio').not().isEmpty(),
], loguearUsuario);

router.get('/renewjwt',validarJWT, renovarToken);

module.exports = router;