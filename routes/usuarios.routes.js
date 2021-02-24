

const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, usuarioExistePorId } = require('../helpers/db-validators');
        
const router = Router();

router.get('/', [ 
        validarCampos
], usuariosGet);

router.post('/',[ 
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('password', 'La contraseña no es válido').isLength({min:6}),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( emailExiste ),
        // check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRoleValido ),
        validarCampos
], usuariosPost);

router.put('/:idParam', [ 
        check('idParam', 'El id no es correcto').isMongoId(),
        check('idParam').custom( usuarioExistePorId ),
        check('password', 'La contraseña no es válido').isLength({min:6}),
        check('rol').custom( esRoleValido ),
        // check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id',[ 
        check('id', 'El id no es correcto').isMongoId(),
        check('id').custom( usuarioExistePorId ),
        check('rol').custom( esRoleValido ),
        // check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        validarCampos
], usuariosDelete);



module.exports = router;