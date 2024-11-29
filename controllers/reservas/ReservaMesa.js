import ReservaMesa from '../../models/reservas/ReservaMesa.js';


// Mostrar todas las reservas
export const getAllReservas = async (req, res) => {
  try {
    const reservas = await ReservaMesa.findAll();
    res.json(reservas);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar una reserva por ID
export const getReserva = async (req, res) => {
  try {
    const reserva = await ReservaMesa.findByPk(req.params.id_reserva);
    res.json(reserva);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createReserva = async (req, res) => {
  try {
    // Imprimir el cuerpo de la solicitud para depurar los datos recibidos
    console.log("Datos recibidos para ReservaMesa:", req.body);

    // Crear la nueva reserva en la base de datos
    const nuevaReserva = await ReservaMesa.create(req.body);

    // Imprimir la reserva creada para confirmar que fue guardada correctamente
    console.log("ReservaMesa creada:", nuevaReserva);

    // Enviar una respuesta exitosa al cliente
    res.json({ message: "ReservaMesa creada correctamente", reserva: nuevaReserva });
  } catch (error) {
    // Manejo de errores y registro del mismo
    console.error("Error al crear ReservaMesa:", error.message);
    res.json({ message: error.message });
  }
};

// Actualizar una reserva existente
export const updateReserva = async (req, res) => {
  try {
    await ReservaMesa.update(req.body, {
      where: { id_reserva: req.params.id_reserva }
    });
    res.json({ message: "ReservaMesa actualizada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Eliminar una reserva
export const deleteReserva = async (req, res) => {
  try {
    await ReservaMesa.destroy({
      where: { id_reserva: req.params.id_reserva }
    });
    res.json({ message: "ReservaMesa eliminada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
