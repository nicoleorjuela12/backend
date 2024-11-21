import ReservaLocal from "../../models/reservas/ReservaLocal.js";

// Mostrar todas las reservas
export const getAllReservaLocal = async (req, res) => {
  try {
    const reservas = await ReservaLocal.findAll(); // Obtén todas las reservas sin ningún filtro
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas locales:', error);
    res.status(500).json({ message: error.message });
  }
};


// Mostrar una reserva por ID
export const getReservaLocal = async (req, res) => {
  try {
    const reserva = await ReservaLocal.findByPk(req.params.id_reserva);
    res.json(reserva);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Crear una nueva reserva
export const createReservaLocal = async (req, res) => {
  try {
    // Imprimir el cuerpo de la solicitud para ver qué datos se están recibiendo
    console.log("Datos recibidos:", req.body);

    const nuevaReserva = await ReservaLocal.create(req.body);

    // Imprimir la nueva reserva creada para verificar que se haya guardado correctamente
    console.log("ReservaLocal creada:", nuevaReserva);

    res.json({ message: "ReservaLocal creada correctamente", reserva: nuevaReserva });
  } catch (error) {
    // Imprimir el error para obtener más detalles si ocurre un problema
    console.error("Error al crear ReservaLocal:", error.message);
    res.json({ message: error.message });
  }
};


// Actualizar una reserva existente
export const updateReservaLocal = async (req, res) => {
  try {
    await ReservaLocal.update(req.body, {
      where: { id_reserva: req.params.id_reserva }
    });
    res.json({ message: "ReservaLocal actualizada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Eliminar una reserva
export const deleteReservaLocal = async (req, res) => {
  try {
    await ReservaLocal.destroy({
      where: { id_reserva: req.params.id_reserva }
    });
    res.json({ message: "ReservaLocal eliminada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
