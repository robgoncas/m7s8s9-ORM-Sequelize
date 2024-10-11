
const { Sequelize } = require('sequelize');

//const sequelize = new Sequelize('postgres://user:password@localhost:5432/mi_base_de_datos');

//Configuración de la conexión a la base de datos PostgreSQL
const sequelize = new Sequelize('db_modulo7', 'postgres', '1234', {
    host: 'localhost', // o el host donde está tu base de datos
    dialect: 'postgres'
});

module.exports = sequelize;
