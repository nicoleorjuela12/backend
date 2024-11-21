import RegistrarEmpleados from '../../models/user/Empleado.js'; // Asegúrate de que la ruta sea correcta
import { Op } from 'sequelize';
import enviarCorreo from '../../emails/mailer.js'; // Asegúrate de que la ruta sea correcta
import { generarContrasena } from '../../emails/utils.js'; // Asegúrate de que la ruta sea correcta

export const registrarEmpleado = async (req, res) => {
    const { nombre, apellido, telefono, correo, tipo_documento, numero_documento, rol, estado, turno, titulo } = req.body;

    try {
        // Generar contraseña y obtener fecha de creación
        const { contrasena, fechaCreacion } = generarContrasena(6, 10); // Generar una contraseña de entre 6 y 10 caracteres

        // Crear nuevo empleado
        const nuevoEmpleado = await RegistrarEmpleados.create({
            nombre,
            apellido,
            telefono,
            correo,
            tipo_documento,
            numero_documento,
            rol,
            contrasena, // Almacenar la contraseña generada
            fechaCreacion, // Almacenar la fecha de creación
            estado,
            turno,
            titulo
        });

        // Enviar correo al empleado con la contraseña generada
        await enviarCorreo(correo, contrasena);

        return res.status(201).json({ message: 'Empleado registrado exitosamente', empleado: nuevoEmpleado });
    } catch (error) {
        console.error('Error al registrar el empleado:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const verificarEmpleado = async (req, res) => {
    const { numero_documento, correo } = req.body;

    try {
        const usuarioExistente = await RegistrarEmpleados.findOne({
            where: {
                [Op.or]: [
                    { numero_documento: numero_documento },
                    { correo: correo }
                ]
            }
        });

        if (usuarioExistente) {
            return res.status(400).json({ message: 'El documento o el correo ya están registrados' });
        }

        return res.status(200).json({ message: 'Usuario no registrado' });
    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};



export const ConsultarEmpleados = async (req, res) => {
    try {
      const usuarios = await RegistrarEmpleados.findAll();
      res.json(usuarios);
    } catch (error) {
      res.json({ message: error.message });
    }
};




export const EmpleadoId = async (req, res) => {
    try {
      const usuarios = await RegistrarEmpleados.findAll({
          where: {
              id_usuario: req.params.id_usuario 
          }
      });

      
      if (usuarios.length === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' }); 
      }

      res.json(usuarios[0]); 
  } catch (error) {
      res.status(500).json({ message: error.message});

    }
};



export const actualizarEmpleado = async (req, res) => {
    const { id_usuario } = req.params; 
    const datosActualizados = req.body; 

    try {
        
        const [actualizado] = await RegistrarEmpleados.update(datosActualizados, {
            where: { id_usuario: id_usuario },
        });

        if (actualizado) {
            
            const usuarioActualizado = await RegistrarEmpleados.findByPk(id_usuario);
            return res.status(200).json({ mensaje: 'Usuario actualizado', usuario: usuarioActualizado });
        }

        
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } catch (error) {
        
        return res.status(500).json({ mensaje: 'Error al actualizar el usuario', error: error.message });
    }
};


export const eliminarEmpleado = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        // Cambiar el estado del empleado a "inactivo"
        await RegistrarEmpleados.update(
            { estado: 'Inactivo' },  // Cambiar el estado a "inactivo"
            { where: { id_usuario: id_usuario } }
        );

        return res.status(200).json({ mensaje: 'Usuario marcado como inactivo correctamente' });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al actualizar el estado del usuario', error: error.message });
    }
};
