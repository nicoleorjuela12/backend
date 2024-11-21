import RegistrarUsuarioC from "../../models/user/Usuario.js";
import { Op } from 'sequelize';
import db from "../../database/db.js"

export const crearUsuario = async (req, res) => {
    try {
        const { 
            nombre, 
            apellido, 
            telefono, 
            correo, 
            tipo_documento, 
            numero_documento, 
            rol = 'Cliente', 
            contrasena, 
            direccion, 
            barrio, 
            estado = 'Activo', 
            aceptaTerminos = false 
        } = req.body;


        // Usar el modelo de Sequelize para crear un nuevo registro
        const nuevoUsuario = await RegistrarUsuarioC.create({
            nombre,
            apellido,
            telefono,
            correo,
            tipo_documento,
            numero_documento,
            rol,
            contrasena,
            direccion,
            barrio,
            estado,
            aceptaTerminos
        });

        
        res.status(201).json({ 
            message: 'Usuario creado con éxito', 
            data: nuevoUsuario 
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }


    
};

export const verificarUsuario = async (req, res) => {
    const { numero_documento, correo } = req.body;

    try {
        const usuarioExistente = await RegistrarUsuarioC.findOne({
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


export const login_session = async (req, res) => {
    try {
        const { numero_documento, contrasena } = req.body;

        // Verifica que el usuario exista
        const user = await RegistrarUsuarioC.findOne({ where: {
            numero_documento: numero_documento // Asegúrate de que esta variable tenga un valor
        } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no registrado en el sistema' });
        }

        // Verifica la contraseña
        if (contrasena !== user.contrasena) { 
            return res.status(409).json({ message: 'Contraseña inválida' });
        }

        // Asegúrate de que el objeto de sesión esté disponible
        if (!req.session) {
            req.session = {};
        }

        req.session.usuario = user; // Asegúrate de que esta línea se ejecute

        console.log('Sesión creada:', req.session);

        // Envía el rol junto con el usuario
        return res.status(200).json({ 
            message: 'Inicio de sesión exitoso',
            usuario: {
                id_usuario: user.id_usuario,
                numero_documento: user.numero_documento,
                nombre: user.nombre, // O cualquier otro campo que desees enviar
                rol: user.rol, // Asegúrate de que 'rol' sea una propiedad válida en el modelo de usuario
                id_usuario: user.id_usuario
            }
        });
    } catch (error) {
        console.error('Error durante el proceso de inicio de sesión:', error);
        return res.status(500).json({ message: 'Ocurrió un error en el servidor' });
    }
};


export const logoutUser = (req, res) => {
    // Verifica si la sesión existe
    if (req.session && req.session.usuario) {
        // Destruye la sesión
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Error al cerrar sesión' });
            }
            res.clearCookie('connect.sid'); // Limpia la cookie de sesión
            return res.json({ message: 'Sesión cerrada correctamente' });
        });
    } else {
        return res.status(404).json({ message: 'No se encontró la sesión' });
    }
};

export const getAllUsuarios = async (req, res) => {
    try {
      const usuarios = await RegistrarUsuarioC.findAll();
      res.json(usuarios);
    } catch (error) {
      res.json({ message: error.message });
    }
};
  
  // Mostrar una RegistrarUsuarioC por ID
  export const getUsuario = async (req, res) => {
    try {
      const usuarios = await RegistrarUsuarioC.findAll({
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

export const actualizarUsuario = async (req, res) => {
    const { id_usuario } = req.params; 
    const datosActualizados = req.body; 

    try {
        
        const [actualizado] = await RegistrarUsuarioC.update(datosActualizados, {
            where: { id_usuario: id_usuario },
        });

        if (actualizado) {
            
            const usuarioActualizado = await RegistrarUsuarioC.findByPk(id_usuario);
            return res.status(200).json({ mensaje: 'Usuario actualizado', usuario: usuarioActualizado });
        }

        
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } catch (error) {
        
        return res.status(500).json({ mensaje: 'Error al actualizar el usuario', error: error.message });
    }
};