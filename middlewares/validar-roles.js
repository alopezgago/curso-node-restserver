const Usuario = require('../models/usuario');


const esAdminRole = (req = request, res = response, next) =>{

    // debe colocarse despues de validar-jwt que es la proporciona el usuario a partir del JWT
    if ( !req.usuario) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token",
        });
    }

    const {rol, nombre} = req.usuario; // obtenido en validar-jwt

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `Error '${nombre}' no tiene permiso para la modificación solicitada`,
        });
    }

    next();
};

const tieneRole = ( ...roles ) => {

    return (  req, res = response, next ) => {

      // debe colocarse despues de validar-jwt que es la proporciona el usuario a partir del JWT
      if ( !req.usuario) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token",
        });
    }      
        const { rol } = req.usuario;

        if( !roles.includes(rol) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            });    
        }
        
        next();
    };
};

module.exports = {
    esAdminRole,
    tieneRole,
};