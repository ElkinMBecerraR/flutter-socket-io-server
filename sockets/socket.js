const { io }= require('../index.js');

// Mensajes de los sockets
// client dispositivo que se conecta
io.on('connection', client => {
    
    console.log('Cliente conectado');

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    // escucha lo que manda el clien
    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        // emite mensaje a todos los clientes conectados     
        io.emit( 'mensaje', { admin: 'Nuevo mensaje'} );
    });
  });