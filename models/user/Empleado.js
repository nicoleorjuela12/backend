import db from "../../database/db.js";
import { Sequelize, DataTypes } from 'sequelize';

const RegistrarEmpleados = db.define('usuarios', {
    id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    telefono: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    tipo_documento: {
        type: DataTypes.ENUM('Cedula de ciudadania', 'Cedula de extranjeria'),
        allowNull: false
    },
    numero_documento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    rol: {
        type: DataTypes.ENUM('administrador', 'mesero', 'Cliente'),
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    fechaCreacion: { // Columna para almacenar la fecha de creación
        type: DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('Activo', 'Inactivo'),
        defaultValue: 'Activo'
    },
        
    turno: {
        type: DataTypes.STRING(15), // Ahora es VARCHAR(15)
        allowNull: true // Permite nulos si no es necesario
    },
    titulo: {
        type: DataTypes.STRING(50), // Se mantiene como VARCHAR(50)
        allowNull: true // Permite nulos si no es necesario
    },
});

export default RegistrarEmpleados;
