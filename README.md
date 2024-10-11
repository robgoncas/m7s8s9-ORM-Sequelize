

## ¿Qué es un ORM?

**ORM** (Object-Relational Mapping) es una herramienta que te permite interactuar con bases de datos utilizando código en lugar de escribir directamente SQL. En vez de usar sentencias SQL para gestionar datos, puedes manipular objetos en tu lenguaje de programación.

### Ventajas de usar un ORM:
- **Facilidad**: Puedes trabajar con bases de datos usando objetos y métodos en lugar de escribir SQL.
- **Mantenimiento**: El código es más fácil de mantener y leer, especialmente cuando cambias de base de datos.
- **Abstracción**: Hace que el trabajo con bases de datos sea menos complejo, evitando errores comunes en SQL.

### Desventajas de usar un ORM:
- **Rendimiento**: En algunas situaciones, escribir consultas SQL manualmente puede ser más rápido.
- **Abstracción excesiva**: A veces, el ORM puede no cubrir casos complejos de consultas, y necesitarás escribir SQL directamente.
- **Curva de aprendizaje**: Aunque simplifica las cosas, aprender a usar un ORM tiene su propio aprendizaje.

## ¿Qué es Sequelize?

**Sequelize** es un ORM de JavaScript para bases de datos SQL como PostgreSQL, MySQL, y SQLite. Facilita la conexión con la base de datos, la creación de modelos (tablas) y la realización de operaciones CRUD (crear, leer, actualizar, eliminar) usando JavaScript.

### ¿Cómo funciona?

En **Sequelize**, defines **modelos** que representan tablas en la base de datos. Luego, puedes utilizar estos modelos para interactuar con los registros sin tener que escribir SQL.

### Ejemplo de código con Sequelize:

1. **Instalación**:
   ```bash
   npm install sequelize pg pg-hstore
   ```

2. **Definir un modelo `Estudiante`**:
   ```javascript
   const { Sequelize, DataTypes } = require('sequelize');
   const sequelize = new Sequelize('postgres://user:password@localhost:5432/mi_base_de_datos');

   const Estudiante = sequelize.define('Estudiante', {
       nombre: {
           type: DataTypes.STRING,
           allowNull: false
       },
       email: {
           type: DataTypes.STRING,
           allowNull: false,
           unique: true
       },
       fecha_inscripcion: {
           type: DataTypes.DATE,
           defaultValue: Sequelize.NOW
       }
   });

   // Sincronizar el modelo con la base de datos
   sequelize.sync().then(() => {
       console.log('La tabla estudiantes ha sido creada.');
   });
   ```

3. **Insertar un nuevo estudiante**:
   ```javascript
   Estudiante.create({
       nombre: 'Juan Pérez',
       email: 'juan.perez@example.com'
   }).then(estudiante => {
       console.log(`Estudiante insertado: ${estudiante.nombre}`);
   });
   ```

4. **Consultar todos los estudiantes**:
   ```javascript
   Estudiante.findAll().then(estudiantes => {
       console.log('Lista de estudiantes:', estudiantes);
   });
   ```

## Resumen

- **ORM** te permite trabajar con bases de datos a través de objetos, facilitando el proceso de interactuar con los datos.
- **Sequelize** es un ORM para Node.js que funciona con bases de datos SQL, y te permite manejar datos sin escribir SQL.
``` 