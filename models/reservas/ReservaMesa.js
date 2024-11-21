import { DataTypes } from 'sequelize';
import db from '../../database/db.js';

const ReservaMesa = db.define('Reserva', {
  id_reserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  horainicio: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  horafin: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  numero_personas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  decoracion: {
    type: DataTypes.ENUM('Fecha especial', 'Aniversario', 'Cumpleanios', 'Otro'),
    allowNull: true,
  },
  comentarios: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  actividades: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo_servicios: {
    type: DataTypes.ENUM('Pintura de Escultura', 'Parques', 'Dibujo con colores'),
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  aceptaTerminos: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  estado_reserva : {
    type: DataTypes.ENUM('Pendiente', 'Confirmada'),
    defaultValue: false
  },
    tipo_reserva : {
    type: DataTypes.STRING,
    defaultValue: 'Reserva Mesa'
}
}, {
  tableName: 'ReservaMesa',
  timestamps: false,
});

export default ReservaMesa