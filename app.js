// esto sirve para crear el package.json con informacion por defecto
// npm init -y 

//paquetes para solicitar peticiones http
//paquete obsoleto request: https://www.npmjs.com/package/request funciona en base a coldbacks, de igual manera es muy utilizado.
//paquete fech: https://www.npmjs.com/package/fetch referencia, se utiliza mucho en el lado del frontend
//paquete axios: https://www.npmjs.com/package/axios este paquete trabaja en base a promesas

// paquete dotenv: https://www.npmjs.com/package/dotenv para declarar variables de otros archivos
// va con el archivo .env


require('dotenv').config()
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");



const main = async() => {


    const busquedas = new Busquedas;
    let opt = ''


    do {
        
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //TODO: mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                
                //TODO: buscar los lugar 
                const lugares = await busquedas.ciudad(termino);
                
                //TODO: seleccionar el lugar
                const id = await listarLugares(lugares);
                if (id === '0') continue;
                // metodo .find() metodo propio de js - regresara el primer elemento que especificas en el coldback
                const lugarSel = lugares.find(l => l.id === id);

                //Guardar DB
                busquedas.agregarHistorial(lugarSel.nombre);
                
                //TODO: clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

                //TODO: mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre.green);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Minima:', clima.min);
                console.log('Maxima:', clima.max);
                console.log('descripcion:', clima.desc.green);

                break;

            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${ idx } ${ lugar }`);
                })
            break;
        
        }

        if (opt !== 0) await pausa();

    } while (opt !== 0);



}


main();