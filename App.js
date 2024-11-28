import express from "express";
import session from 'express-session';
import cors from "cors";
import db from "./database/db.js";
import usuarioRou from "./routes/UsuarioRoutes.js";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'; // Importar dotenv
import Redis from 'redis'; // Importar Redis
import * as connectRedis from 'connect-redis'; // Importación correcta

// Cargar las variables de entorno
dotenv.config();

// Importar tus modelos
import Pedido from './models/pedidos/Pedidos_Modelo.js';
import Aparecer from './models/pedidos/detalle_pedido_modelo.js';
import Producto from "./models/producto/Producto.js";

const app = express();

// Crear un cliente Redis
const RedisStore = connectRedis.default(session); // Usar el 'default' export de connect-redis con express-session
const redisClient = Redis.createClient({
    host: process.env.REDIS_HOST || 'localhost', // Configura tu host de Redis
    port: process.env.REDIS_PORT || 6379, // Configura el puerto de Redis
    password: process.env.REDIS_PASSWORD || 'hol12345', // Si tu Redis tiene contraseña, configúralo aquí
});

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

// Configurar sesiones con Redis
app.use(session({
    store: new RedisStore({ client: redisClient }), // Usar Redis como almacenamiento de sesiones
    secret: process.env.SESSION_SECRET,              // Secreto de la sesión
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Cambiar a true si usas HTTPS
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

export default app;
