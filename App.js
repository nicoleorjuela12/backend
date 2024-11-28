import express from "express";
import session from 'express-session';
import cors from "cors";
import db from "./database/db.js";
import usuarioRou from "./routes/UsuarioRoutes.js";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'; // Importar dotenv

// Cargar las variables de entorno
dotenv.config();

import Pedido from './models/pedidos/Pedidos_Modelo.js';
import Aparecer from './models/pedidos/detalle_pedido_modelo.js';
import Producto from "./models/producto/Producto.js";

const app = express();

// Configurar CORS para permitir solo solicitudes desde el origen especificado
app.use(cors({
    origin: process.env.CLIENT_URL, // Usar la variable de entorno
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Usar las rutas
app.use('/usuarios', usuarioRou);

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET, // Usar la variable de entorno
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Conexión a la base de datos
try {
    await db.authenticate();
    console.log('Conexión exitosa con la base de datos');
} catch (error) {
    console.log(`El error de conexión es: ${error}`);
}


// Definir las relaciones entre modelos
Aparecer.belongsTo(Pedido, { foreignKey: 'id_pedido' });
Pedido.hasMany(Aparecer, { foreignKey: 'id_pedido' });
Producto.hasMany(Aparecer, { foreignKey: 'id_producto' });
