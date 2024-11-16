// Cargar las variables de entorno desde .env
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const app = express();

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection(process.env.DATABASE_URL);

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

// Endpoint de prueba para verificar que el servidor esté funcionando
app.get('/', (req, res) => {
    res.send('API de Gestión de Proyectos funcionando correctamente');
});

// Inicia el servidor en el puerto especificado en las variables de entorno o en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// ===========================
// Endpoints CRUD para Usuario
// ===========================

// Obtener todos los usuarios
app.get('/usuario', (req, res) => {
    const sql = 'SELECT * FROM Usuario';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// Crear un nuevo usuario
app.post('/usuario', (req, res) => {
    const { nombreUsuario, email } = req.body;
    const sql = 'INSERT INTO Usuario (nombreUsuario, email) VALUES (?, ?)';
    db.query(sql, [nombreUsuario, email], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ id: result.insertId, nombreUsuario, email });
    });
});

// Actualizar un usuario
app.put('/usuario/:id', (req, res) => {
    const { id } = req.params;
    const { nombreUsuario, email } = req.body;
    const sql = 'UPDATE Usuario SET nombreUsuario = ?, email = ? WHERE idUsuario = ?';
    db.query(sql, [nombreUsuario, email, id], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Usuario actualizado', id, nombreUsuario, email });
    });
});

// Eliminar un usuario
app.delete('/usuario/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Usuario WHERE idUsuario = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Usuario eliminado', id });
    });
});


// Obtener todos los proyectos
app.get('/proyecto', (req, res) => {
    const sql = 'SELECT * FROM Proyecto';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// Crear un nuevo proyecto
app.post('/proyecto', (req, res) => {
    const { nombreProyecto, descripcion } = req.body;
    const sql = 'INSERT INTO Proyecto (nombreProyecto, descripcion) VALUES (?, ?)';
    db.query(sql, [nombreProyecto, descripcion], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ id: result.insertId, nombreProyecto, descripcion });
    });
});

// Actualizar un proyecto
app.put('/proyecto/:id', (req, res) => {
    const { id } = req.params;
    const { nombreProyecto, descripcion } = req.body;
    const sql = 'UPDATE Proyecto SET nombreProyecto = ?, descripcion = ? WHERE idProyecto = ?';
    db.query(sql, [nombreProyecto, descripcion, id], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Proyecto actualizado', id, nombreProyecto, descripcion });
    });
});

// Eliminar un proyecto
app.delete('/proyecto/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Proyecto WHERE idProyecto = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Proyecto eliminado', id });
    });
});

// Obtener todas las tareas
app.get('/tarea', (req, res) => {
    const sql = 'SELECT * FROM Tarea';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// Crear una nueva tarea
app.post('/tarea', (req, res) => {
    const { descripcion, estado, fechaLimite, usuarioAsignado, proyectoAsociado } = req.body;
    const sql = 'INSERT INTO Tarea (descripcion, estado, fechaLimite, usuarioAsignado, proyectoAsociado) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [descripcion, estado, fechaLimite, usuarioAsignado, proyectoAsociado], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ id: result.insertId, descripcion, estado, fechaLimite, usuarioAsignado, proyectoAsociado });
    });
});

// Actualizar una tarea
app.put('/tarea/:id', (req, res) => {
    const { id } = req.params;
    const { descripcion, estado, fechaLimite, usuarioAsignado, proyectoAsociado } = req.body;
    const sql = 'UPDATE Tarea SET descripcion = ?, estado = ?, fechaLimite = ?, usuarioAsignado = ?, proyectoAsociado = ? WHERE idTarea = ?';
    db.query(sql, [descripcion, estado, fechaLimite, usuarioAsignado, proyectoAsociado, id], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Tarea actualizada', id, descripcion, estado, fechaLimite, usuarioAsignado, proyectoAsociado });
    });
});

// Eliminar una tarea
app.delete('/tarea/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Tarea WHERE idTarea = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'Tarea eliminada', id });
    });
});


