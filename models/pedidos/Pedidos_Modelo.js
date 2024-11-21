// models/pedidos/Pedido.js
import { DataTypes } from 'sequelize';
import db from '../../database/db.js';
import RegistrarUsuarioC from '../user/Usuario.js';

const Pedido = db.define('Pedido', {
  id_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  estado_pedido: {
    type: DataTypes.ENUM('Pendiente', 'En preparación', 'Entregado'),
    allowNull: false,
  },
  metodo_pago: {
    type: DataTypes.ENUM('Efectivo', 'Tarjeta', 'Transferencia'),
    allowNull: false,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo_entrega: {
    type: DataTypes.ENUM('Domicilio', 'Recoger en tienda'),
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  comentarios: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: RegistrarUsuarioC,
      key: 'id_usuario',
    },
  },
}, {
  tableName: 'Pedido',
  timestamps: false,
});

// Asignar la asociación `belongsTo` directamente
Pedido.belongsTo(RegistrarUsuarioC, { foreignKey: 'id_usuario' });



export default Pedido;
