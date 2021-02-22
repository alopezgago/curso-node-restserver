const express = require('express');
const cors = require('cors');
const { route } = require('../routes/usuarios.routes');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';


        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
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

      this.app.use( this.usuariosPath, require('../routes/usuarios.routes'));

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`CORS-enabled. App listening at http://localhost:${this.port}`);
        });
    }


}

module.exports = Server;