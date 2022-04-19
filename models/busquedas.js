const axios = require('axios');

class Busquedas{

    historial = ['Tegucigalpa','Madrid','San Jose']

    constructor(){
        //leer db si existe
    }


    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
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

            const resp = await intance.get();
            //esta forma ( lugar => ({})) es para retornar un objeto de forma implicita
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
           

        } catch (error) {
            return [];
        }
    }

    get paramsWeatherMap(){
        return{
            //?lat=9.93333&lon=-84.08333
            'appid': c7537c8fce9806c2854e97138e9088d9,
            'units': metric,
            'lang': es
        }
    }


    async climaLugar (lat, lon) {
        try {
            
            const instance = axios.create({
                baseURL: `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                //api.openweathermap.org/data/2.5/weather
                

            });

            //resp.data

            return{
                desc: '',
                min: '',
                max: '',
                temp: ''
            }


        } catch (error) {
            console.log(error);
        }
    }

}



module.exports = Busquedas;