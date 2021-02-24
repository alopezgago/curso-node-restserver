const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log('Base de datos Mongo Atlas online');
        
    } catch (error) {
        console.log(error);
        throw new Error ('Error al inicializar base de datos');
    }




};

module.exports = {
    dbConnection,
};