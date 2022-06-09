const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;

    // .find retorna todos | con la condicion { estado: true } solo retorna las coincidencias
    /* const usuarios = await Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments({ estado: true }); */

    // Se están realizando dos promesas que no son dependientes por lo tanto se
    // realizar una colección de promesas 

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        await Usuario.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {
    let id = req.params.id;
    const { password, google, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); // por defecto da 10 vueltas de encriptacion
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
}

const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); // por defecto da 10 vueltas de encriptacion
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();

    res.json({
        usuario
    });
}
const usuariosPatch = (req, res = response) => {
    res.status(400).json({
        ok: true,
        msg: 'patch api - controlador'
    });
}
const usuariosDelete = async (req, res = response) => {
    const id = req.params.id;

    // const uid = req.uid;

    // Borrar el usuario fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;

    res.json({
        usuario,
        // usuarioAutenticado
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}