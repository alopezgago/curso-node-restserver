const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");
const { rawListeners } = require("../models/usuario");
const { googleVerify } = require("../helpers/google-verify");



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
    
const googleSignin = async ( req, res = response ) => {
    
    const {id_token } = req.body;

    
    try {
        const { nombre, correo, img } = await googleVerify( id_token);

        let usuario = await Usuario.findOne( {correo});

        // validar si el usuario existe
        if ( !usuario ) {
            // si no existe, hay que crearlo
            const data = { 
                nombre, 
                correo,
                password: "@GoogleUser",
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        } 

        // Si el usuario en DB esta anulado (estado: falso)
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Error. Usuario bloqueado. Hable con el administrador',
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );
        
        return res.status(200).json({
             usuario,
             token
        });

    } catch (error) {

        console.log(error);
        return res.status(400).json({
            msg: "Error en el Token de Google"
        });
    }

};
    
    


module.exports = {
    login,
    googleSignin,
};