import Producto from '../../models/producto/Producto.js'; 

// Registrar un nuevo producto
export const registrarProducto = async (req, res) => {
    try {
        const { 
            nombre, 
            precio, 
            descripcion, 
            categoria, 
            imagen
        } = req.body;

        const nuevoProducto = await Producto.create({
            nombre,
            precio,
            descripcion,
            categoria, 
            imagen
        });

        return res.status(201).json({ 
            mensaje: 'Producto registrado exitosamente.', 
            producto: nuevoProducto 
        });
    } catch (error) {
        console.error('Error al registrar el producto:', error);
        return res.status(500).json({ 
            mensaje: 'Error al registrar el producto.', 
            error: error.message 
        });
    }
};

// Verificar si el producto ya está registrado
export const verificarProducto = async (req, res) => {
    try {
        const { nombre } = req.body;

        const productoExistente = await Producto.findOne({ where: { nombre } });

        if (productoExistente) {
            return res.status(200).json({ mensaje: 'El producto ya está registrado.', existe: true });
        }

        return res.status(200).json({ mensaje: 'El producto no está registrado.', existe: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al verificar el producto.', error: error.message });
    }
};

// Consultar todos los productos
export const ConsultarProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Consultar producto por id_producto
export const consultarProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id_producto); // Buscar el producto por ID

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado.' });
        }

        res.json(producto);
    } catch (error) {
        res.json({ mensaje: error.message });
    }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
    try {
        const [updated] = await Producto.update(req.body, {
            where: { id_producto: req.params.id_producto }
        });

        if (!updated) {
            return res.status(404).json({ mensaje: 'Producto no encontrado.' });
        }

        res.json({ mensaje: 'Producto actualizado exitosamente.' });
    } catch (error) {
        res.json({ mensaje: error.message });
    }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
    try {
        const deleted = await Producto.destroy({
            where: { id_producto: req.params.id_producto }
        });

        if (!deleted) {
            return res.status(404).json({ mensaje: 'Producto no encontrado.' });
        }

        res.json({ mensaje: 'Producto eliminado exitosamente.' });
    } catch (error) {
        res.json({ mensaje: error.message });
    }
};
