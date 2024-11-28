import { DataTypes } from "sequelize";
import db from '../../database/db.js';

const InscripcionEvento = db.define("InscripcionEvento", {
  id_inscripcion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_evento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Evento", // Nombre de la tabla referenciada
      key: "id_evento",
    },
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "usuarios", // Nombre de la tabla referenciada
      key: "id_usuario",
    },
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  numero_documento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  telefono: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  metodo_pago: {
    type: DataTypes.ENUM("Tarjeta credito/debito", "Paypal", "Transferencia"),
    allowNull: false,
    defaultValue: "Tarjeta credito/debito",
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_inscripcion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado_inscripcion: {
    type: DataTypes.ENUM("Pendiente", "Confirmada", "Cancelada"),
    allowNull: false,
    defaultValue: "Pendiente",
  },
}, {
  tableName: "InscripcionEvento", // Nombre de la tabla en la base de datos
  timestamps: false, // No incluye createdAt ni updatedAt
});




export default InscripcionEvento;