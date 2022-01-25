const Client = require('socket.io/lib/client');
const { io }= require('../index.js');
const LisTaxista = require('../models/listaxista');
const Taxista = require('../models/taxista.js');
const listaxista = new LisTaxista();

listaxista.addTaxista(new Taxista('Elkin'));
listaxista.addTaxista(new Taxista('Jose'));
listaxista.addTaxista(new Taxista('Celessteee'));
listaxista.addTaxista(new Taxista('Luis'));


console.log(listaxista);

// Mensajes de los sockets
// client dispositivo que se conecta
io.on('connection', client => {
    
    console.log('Cliente conectado');

    client.emit('Taxistas activos', listaxista.getLisTaxista());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    // escucha lo que manda el clien
    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        // emite mensaje a todos los clientes conectados     
        io.emit( 'mensaje', { admin: 'Nuevo mensaje'} );
    });

    /*client.on('emitir mensaje', ( payload ) => {
      //  console.log(payload);
        // emite a todos los clientes conectados
        //io.emit('nuevo mensaje', payload);
        // exceptuando al mismo cliente 
        client.broadcast.emit('nuevo mensaje', payload);
    });*/

    // io es el servidor 

    client.on('votos-taxista',( payload )=> {

      listaxista.cantTaxista( payload.id );
      io.emit('Taxistas activos', listaxista.getLisTaxista());
    });

    //escucha cuando se agrega un taxista nuevo 

    client.on('Agregar-Taxista', ( payload )=> {
      const newTaxista = new Taxista( payload.name );
      listaxista.addTaxista( newTaxista );
      io.emit('Taxistas activos', listaxista.getLisTaxista());
    });

    client.on('Eliminar-Taxista', ( payload )=> {
      listaxista.deleteTaxista( payload.id );
      io.emit('Taxistas activos', listaxista.getLisTaxista());
    });

  });