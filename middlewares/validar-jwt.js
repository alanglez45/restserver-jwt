const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msj: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);

        // Leer el usuario que corresponde al uid
        const usuarioAutenticado = await Usuario.findById(uid);

        // Si usuario no existe
        if (!usuarioAutenticado) {
            return res.status(401).json({
                msj: 'El usuario no existe en la base de datos'
            });
        }

        if (!usuarioAutenticado.estado) {
            return res.status(401).json({
                msj: 'Usuario con estado false'
            });
        }

        req.usuario = usuarioAutenticado;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msj: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}