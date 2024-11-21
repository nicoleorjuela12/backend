// models/pedidos/detalle_pedido_modelo.js
import { DataTypes } from 'sequelize';
import db from '../../database/db.js';
import Producto from '../producto/Producto.js';

const Aparecer = db.define('Aparecer', {
  id_producto: {
    type: DataTypes.INTEGER,
    references: {
      model: Producto,
      key: 'id_producto',
    },
    primaryKey: true,
  },
  id_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  cantidad_unidad: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  precio_unidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Aparecer',
  timestamps: false,
});

// Asignar la asociación `belongsTo` directamente
Aparecer.belongsTo(Producto, { foreignKey: 'id_producto' });


export default Aparecer;
