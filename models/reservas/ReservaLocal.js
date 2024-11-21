import { DataTypes } from 'sequelize';
import db from '../../database/db.js';

const ReservaLocal = db.define('ReservaLocal', {
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
  comentarios: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo_servicios: {
    type: DataTypes.ENUM('Licoreria', 'Decoracion', 'iluminacion - sonido'),
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
    type: DataTypes.ENUM('pendiente', 'confirmada'),
    defaultValue: 'pendiente'
},
  tipo_reserva : {
    type: DataTypes.STRING,
    defaultValue: 'Reserva Local'
}
}, {
  tableName: 'ReservaLocal',
  timestamps: false,
});

export default ReservaLocal;
