import { DataTypes } from 'sequelize';
import db from '../../database/db.js';

const EventosCliente = db.define('Evento', {
    id_evento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    horainicio: {
      type: DataTypes.TIME,
      allowNull:false,
    },
    horafin: {
      type: DataTypes.TIME,
      allowNull:false,
    },
    fechaEvento: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    precio_por_persona: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    imagenevento: {
      type: DataTypes.BLOB('medium'),
      allowNull:false,
    },
    metodo_pago: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    fecha_limite_inscripcion: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    estado: {
      type: DataTypes.ENUM('Proximo', 'Abierto', 'Cerrado'),
      allowNull:false,
    }
    }, {
        tableName: 'Evento', 
        timestamps: false
        }
);

export default EventosCliente