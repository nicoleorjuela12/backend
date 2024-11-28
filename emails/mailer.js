// mailer.js
import nodemailer from 'nodemailer';
import mysql from 'mysql2/promise';

// Configuración de la base de datos
const dbConfig = {
    host: process.env.DB_HOST,        
    user: process.env.DB_USER,         
    database: process.env.DB_NAME,    
};

// Función para obtener el nombre del empleado desde la base de datos
const obtenerNombreEmpleado = async (correo) => {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT nombre FROM usuarios WHERE correo = ?', [correo]);
    await connection.end();
    return rows.length > 0 ? rows[0].nombre : null;
};

// Función para enviar el correo
const enviarCorreo = async (correo, contrasena) => {
    // Obtener el nombre del empleado
    const nombreEmpleado = await obtenerNombreEmpleado(correo);

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Cambia el servicio si es necesario
        auth: {
            user: 'gastrofusionmila@gmail.com',
            pass: 'yvdn jrxv mbbb ncoe',
        },
    });

    // Cuerpo del correo en formato HTML
    const mailOptions = {
        from: 'gastrofusionmila@gmail.com',
        to: correo,
        subject: 'Tu contraseña generada',
        html: `
             <div class="flex items-center justify-center">
        <div class="relative max-w-[24rem] rounded-lg border-2 border-yellow-300 bg-white p-6 font-sans text-sm text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
            <div class="flex items-center justify-center gap-4 mb-4 -ml-32">
                <!-- Logo más pequeño -->
                <img class="h-16 object-cover" src="https://i.ibb.co/gj0Bpcc/logo-empresa-mila.png" alt="logo-empresa-mila" />

                <h6 class="text-center font-sans text-base antialiased font-medium leading-relaxed tracking-normal text-blue-gray-900 ml-10 mb-2">
                    Bienvenido a Mila GastroFusion:
                </h6>
            </div>


            <p class="text-center font-sans text-sm antialiased font-normal leading-normal text-gray-700 mb-6">
                Estimado ${nombreEmpleado || 'empleado'},<br>
                Tu contraseña ha sido generada exitosamente. Aquí están los detalles:
            </p>
            <div class="text-center mb-4">
                <strong class="text-lg">Contraseña generada:</strong> 
                <span class="text-gray-900 text-lg font-semibold">${contrasena}</span> 
            </div>
            <p class="text-center font-sans text-sm antialiased font-normal leading-normal text-gray-700 mb-4">
                Por favor, asegúrate de cambiar tu contraseña después de iniciar sesión.<br>
                Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros.
            </p>
            <div class="flex items-center justify-center gap-8 pt-4 mt-6 border-t border-yellow-300">
                <p class="flex items-center gap-1 font-sans text-xs antialiased font-normal text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="-mt-0.5 h-3.5 w-3.5">
                    </svg>
                     &copy; 2024 Mila GastroFusion
                </p>
            </div>
        </div>
    </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};

export default enviarCorreo;
