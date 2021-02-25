const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, usuarioExistePorId } = require('../helpers/db-validators');

const { login, googleSignin } = require('../controllers/auth.controller');
        
const router = Router();

router.post('/login', [ 
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], login);


router.post('/google', [ 
    check('id_token', 'El id_token es obligatorio').notEmpty(),
    validarCampos
], googleSignin);






module.exports = router;