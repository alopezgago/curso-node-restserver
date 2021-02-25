


const {Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatoria'],
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },


});

UsuarioSchema.plugin(mongoosePaginate);

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid =  _id;
    return usuario;
};

module.exports = model( 'Usuario', UsuarioSchema );