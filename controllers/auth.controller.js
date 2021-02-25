const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");


const login =  async ( req, res = response ) => {

    const  {correo, password} = req.body;


    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne( {correo} );

        if ( !usuario ){
            return res.status(400).json({
                msg: "Verifique el usuario/contraseña. - correo"
           });
        }
        // verificar si el usuario está activo
        if ( !usuario.estado ){
            return res.status(400).json({
                msg: "Verifique el usuario/contraseña - estado: false"
           });
        }
        // verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                msg: "Verifique el usuario/contraseña. - password"
           }); 
        }
        // Generar JWT
        const token = await generarJWT( usuario.id );
        
        return res.status(200).json({
            msg: 'Login  OK (post) auth',
            usuario,
            token
        });
        
    } catch (error) {
       console.log(error);
       return res.status(500).json({
            msg: "Ops, algo salio mal. Hable con el administrador"
       });
    }



};

module.exports = {
    login,
};