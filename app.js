// esto sirve para crear el package.json con informacion por defecto
// npm init -y 

//paquetes para solicitar peticiones http
//paquete obsoleto request: https://www.npmjs.com/package/request funciona en base a coldbacks, de igual manera es muy utilizado.
//paquete fech: https://www.npmjs.com/package/fetch referencia, se utiliza mucho en el lado del frontend
//paquete axios: https://www.npmjs.com/package/axios este paquete trabaja en base a promesas

const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async() => {


    const busquedas = new Busquedas;
    let opt = ''


    do {
        
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                console.log(lugar);

                //buscar los lugar

                //seleccionar el lugar

                //clima

                //mostrar resultados

                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ');
                console.log('Lat: ');
                console.log('Lng: ');
                console.log('Temperatura: ');
                console.log('Minima: ');
                console.log('Maxima: ');

                break;

            case 2:
                
            break;

            case 0:
                
            break;
        
        }

        if (opt !== 0) await pausa();

    } while (opt !== 0);



}


main();