// tiene header, payload (no guardar datos sensibles ), firma (una semilla)
const jwt = require('jsonwebtoken');


const generarJWT = ( uid ) => {

    return new Promise((resolve, reject) => {

        const payload = {uid};

    // firmar
    jwt.sign( payload, process.env.JWT_KEY, {
        expiresIn: '12h'
    }, (err, token) => {

        if ( err ) {
            reject('Error al Crear JWT');
        } else {
            resolve( token );
        }
     })
    });

}

module.exports = {
    generarJWT
}