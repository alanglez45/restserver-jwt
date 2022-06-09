const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msj: 'El usuario o la contraseña no son correctos.'
            });
        }
        // Si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msj: 'El usuario se encuentra inactivo.'
            });
        }
        // Verificar la contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msj: 'Contraseña inconrrecta.'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: 'Algo salió mal'
        });
    }
}


module.exports = {
    login
}