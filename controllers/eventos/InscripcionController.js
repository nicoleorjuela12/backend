import InscripcionEvento from "../../models/eventos/InscripcionEventos.js";
import EventosCliente from "../../models/eventos/eventos.js";


// Obtener todas las inscripciones
export const getAllInscripciones = async (req, res) => {
  try {
    const inscripciones = await InscripcionEvento.findAll(); // Obtén todas las inscripciones
    res.json(inscripciones);
  } catch (error) {
    console.error("Error al obtener inscripciones:", error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener una inscripción por ID
export const getInscripcion = async (req, res) => {
    try {
        const inscripciones = await InscripcionEvento.findAll({
            where: { id_usuario: req.params.id_usuario },
            include: [
                {
                    model: Evento,
                    attributes: ['nombre'] // Solo trae el nombre del evento
                }
            ]
        });

        res.status(200).json(inscripciones);
    } catch (error) {
        console.error("Error al obtener inscripciones:", error);
        res.status(500).json({ message: "Error al obtener inscripciones" });
    }
};
// Crear una nueva inscripción
// Crear una nueva inscripción
export const createInscripcion = async (req, res) => {
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
  
      // Crear la inscripción
      const nuevaInscripcion = await InscripcionEvento.create({
        id_evento,
        id_usuario,
        nombre,
        numero_documento,
        telefono,
        correo,
        metodo_pago,
        total,
        fecha_inscripcion: new Date(), // Fecha actual
        estado_inscripcion: "Pendiente" // Estado por defecto
      });
  
      res.status(201).json({ message: "Inscripción creada correctamente", inscripcion: nuevaInscripcion });
    } catch (error) {
      console.error("Error al crear una inscripción:", error);
      res.status(500).json({ message: error.message });
    }
  };
  

// Actualizar una inscripción
export const updateInscripcion = async (req, res) => {
  try {
    const { id_inscripcion } = req.params;

    const inscripcion = await InscripcionEvento.findByPk(id_inscripcion);
    if (!inscripcion) {
      return res.status(404).json({ message: "Inscripción no encontrada" });
    }

    await InscripcionEvento.update(req.body, { where: { id_inscripcion } });
    res.json({ message: "Inscripción actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la inscripción:", error);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una inscripción
export const deleteInscripcion = async (req, res) => {
  try {
    const { id_inscripcion } = req.params;

    const inscripcion = await InscripcionEvento.findByPk(id_inscripcion);
    if (!inscripcion) {
      return res.status(404).json({ message: "Inscripción no encontrada" });
    }

    await InscripcionEvento.destroy({ where: { id_inscripcion } });
    res.json({ message: "Inscripción eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la inscripción:", error);
    res.status(500).json({ message: error.message });
  }
};