require('dotenv').config();
const { leerInput, pausa, inquirerMenu, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {
    
    const busquedas = new Busquedas();
    let opt;

    do {
        
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad( lugar );

                const id = await listarLugares( lugares );
                if( id === '0' ) continue;
              
                const lugarSel = lugares.find( l => l.id === id);
                busquedas.agregarHistorial( lugarSel.nombre );

                const lugarTemp = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );


                console.log('\n Información de la ciudad \n'.green);

                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', lugarTemp.temp);
                console.log('Mínima:', lugarTemp.min);
                console.log('Máxima:', lugarTemp.max);

            break;
            
            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, idx) => {
                    const indice = `${ idx }.`.green;

                    console.log(`${ indice } ${ lugar }`);
                    
                });
            break;

            
        }

        if(opt !== 0) await pausa();

    } while (opt !== 0);
}

main();