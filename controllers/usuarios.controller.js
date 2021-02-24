const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    if ( isNaN(limite) || isNaN(desde) ) {
        return res.status(400).json({
            msg: 'Error en parametros. Debe ser un número entero',
        });
    }

    try {
        const [ total, usuarios ] = await Promise.all([
            Usuario.countDocuments( query ),
            Usuario.find( query )
                .skip ( Number(desde) )
                .limit( Number(limite) )
        ]);
    
        const numRegistros = usuarios.length;
        
        return res.status(200).json({
            total,
            numRegistros,
            usuarios,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error POST usuarios',
        });
    }
};
const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);


    try {
        
        await usuario.save();
        
        return res.status(200).json({
            msg: 'post API - Controlador',
            usuario
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error POST usuarios',
        });
    }


    
};


const usuariosPut = async (req, res = response) => {
    const {idParam} = req.params;

    const { _id, google, password, correo, id, rol, ...resto } = req.body;
    console.log(idParam, id);
    //TODO: validar que existe el id

    if (password) {
        // encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    try {

        const usuario = await Usuario.findByIdAndUpdate( idParam, resto, );
    
        // await usuario.save();
    
        return res.status(200).json( usuario );
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: 'Error PUT usuarios',
        });
        
    }

    
};
const usuariosPatch = (req, res = response) => {
    
    res.status(200).json({
        msg: 'Patch API - Controlador'
    });
};
const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    // Borrar físicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    try {
        
        const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );
    
        return res.status(200).json({
            usuario
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: 'Error PUT usuarios',
        });
        
    }



};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
};