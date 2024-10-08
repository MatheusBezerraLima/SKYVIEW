
const apiKey = '20fba1ad64c719dbf6e527049f292875';
var dayNumber = new Date().getDay() + 1;
var firstGet = true

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
const fevereiro = ['28', '29']
const month30days = ['04','06', '08', '10', '12']
const month31days = ['01', '03', '05', '07', '09', '11']


const fillBarTempMin = (tempMin, tempMax, indice) => {
    var minTemp = '';
    var maxTemp = '';

    if (tempMin <= 0) {
        minTemp = '#005f99'; // Azul frio profundo para temperaturas muito baixas
    } else if (tempMin <= 10) {
        minTemp = '#3399cc'; // Azul mais suave
    } else if (tempMin <= 20) {
        minTemp = '#66b2ff'; // Azul claro e suave
    } else if (tempMin <= 25) {
        minTemp = '#ffd966'; // Amarelo suave e caloroso
    } else if (tempMin <= 30) {
        minTemp = '#ffb84d'; // Laranja suave
    } else if (tempMin <= 35) {
        minTemp = '#ff8c1a'; // Laranja vibrante
    } else if (tempMin > 35) {
        minTemp = '#ff471a'; // Vermelho quente intenso
    }
    
    if (tempMax <= 0) {
        maxTemp = '#005f99'; // Azul frio profundo para temperaturas muito baixas
    } else if (tempMax <= 10) {
        maxTemp = '#3399cc'; // Azul mais suave
    } else if (tempMax <= 20) {
        maxTemp = '#66b2ff'; // Azul claro e suave
    } else if (tempMax <= 25) {
        maxTemp = '#ffd966'; // Amarelo suave e caloroso
    } else if (tempMax <= 30) {
        maxTemp = '#ffb84d'; // Laranja suave
    } else if (tempMax <= 35) {
        maxTemp = '#ff8c1a'; // Laranja vibrante
    } else if (tempMax > 35) {
        maxTemp = '#ff471a'; // Vermelho quente intenso
    }
    
    
    const barra = document.querySelectorAll('.barra');
    
    // Atualiza o estilo da barra com um gradiente linear
    if( t <= 3 ){
            barra[indice].style.background = `linear-gradient(90deg, ${minTemp}, ${maxTemp})`;

    }
};

const getNextdays = (day, month, year) =>{

    const getnextDates = []

    for (let i = 0; i < 5; i++) {
        day += 1;

        // Lida com os meses de 30 dias
        if (month30days.includes(month.toString()) && day > 30) {
            day = 1;
            month += 1;
        }

        // Lida com os meses de 31 dias
        if (month31days.includes(month.toString()) && day > 31) {
            day = 1;
            month += 1;
        }

        // Lida com o mês de fevereiro
        if (month == 2 && day > 28 && year % 4 != 0) {
            day = 1;
            month = 3;
        } else if (month == 2 && day > 29 && year % 4 == 0) {
            day = 1;
            month = 3;
        }

        // Lida com o mês de dezembro
        if (month > 12) {
            month = 1;
            year += 1;
        }

        // Adiciona as datas no formato 'YYYY-MM-DD' - Colocando o zero a frente dos meses que possuem apenas um algarismo 
        getnextDates.push(`${year}-${month}-${day}`);        
    }

     return getnextDates;
}
    

 
const insertDaysWeek = () =>{

    const valuesDays = document.querySelectorAll('.day')

    for(i=0; i < valuesDays.length; i++){

        if(dayNumber == 7){
            dayNumber = 0
        }

        var dayWeek = daysOfWeek[dayNumber]

        // Verifica se esta tratando do dia atual ou dos próximos
        valuesDays[i].innerHTML = '<b>' + dayWeek + '.</b>'
        dayNumber +=1

       

    }
}

insertDaysWeek()

const getDateLocal = () =>{
    const now = new Date()

    const day = now.getDate() 
    const month = now.getMonth() +1
    const year = now.getFullYear()

    
    const nextDates = getNextdays(day, month, year)
    
    return nextDates;
}

const insertForecast = (data) =>{
    const iconDay = document.querySelectorAll('.icon-day')
    const valueMaxTemp = document.querySelectorAll('.max-temp')
    const valueMinTemp = document.querySelectorAll('.min-temp')
    
    for(i=0; i < data.length  ; i ++){
        
        iconDay[i].src = `https://openweathermap.org/img/wn/${data[i].Icon}@2x.png`

        valueMaxTemp[i].innerHTML = data[i].TempMax.toFixed(0) + '°'
        valueMinTemp[i].innerHTML = data[i].TempMin.toFixed(0) + '°'
        
    }    
    
}


const getDataDays = async(city) =>{
    

    const apiDias = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(apiDias)
    const data = await response.json()
    
    
    var listPrevDays = []
    const nextDatesOfc = getDateLocal()
    

    for(t = 0; t< nextDatesOfc.length ; t++){
        var TempMax = -Infinity
        var TempMin = Infinity     


        for(i=0 ; i< data.list.length; i++){
            
            let nextDates = new Date(nextDatesOfc[t])
            const nextDateString = nextDates.toISOString().split('T')[0]; // 'YYYY-MM-DD'
            const apiDate = new Date(data.list[i].dt_txt); // Cria um objeto Date a partir da string da API
            const apiDateString = apiDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
            
            if(nextDateString == apiDateString){
                
                const temp = data.list[i].main.temp;                

                if(temp < TempMin){
                    TempMin =  temp
                    
                }
                if(temp > TempMax){
                    TempMax =  temp

                    icon = data.list[i].weather[0].icon
                }
            }
            
            
        }
        listPrevDays.push({
            Data: nextDatesOfc[t],
            TempMax: TempMax,
            TempMin: TempMin,
            Icon: icon})

      

        fillBarTempMin(TempMin,TempMax, t)
        
    }
    insertForecast(listPrevDays)


}

const getData = async(cityFromIp = null) => {  
    let valueInput = document.querySelector('.input-pesquisa').value

    const city = firstGet && cityFromIp ? cityFromIp : valueInput;
        
    let valueDescription = document.querySelector('.desc-clima')
    let valueClima = document.querySelector('.text-clima')
    let valueHumidity = document.querySelector('.text-humidity')
    let valueWindSpeed = document.querySelector('.text-wind')
    let valueIcon = document.querySelector('.icon-clima')
    let valueTempMin = document.querySelector('.text-temp-min')
    let valueTempMax = document.querySelector('.text-temp-max')
    let valueNameCity = document.querySelector('.name-city') 
    
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const response = await fetch(apiWeatherURL);
    const data = await response.json();      

    valueNameCity.innerHTML = data.name
    valueClima.innerHTML = parseInt(data.main.temp) + "°C"  
    valueDescription.innerHTML = data.weather[0].description  
    valueHumidity.innerHTML = data.main.humidity + '%'
    valueWindSpeed.innerHTML = data.wind.speed + ' m/s'
    valueIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    valueTempMax.innerHTML =  data.main.temp_max.toFixed(1) + '°C'
    valueTempMin.innerHTML= data.main.temp_min.toFixed(1) + '°C'

    firstGet = false 

    getDataDays(city)    

}

const getCityIp = async() =>{
    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        // console.log(`Cidade: ${data.city}`);
        // console.log(`Região: ${data.region}`);
        // console.log(`País: ${data.country_name}`);
        getData(data.city)
    }).catch(
        getData('Osasco')
    );

}   


document.querySelector('.input-pesquisa').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getData(); // Busca pela cidade digitada
    }
});


document.addEventListener('DOMContentLoaded', getCityIp)


