const { response, request } = require("express");


const usuariosGet = (req = request, res = response) => {
    
    const { q, nombre = 'no name', apikey } = req.query;

    res.status(200).json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey
    });
};
const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    
    res.status(200).json({
        msg: 'post API - Controlador',
        nombre, 
        edad
    });
};
const usuariosPut = (req, res = response) => {
    const {id} = req.params;
    
    res.status(200).json({
        msg: 'put API - Controlador',
        id
    });
};
const usuariosPatch = (req, res = response) => {
    
    res.status(200).json({
        msg: 'Patch API - Controlador'
    });
};
const usuariosDelete = (req, res = response) => {
    
    res.status(200).json({
        msg: 'Delete API - Controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
};