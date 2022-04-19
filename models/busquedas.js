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

    get paramsWeatherMap(){
        return{
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
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

    async climaLugar (lat, lon) {
        try {
            
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,               
                params: {... this.paramsWeatherMap, lat, lon}
            })

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }


        } catch (error) {
            console.log(error);
        }
    }


    agregarHistorial( lugar = ''){

        //TODO: prevenir duplicidad
        if(this.historial.includes(luga.toLocaleLowerCase())){
            return;
        }



        this.historial.unshift(lugar.toLocaleLowerCase());

        //Grabar en db

    }

}



module.exports = Busquedas;