import EventosCliente from '../../models/eventos/eventos.js'


// Mostrar todas las eventos
export const getAllEventos = async (req, res) => {
  try {
    const eventos = await EventosCliente.findAll();
    res.json(eventos);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar una evento por ID
export const getEventos = async (req, res) => {
  try {
    const evento = await EventosCliente.findByPk(req.params.id_evento);
    res.json(evento);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Crear una nueva reserva
export const createEventos = async (req, res) => {
  try {
    // Imprimir el cuerpo de la solicitud para ver qué datos se están recibiendo
    console.log("Datos recibidos:", req.body);

    const nuevoEvento = await EventosCliente.create(req.body);

    // Imprimir la nueva reserva creada para verificar que se haya guardado correctamente
    console.log("Evento creado:", nuevoEvento);

    res.json({ message: "Evento creada correctamente", evento: nuevoEvento });
  } catch (error) {
    // Imprimir el error para obtener más detalles si ocurre un problema
    console.error("Error al crear ReservaLocal:", error.message);
    res.json({ message: error.message });
  }
};


// Actualizar una reserva existente
export const updateEvento = async (req, res) => {
  try {
    await EventosCliente.update(req.body, {
      where: { id_evento: req.params.id_evento }
    });
    res.json({ message: "Evento actualizada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Eliminar una reserva
export const deleteEvento = async (req, res) => {
  try {
    await EventosCliente.destroy({
      where: { id_evento: req.params.id_evento }
    });
    res.json({ message: "Evento eliminada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};