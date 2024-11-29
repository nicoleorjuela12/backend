import EventosCliente from '../../models/eventos/eventos.js';
import InscripcionEvento from "../../models/eventos/InscripcionEventos.js"; // Modelo de InscripcionEvento

// Mostrar todos los eventos
export const getAllEventos = async (req, res) => {
  try {
    // Obtén solo los eventos con el estado "Confirmado"
    const eventosConfirmados = await EventosCliente.findAll({
      where: {
        estado: 'Confirmado', // Filtra por el campo "estado"
      },
    });

    res.json(eventosConfirmados); // Devuelve los eventos filtrados
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ message: error.message });
  }
};

// Mostrar un evento por ID
export const getEventos = async (req, res) => {
  try {
    const evento = await EventosCliente.findByPk(req.params.id_evento);
    res.json(evento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo evento
export const createEventos = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);

    const nuevoEvento = await EventosCliente.create(req.body);
    console.log("Evento creado:", nuevoEvento);

    res.json({ message: "Evento creado correctamente", evento: nuevoEvento });
  } catch (error) {
    console.error("Error al crear un Evento:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un evento existente
export const updateEvento = async (req, res) => {
  try {
    await EventosCliente.update(req.body, {
      where: { id_evento: req.params.id_evento }
    });
    res.json({ message: "Evento actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un evento
export const deleteEvento = async (req, res) => {
  try {
    await EventosCliente.destroy({
      where: { id_evento: req.params.id_evento }
    });
    res.json({ message: "Evento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const crearInscripcion = async (req, res) => {
    const {
        id_evento,
        id_usuario,
        nombre,
        numero_documento,
        telefono,
        correo,
        metodo_pago,
        total
    } = req.body;

    try {
        // Verificar si ya existe una inscripción para este usuario y evento
        const inscripcionExistente = await InscripcionEvento.findOne({
            where: { id_evento, id_usuario },
        });

        if (inscripcionExistente) {
            return res.status(400).json({ message: "El usuario ya está inscrito en este evento" });
        }

        // Obtener el evento para verificar la capacidad disponible
        const evento = await EventosCliente.findOne({ where: { id_evento } });

        if (!evento) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }

        // Verificar si hay cupos disponibles
        if (evento.capacidad <= 0) {
            return res.status(400).json({ message: "No hay cupos disponibles para este evento" });
        }

        // Crear la inscripción en la tabla InscripcionEvento
        const nuevaInscripcion = await InscripcionEvento.create({
            id_evento,
            id_usuario,
            nombre,
            numero_documento,
            telefono,
            correo,
            metodo_pago,
            total,
            fecha_inscripcion: new Date(),
            estado_inscripcion: "Pendiente"
        });

        // Decrementar la capacidad del evento en la tabla Evento
        evento.capacidad -= 1;  // Disminuir en 1 el número de cupos
        await evento.save();    // Guardar la actualización de la capacidad

        // Confirmación de éxito
        res.status(201).json({ message: "Inscripción creada correctamente", inscripcion: nuevaInscripcion });
    } catch (error) {
        console.error("Error al crear una inscripción:", error);

        // Manejo de errores con detalles
        if (error.name === 'SequelizeDatabaseError') {
            return res.status(500).json({ message: "Error de base de datos: " + error.message });
        }

        res.status(500).json({ message: "Error al procesar la inscripción", error: error.message });
    }
};