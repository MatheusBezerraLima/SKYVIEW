
const apiKey = '20fba1ad64c719dbf6e527049f292875';
var dayNumber = new Date().getDay();
console.log(dayNumber);

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
const fevereiro = ['28', '29']
const month30days = ['04','06', '08', '10', '12']
const month31days = ['01', '03', '05', '07', '09', '11']

const getNextdays = (day, month, year) =>{

    const nextDays = []
    const getnextDates = []

    for(i = 0; i<month30days.length; i++){
        if(month30days[i] == month){
            for(d= 1; d < 5; d++){
                nextDays.push(day + 1)
                console.log(nextDays);
                day += 1

                if(day == 31){
                    day == 0
                    month == month + 1
                }

                getnextDates.push(`${year}-${month}-${day} 12:00:00`)
                getnextDates.push(`${year}-${month}-${day+1} 00:00:00`)

             
                // console.log(getnextDates);
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
        valuesDays[i].innerHTML = dayWeek
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
    
    const cont = 0
    const iconDay = document.querySelectorAll('.icon-day')
    const valueMaxTemp = document.querySelectorAll('.max-temp')
    const valueMinTemp = document.querySelectorAll('.min-temp')

    console.log(data);
    
    for(i=0; i < data.length / 2 ; i ++){
        iconDay[i].src = `https://openweathermap.org/img/wn/${data[i * 2].Icon}@2x.png`

        valueMaxTemp[i].innerHTML = data[i * 2].Temp.toFixed(0) + '°C'
        valueMinTemp[i].innerHTML = data[i * 2 + 1].Temp.toFixed(0) + '°C'
        
    }    
    
}

const getDataDays = async(city) =>{
    
    const apiDias = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(apiDias)
    const data = await response.json()

    // console.log(data.list);
    
    
    var listPrevDays = []

    const nextDatesOfc = getDateLocal()

    for(t = 0; t< nextDatesOfc.length ; t++){

        for(i=0 ; i< data.list.length; i++){

            const nextDate = new Date(nextDatesOfc[t]);  
            const apiDate = new Date(data.list[i].dt_txt);

            if(nextDate.getTime() === apiDate.getTime()){                   
                listPrevDays.push({Data: nextDatesOfc[t] ,Temp: data.list[i].main.temp, Icon: data.list[i].weather[0].icon})
            }
        }
    }

    insertForecast(listPrevDays)

}

const getData = async(event) => {

    if(event.key === 'Enter'){
        let valueInput = document.querySelector('.input-pesquisa').value
        let valueDescription = document.querySelector('.desc-clima')
        let valueClima = document.querySelector('.text-clima')
        let valueHumidity = document.querySelector('.text-humidity')
        let valueWindSpeed = document.querySelector('.text-wind')
        let valueIcon = document.querySelector('.icon-clima')
        let valueTempMin = document.querySelector('.text-temp-min')
        let valueTempMax = document.querySelector('.text-temp-max')
        let valueTempMaxPrev = document.querySelector('.max-temp-atual')
        let valueTempMinPrev = document.querySelector('.min-temp-atual')
        let valueIconPrev = document.querySelector('.icon-day-atual')

        // console.log(valueIcon);
        
        let valueNameCity = document.querySelector('.name-city')
        let city = valueInput
        
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

        const response = await fetch(apiWeatherURL);
        const data = await response.json();

        // console.log(data);
        
        

        valueNameCity.innerHTML = data.name
        valueClima.innerHTML = parseInt(data.main.temp) + "°C"
        valueDescription.innerHTML = data.weather[0].description  
        valueHumidity.innerHTML = data.main.humidity + '%'
        valueWindSpeed.innerHTML = data.wind.speed + ' m/s'
        valueIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        valueTempMax.innerHTML =  data.main.temp_max.toFixed(1) + '°C'
        valueTempMin.innerHTML= data.main.temp_min.toFixed(1) + '°C'
        valueIconPrev.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        valueTempMaxPrev.innerHTML = parseInt(data.main.temp) + "°C"
        valueTempMinPrev.innerHTML = parseInt(data.main.temp_min.toFixed(0)) + "°C"


        getDataDays(city)

    }else{
        return;
    }
    
    
    

};

getData();

    // Functions for animations
    
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

document.querySelector('.input-pesquisa').addEventListener('keypress', getData);

