const { response } = require('express');


const esAdminRole = (req, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msj: 'Se quiere verificar el role sin vaidar el token.'
        });
    }
    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msj: `${nombre} no es administrador - No puede hacer esto.`
        });
    }
    next();
}

const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msj: 'Se quiere verificar el role sin vaidar el token.'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msj: `El servicio requiere uno de estos roles ${roles}.`
            });
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}