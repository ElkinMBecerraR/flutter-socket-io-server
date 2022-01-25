const Taxista = require("./taxista");


class LisTaxista{

    constructor(){
       this.listaxista = [];
    }

    addTaxista( taxista = new Taxista()){
        this.listaxista.push( taxista );
    }

    getLisTaxista(){
        return this.listaxista;
    }

    deleteTaxista ( id = ''){
        this.listaxista = this.listaxista.filter( taxista => taxista.id !== id);
        return this.listaxista;
    }

    cantTaxista( id = ''){
        this.listaxista = this.listaxista.map( taxista => {

            if( taxista.id === id ){
                taxista.cant++;
                return taxista;
            } else {
                return taxista;
            }
        } );

    }
}

module.exports = LisTaxista;
