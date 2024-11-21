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

// Crear una nueva reserva
export const createReserva = async (req, res) => {
  try {
    const nuevaReserva = await ReservaMesa.create(req.body);
    res.json({ message: "ReservaMesa creada correctamente", reserva: nuevaReserva });
  } catch (error) {
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
