
const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexionSequelize');

//Definir el modelo Estudiante
const Estudiante = sequelize.define('Estudiante', {
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    fecha_inscripcion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    nombre_curso: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    tableName: 'estudiantesSeq',
    timestamps: false
});

module.exports = Estudiante;
