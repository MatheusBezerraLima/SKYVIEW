
const apiKey = '20fba1ad64c719dbf6e527049f292875';
var dayNumber = new Date().getDay();
var firstGet = true

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
const fevereiro = ['28', '29']
const month30days = ['04','06', '08', '10', '12']
const month31days = ['01', '03', '05', '07', '09', '11']
var icon = ''


const fillBarTempMin = (tempMin, tempMax, indice) => {
    var minTemp = '';
    var maxTemp = '';

    if (tempMin <= 0) {
        minTemp = '#0044cc'; // Azul mais claro para temperaturas muito frias
    } else if (tempMin <= 10) {
        minTemp = '#3399ff'; // Azul claro
    } else if (tempMin <= 20) {
        minTemp = '#66ccff'; // Azul suave
    } else if (tempMin <= 25) {
        minTemp = '#ffcc66'; // Amarelo suave
    } else if (tempMin <= 30) {
        minTemp = '#ffaa33'; // Laranja claro
    } else if (tempMin <= 35) {
        minTemp = '#ff6600'; // Laranja mais escuro
    } else if (tempMin > 35) {
        minTemp = '#ff3300'; // Vermelho quente
    }

    if (tempMax <= 0) {
        maxTemp = '#0044cc'; // Azul mais claro para temperaturas muito frias
    } else if (tempMax <= 10) {
        maxTemp = '#3399ff'; // Azul claro
    } else if (tempMax <= 20) {
        maxTemp = '#66ccff'; // Azul suave
    } else if (tempMax <= 25) {
        maxTemp = '#ffcc66'; // Amarelo suave
    } else if (tempMax <= 30) {
        maxTemp = '#ffaa33'; // Laranja claro
    } else if (tempMax <= 35) {
        maxTemp = '#ff6600'; // Laranja mais escuro
    } else if (tempMax > 35) {
        maxTemp = '#ff3300'; // Vermelho quente
    }
    
    const barra = document.querySelectorAll('.barra');

    console.log(indice);
    
    if(indice == 10){
        const barraAtual = document.querySelector('.barra-atual');
        console.log(barraAtual);
        
        barraAtual.style.background = `linear-gradient(90deg, ${minTemp}, ${maxTemp})`;
    }

    // Atualiza o estilo da barra com um gradiente linear
    barra[indice].style.background = `linear-gradient(90deg, ${minTemp}, ${maxTemp})`;
};

const getNextdays = (day, month, year) =>{

    const nextDays = []
    const getnextDates = []

    for(i = 0; i<month30days.length; i++){
        if(month30days[i] == month){
            for(d= 1; d < 5; d++){
                nextDays.push(day + 1)
                day += 1

                if(day == 31){
                    day == 0
                    month == month + 1
                }

                getnextDates.push(`${year}-${month}-${day}`)

             
            }
        }
        if(month31days[i] == month){
            for(d= 1; d < 5; d++){
                nextDays.push(day + 1)
                day += 1

                if(day == 32){
                    day == 0
                    month == month + 1
                }

                getnextDates.push(`${year}-${month}-${day}`)
             
            }
        }
    }
    return getnextDates;

}
 
