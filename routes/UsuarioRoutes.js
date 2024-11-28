import { crearUsuario, verificarUsuario, login_session, logoutUser,actualizarUsuario, getAllUsuarios, getUsuario,} from "../controllers/user/UsuarioControlador.js";
import {registrarProducto,verificarProducto,ConsultarProductos,consultarProductoPorId,actualizarProducto,eliminarProducto} from "../controllers/productos/ProductosController.js"
import {getAllReservas,getReserva,createReserva,updateReserva,deleteReserva} from "../controllers/reservas/ReservaMesa.js"
import {getAllReservaLocal,getReservaLocal,createReservaLocal,updateReservaLocal,deleteReservaLocal} from "../controllers/reservas/ReservaLocal.js"
import {verificarEmpleado,registrarEmpleado,ConsultarEmpleados,eliminarEmpleado } from "../controllers/user/EmpleadosControlador.js"
import { registrarPedido,ConsultarPedidoId,actualizarEstadoPedido, consultarPedidos } from "../controllers/Pedidos/pedidos_controlador.js";
import { createInscripcion, deleteInscripcion, getAllInscripciones, getInscripcion, updateInscripcion } from "../controllers/eventos/InscripcionController.js";
import { getAllEventos, getEventos, createEventos, updateEvento, deleteEvento, crearInscripcion } from "../controllers/eventos/EventosController.js";
import express from 'express';
import bodyParser from 'body-parser';



const usuarioRou = express.Router();

// Middleware para analizar cuerpos JSON
usuarioRou.use(bodyParser.json()); 

// Rutas
usuarioRou.post('/', crearUsuario);
usuarioRou.post('/verificar-usuario', verificarUsuario);
usuarioRou.post('/login', login_session);

usuarioRou.put('/:id_usuario', actualizarUsuario);
usuarioRou.post('/cerrarsesion', (req, res) => {
    // Aquí va la lógica para cerrar sesión
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
});

/// Empleados
usuarioRou.post('/verificar-empleado', verificarEmpleado);
usuarioRou.post('/registrar-empleado', registrarEmpleado);
usuarioRou.get('/consultarempleados', ConsultarEmpleados);
usuarioRou.put('/empleados/:id_usuario', actualizarUsuario);
usuarioRou.delete('/empleados/:id_usuario', eliminarEmpleado);



//productos 

usuarioRou.post('/verificar-producto', verificarProducto);
usuarioRou.post('/registrar-producto', registrarProducto);
usuarioRou.post('/consultar-producto', ConsultarProductos);
usuarioRou.get('/productos/:id_producto', consultarProductoPorId);
usuarioRou.put('/productos/:id_producto', actualizarProducto);
usuarioRou.delete('/productos/:id_producto', eliminarProducto);



//reservas 

usuarioRou.get('/reservas', getAllReservas);
usuarioRou.get('/reservas/:id_reserva', getReserva);
usuarioRou.post('/reservas', createReserva);
usuarioRou.put('/reservas/:id_reserva', updateReserva);
usuarioRou.delete('/reservas/:id_reserva', deleteReserva);



usuarioRou.get('/reservalocal', getAllReservaLocal);
usuarioRou.get('/reservalocal/:id_reserva', getReservaLocal);
usuarioRou.post('/reservalocal', createReservaLocal);
usuarioRou.put('/reservalocal/:id_reserva', updateReservaLocal);
usuarioRou.delete('/reservalocal/:id_reserva', deleteReservaLocal);

usuarioRou.get('/usuarios', getAllUsuarios);
usuarioRou.get('/:id_usuario', getUsuario);

//pedidos

usuarioRou.post('/pedido', registrarPedido);
usuarioRou.get('/pedido/:id_usuario', ConsultarPedidoId);
usuarioRou.post('/pedidos', consultarPedidos);
usuarioRou.put('/pedido', actualizarEstadoPedido);


//eventos 
usuarioRou.get('/evento', getAllEventos);
usuarioRou.get('/evento/:id_evento', getEventos);
usuarioRou.post('/evento', createEventos);
usuarioRou.put('/evento/:id_evento', updateEvento);
usuarioRou.delete('/evento/:id_evento', deleteEvento);


//eventos  inscripcion 
usuarioRou.get('/InscripcionEvento', getAllInscripciones);
usuarioRou.get('/InscripcionEvento/:id_usuario', getInscripcion);
usuarioRou.post('/InscripcionEvento', createInscripcion);
usuarioRou.put('/InscripcionEvento/:id_usuario', updateInscripcion);
usuarioRou.delete('/InscripcionEvento/:id_usuario', deleteInscripcion);




export default usuarioRou;
