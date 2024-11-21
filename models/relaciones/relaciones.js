// models/relaciones.js
import Aparecer from './Aparecer.js';
import Pedido from './pedidos/Pedidos_Modelo.js';
import Producto from './producto/Producto.js';

// Definición de relaciones
Aparecer.belongsTo(Pedido, { foreignKey: 'id_pedido' });
Aparecer.belongsTo(Producto, { foreignKey: 'id_producto' });
Pedido.hasMany(Aparecer, { foreignKey: 'id_pedido' });
