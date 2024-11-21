import Pedido from "../../models/pedidos/Pedidos_Modelo.js";
import Producto from "../../models/producto/Producto.js";
import Aparecer from "../../models/pedidos/detalle_pedido_modelo.js";
import RegistrarUsuarioC from "../../models/user/Usuario.js";
import db from '../../database/db.js';  // Asegúrate de importar db correctamente

export const registrarPedido = async (req, res) => {
  const {
    fecha,
    hora,
    estado_pedido,
    metodo_pago,
    total,
    tipo_entrega,
    cantidad,
    comentarios,
    id_usuario,
    productos, 
  } = req.body;

  const t = await db.transaction(); // Usamos db para la transacción

  try {
    // Crear el pedido
    const pedido = await Pedido.create(
      {
        fecha,
        hora,
        estado_pedido,
        metodo_pago,
        total,
        tipo_entrega,
        cantidad,
        comentarios,
        id_usuario,
      },
      { transaction: t }
    );

    const productosAparecer = productos.map((producto) => ({
      id_producto: producto.id_producto,
      id_pedido: pedido.id_pedido,
      cantidad_unidad: producto.cantidad_unidad,
      precio_unidad: producto.precio_unidad,
    }));

    await Aparecer.bulkCreate(productosAparecer, { transaction: t }); // Insertamos los productos en la tabla Aparecer

    // Confirmamos la transacción
    await t.commit();

    // Responder con el pedido registrado y los productos asociados
    res.status(201).json({
      mensaje: 'Pedido registrado correctamente',
      pedido,
      productos: productosAparecer,
    });
  } catch (error) {
    // Si ocurre un error, revertimos la transacción
    await t.rollback();
    console.error(error);
    res.status(500).json({
      mensaje: 'Error al registrar el pedido',
      error: error.message,
    });
  }
};

export const ConsultarPedidoId  = async (req, res) => {
  try {
    const { id_usuario } = req.params; // Obtener el id del usuario desde los parámetros de la solicitud

    // Consulta para obtener el pedido junto con los detalles del producto
    const pedidos = await Pedido.findAll({
      where: {
        id_usuario: id_usuario, // Filtrar por id de usuario
      },
      include: [
        {
          model: Aparecer, // Incluir los detalles de los productos en el pedido
          include: {
            model: Producto, // Incluir el modelo Producto para obtener el nombre
            attributes: ['nombre', 'imagen'], // Seleccionar solo el nombre del producto
          },
          attributes: ['cantidad_unidad', 'precio_unidad'], // Seleccionar cantidad y precio del detalle del pedido
        },
        {
          model: RegistrarUsuarioC,  // Asegúrate de incluir el modelo 'Usuario' aquí
          attributes: ['nombre', 'apellido', 'numero_documento', 'correo', 'direccion', 'barrio'],
          required: true,   // Si el usuario debe estar siempre presente
        },
      ],
    });

    if (pedidos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron pedidos para este usuario.' });
    }

    // Responder con los datos obtenidos
    return res.status(200).json(pedidos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los detalles del pedido.' });
  }
};

export const consultarPedidos = async (req, res) => {
  try {
    // Consulta todos los pedidos con estado 'Pendiente'
    const pedidos = await Pedido.findAll({
      where: {
        estado_pedido: 'Pendiente'  // Filtrar por estado de pedido
      },
      include: [
        {
          model: Aparecer,  // Incluir detalles de los productos en el pedido
          include: {
            model: Producto,  // Incluir el modelo Producto para obtener el nombre e imagen
            attributes: ['nombre', 'imagen'],
          },
          attributes: ['cantidad_unidad', 'precio_unidad'],
        },
        {
          model: RegistrarUsuarioC,  // Incluir los datos del usuario
          attributes: ['nombre', 'apellido', 'numero_documento', 'correo', 'direccion', 'barrio'],
          required: true,
        },
      ],
    });

    // Verificar si existen pedidos pendientes
    if (pedidos.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron pedidos pendientes.' });
    }

    // Responder con todos los pedidos pendientes y sus detalles
    res.status(200).json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: 'Error al obtener los pedidos pendientes',
      error: error.message,
    });
  }
};



export const actualizarEstadoPedido = async (req, res) => {
  const { id_pedido, nuevo_estado } = req.body; // Recibimos el id_pedido y el nuevo estado

  const estadosPermitidos = ['Pendiente', 'En preparación', 'Entregado']; // Estados válidos

  if (!estadosPermitidos.includes(nuevo_estado)) {
    return res.status(400).json({ mensaje: 'Estado no válido.' });
  }

  try {
    // Buscar el pedido por su id
    const pedido = await Pedido.findOne({ where: { id_pedido } });

    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado.' });
    }

    // Actualizar el estado del pedido
    pedido.estado_pedido = nuevo_estado;
    await pedido.save();

    res.status(200).json({
      mensaje: `Estado del pedido actualizado a ${nuevo_estado}`,
      pedido,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: 'Error al actualizar el estado del pedido',
      error: error.message,
    });
  }
};


