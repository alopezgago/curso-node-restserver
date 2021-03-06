const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';

        // Conectar a Base de Datos
        this.conectarDB();


        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public'));

    }


    routes() {

        this.app.use( this.authPath, require('../routes/auth.routes'));
        this.app.use( this.usuariosPath, require('../routes/usuarios.routes'));

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`CORS-enabled. App listening at http://localhost:${this.port}`);
        });
    }


}

module.exports = Server;