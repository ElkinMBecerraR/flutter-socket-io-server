const express = require('express');
const path = require('path');
require('dotenv').config();  // Variables de entorno
// express app el cual esta va a majenar o tiene que incorporarse para usar
const app = express();


// servidor de Node
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket'); // llamado al archivo js



// Path publica o carpeta publica
const publicPath = path.resolve( __dirname, 'public');
// le digo que sirva el public path para que lo muestre HTML
app.use( express.static( publicPath));

// si inicia para que tenga escucha en el puesrto 3000 y si tiene un err mande el error 
server.listen( process.env.PORT, (err) =>{

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);
});