//app.js
const express = require('express');
const sequelize = require('../database/conexionSequelize');
const Estudiante = require('../models/Estudiante');

const app = express();

//Middleware para manejar JSON
app.use(express.json());

//Sincronizar Sequelize con la base de datos
sequelize.sync({ force: false })  //'force: true' elimina y crea la tabla en cada arranque
    .then(() => {
        console.log("Conectado a la base de datos y sincronizado con el modelo Estudiante");
    })
    .catch(err => {
        console.error("Error al conectar a la base de datos:", err);
    });


//1. Crear un nuevo estudiante (POST)
app.post('/estudiantes', async (req, res) => {
    try {
        const { nombre, email, nombre_curso } = req.body;
        const nuevoEstudiante = await Estudiante.create({ nombre, email, nombre_curso });
        res.status(201).json(nuevoEstudiante);
    } catch (err) {
        res.status(400).json({ error: 'Error al crear el estudiante', details: err });
    }
});

//2. Obtener todos los estudiantes (GET)
app.get('/estudiantes', async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll();
        res.status(200).json(estudiantes);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los estudiantes', details: err });
    }
});

//3. Obtener un estudiante por ID (GET)
app.get('/estudiantes/:id', async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (estudiante) {
            res.status(200).json(estudiante);
        } else {
            res.status(404).json({ error: 'Estudiante no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el estudiante', details: err });
    }
});

//4. Modificar un estudiante (PUT)
app.put('/estudiantes/:id', async (req, res) => {
    try {
        const { nombre, email, nombre_curso } = req.body;
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (estudiante) {
            estudiante.nombre = nombre;
            estudiante.email = email;
            estudiante.nombre_curso = nombre_curso;
            await estudiante.save();
            res.status(200).json(estudiante);
        } else {
            res.status(404).json({ error: 'Estudiante no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar el estudiante', details: err });
    }
});

//5. Eliminar un estudiante (DELETE)
app.delete('/estudiantes/:id', async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (estudiante) {
            await estudiante.destroy();
            res.status(200).json({ message: 'Estudiante eliminado' });
        } else {
            res.status(404).json({ error: 'Estudiante no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el estudiante', details: err });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
