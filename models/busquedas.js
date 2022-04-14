const axios = require('axios');

class Busquedas{

    historial = ['Tegucigalpa','Madrid','San Jose']

    constructor(){
        //leer db si existe
    }


    get paramsMapbox() {
        return {
            'access-token': 'pk.eyJ1IjoiYzBkeXNhbiIsImEiOiJjbDFzZ243dHkwczBiM2lzNmQwNGZ6aXQ0In0.vfTxRw-K0Gy4__GbojL_rg',
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad( lugar = '' ) {
        
        try {
            
            //peticion http
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = intance.get();
            console.log(resp.data);

            return [];

        } catch (error) {
            return [];
        }

        return []; //retornar los lugares
    }
}



module.exports = Busquedas;