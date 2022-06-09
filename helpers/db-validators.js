const Role = require('../models/role');
const Usuario = require('../models/usuario');


const rolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos.`);
    }
}
const emailExiste = async (correo = '') => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está siendo utilizado.`);
    }
}

const existeUsuarioID = async (id) => {
    // Verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) { // si el id es null o no existe
        throw new Error(`El ID: ${id}, no existe.`);
    }
}


module.exports = {
    rolValido,
    emailExiste,
    existeUsuarioID
}