export const generarContrasena = (minLength = 6, maxLength = 10) => {
    const letrasMayus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letrasMinus = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()';
    
    // Al menos un carácter de cada tipo
    let contrasena = [
        letrasMayus[Math.floor(Math.random() * letrasMayus.length)],
        letrasMinus[Math.floor(Math.random() * letrasMinus.length)],
        numeros[Math.floor(Math.random() * numeros.length)],
        simbolos[Math.floor(Math.random() * simbolos.length)]
    ];
    
    // Genera el resto de caracteres hasta completar una longitud aleatoria entre minLength y maxLength
    const caracteres = letrasMayus + letrasMinus + numeros + simbolos;
    const longitud = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    
    for (let i = contrasena.length; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        contrasena.push(caracteres[indice]);
    }
    
    // Mezclar caracteres para que no sigan un orden predecible
    contrasena = contrasena.sort(() => Math.random() - 0.5).join('');

    const fechaCreacion = new Date();
    return { contrasena, fechaCreacion };
    
};
