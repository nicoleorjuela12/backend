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
    categoria: {
      type: DataTypes.ENUM('charlas','Teatro','Deportes','Culturales','Infantiles'),
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
      type: DataTypes.TEXT,
      allowNull:false,
    },
    fecha_limite_inscripcion: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    estado: {
      type: DataTypes.ENUM('Pendiente', 'Confirmado', 'Cancelado'),
      allowNull: false,
    },
    }, {
        tableName: 'Evento', 
        timestamps: false
        }
);

export default EventosCliente