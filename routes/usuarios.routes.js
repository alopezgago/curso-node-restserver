

const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios.controller');
const { esRoleValido, emailExiste, usuarioExistePorId } = require('../helpers/db-validators');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const {validarCampos, validarJWT, esAdminRole, tieneRole  } = require('../middlewares');
const router = Router();

router.get('/', [
        validarJWT,
        validarCampos
], usuariosGet);

router.post('/',[
        // validarJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('password', 'La contraseña no es válido').isLength({min:6}),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( emailExiste ),
        // check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRoleValido ),
        validarCampos
], usuariosPost);

router.put('/:idParam', [ 
        validarJWT,
        check('idParam', 'El id no es correcto').isMongoId(),
        check('idParam').custom( usuarioExistePorId ),
        check('password', 'La contraseña no es válido').isLength({min:6}),
        check('rol').custom( esRoleValido ),
        // check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id',[ 
        validarJWT,
        esAdminRole,
        tieneRole( 'ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'El id no es correcto').isMongoId(),
        check('id').custom( usuarioExistePorId ),
        // check('rol').custom( esRoleValido ),
        // check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        validarCampos
], usuariosDelete);



module.exports = router;