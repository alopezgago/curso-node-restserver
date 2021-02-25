const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async (rol = '') => {

    const existeRol = await Role.findOne( {rol} );
    if ( !existeRol ) {
            throw new Error(`El rol '${rol}' no es válido`);
    }
};

const emailExiste  = async( correo = '') => {

    const existeEmail = await Usuario.findOne( {correo} );
    if ( existeEmail) {
        throw new Error(`El correo '${correo}' ya existe.`);
    } 
};

const usuarioExistePorId  = async( id = '') => {

    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario) {
        throw new Error(`El id '${id}' no corresponde a ningún usuario.`);
    }
};

module.exports = {
    esRoleValido,
    emailExiste,
    usuarioExistePorId,
};