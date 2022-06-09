const express = require('express');
const cors = require('cors');
const route = require('../routes/usuarios');
const auth = require('../routes/auth');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lecutra y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, route);
        this.app.use(this.authPath, auth);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT);
        });
    }

    async conectarDB() {
        await dbConnection();
    }
}

module.exports = Server;