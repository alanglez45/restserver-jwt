const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos conectada');
    } catch (error) {
        throw new Error('Error al momento de iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}