const insertDaysWeek = () =>{

    const valuesDays = document.querySelectorAll('.day')

    for(i=0; i < valuesDays.length; i++){

        if(dayNumber == 7){
            dayNumber = 0
        }

        var dayWeek = daysOfWeek[dayNumber ]

        // Verifica se esta tratando do dia atual ou dos próximos
        valuesDays[i].innerHTML = i ==  0 ? '<b>Hoje</b>' : '<b>' + dayWeek + '.</b>'
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

const fillToday = (data) =>{
    
    console.log(data);
    
    let TempMin = 999
    let TempMax = 0
    let now = new Date()

    let day = now.getDate() 
    let month = now.getMonth() +1
    let year = now.getFullYear()

    let today = `${year}-${month}-${day}`

    let dateToday = new Date(today)
    const nextDateString = dateToday.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    console.log(nextDateString);
    
    for(i=0 ; i< data.length; i++){
        let apiDate = new Date(data[i].dt_txt); 
        let apiDateString = apiDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        console.log(apiDateString);
        
        // console.log(apiDate);
        if(nextDateString === apiDateString ){

            let temp = data[i].main.temp;

                if(temp < TempMin){
                    TempMin = temp
                }else if(temp > TempMax){
                    TempMax = temp
                    icon = data[i].weather[0].icon
                    console.log(icon);
                    

                }
                        
        }
    }
    const iconDay = document.querySelector('.icon-day-atual')
    const valueMaxTemp = document.querySelector('.max-temp-atual')
    const valueMinTemp = document.querySelector('.min-temp-atual')

    iconDay.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    valueMaxTemp.innerHTML = TempMax.toFixed(0) + '°'
    valueMinTemp.innerHTML = TempMin.toFixed(0) + '°'

    fillBarTempMin(TempMin, TempMax, 10)
    return;
}

const getDataDays = async(city) =>{
    

    const apiDias = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(apiDias)
    const data = await response.json()
    
    
    var listPrevDays = []
    const nextDatesOfc = getDateLocal()

    for(t = 0; t< nextDatesOfc.length ; t++){
        var TempMax = 0
        var TempMin = 999

        for(i=0 ; i< data.list.length; i++){
            

            let nextDates = new Date(nextDatesOfc[t])
            const nextDateString = nextDates.toISOString().split('T')[0]; // 'YYYY-MM-DD'
            const apiDate = new Date(data.list[i].dt_txt); // Cria um objeto Date a partir da string da API
            const apiDateString = apiDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'

            if(nextDateString == apiDateString){
                
                const temp = data.list[i].main.temp;

                if(temp < TempMin){
                    TempMin = temp
                }else if(temp > TempMax){
                    // Calculo para deixar o valor mais aproximado, menos no dia seguinte ao atual pelo fato de serem valores mais precisos  
                    TempMax = t > 0 ? temp - 1.8 : temp
                    icon = data.list[i].weather[0].icon
                    console.log(TempMax);
                    

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
    fillToday(data.list)


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

};

getData();
    
const transformPage = () => {
    let div = document.createElement('div')
    div.classList
    }

const toggleTheme = () => {
    const body = document.querySelector('.backEffect');
    
    // Alterna a classe 'dark-theme' no body
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');  // Remove tema escuro
    } else {
        body.classList.add('light-theme');  // Adiciona tema escuro
    }
}


const alterMode = (object) => {
    let sunImage = 'url(../imgs/sol.png)' 
    let moonImage = 'url(../imgs/lua.png)'
    let dayImage = 'url(../imgs/dia.jpg)'
    let nightImage= 'url(../imgs/night.jpg)'

    let currentMode = object.getAttribute("modo-atual")

    if(currentMode == "lua"){
        object.style.backgroundImage = sunImage
        object.style.transform = 'translateX(80px)'
        object.parentElement.style.backgroundImage = dayImage;  

        object.setAttribute("modo-atual", "sol"); 

    }else{
        object.style.backgroundImage = moonImage
        object.style.transform = 'translateX(0)';
        object.parentElement.style.backgroundImage = nightImage;  
        object.setAttribute("modo-atual", "lua"); 
    }

    toggleTheme()
}

const getCityIp = async() =>{
    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        // console.log(`Cidade: ${data.city}`);
        // console.log(`Região: ${data.region}`);
        // console.log(`País: ${data.country_name}`);
        getData(data.city)
    }).catch(error => console.error('Erro ao obter localização por IP:', error));
x
}


document.querySelector('.input-pesquisa').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getData(); // Busca pela cidade digitada
    }
});document.addEventListener('DOMContentLoaded', getCityIp)