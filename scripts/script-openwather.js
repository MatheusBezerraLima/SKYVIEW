const apiKey = '20fba1ad64c719dbf6e527049f292875';
const city = 'Cajamar';

import { informarRegistro } from './script-buscar-endereco.js';

console.log(divClicada);



const getData = async() => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const response = await fetch(apiWeatherURL);
    const data = await response.json();

    console.log(data);

};

getData();