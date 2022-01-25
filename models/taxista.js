// importacion
const { v4: uuidV4 } = require('uuid');

class Taxista{

    constructor ( name = 'no_name'){
        this.id = uuidV4(); // npm i uuid paquete
        this.nombre = name;
        this.cant = 0;
    }
}

module.exports = Taxista;