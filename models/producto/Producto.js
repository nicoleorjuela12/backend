import { DataTypes } from 'sequelize';
import db from '../../database/db.js'; 

const Producto = db.define('Producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  categoria: {
    type: DataTypes.ENUM(
      'entradas',
      'plato fuerte',
      'cocteles',
      'bebidas frías',
      'bebidas calientes',
      'postres'
    ),
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo', 
  },
}, {
  tableName: 'Producto',
  timestamps: false, 
});

export default Producto;
