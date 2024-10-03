
const apiKey = '20fba1ad64c719dbf6e527049f292875';
const listDays = []


// const getDateLocal = () =>{
//     const now = new Date()

//     const dayNumber = now.getDay()
//     const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']

//     const dayWeek = daysOfWeek[dayNumber - 1]

//     const day = now.getDate() + 1
//     const month = now.getMonth() +1
//     const year = now.getFullYear()

//     const calcProximosDias = () =>{

//         for(i = 0; i <= 4; i++ ){

//             const fullDate = `${day}-${month}-${year}`
            
//             if(day == 30 & day+1 = 3){
                
//             }
            
//             // listDays.push()
//         }
//     }

//     calcProximosDias()
// }

// getDateLocal()

const getDataDays = async( city) =>{
    
const apiDias = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

const response = await fetch(apiDias)
const data = await response.json()

console.log(data.list);

}

const getData = async(event) => {

    if(event.key === 'Enter'){
        let valueInput = document.querySelector('.input-pesquisa').value
        let valueDescription = document.querySelector('.desc-clima')
        let valueClima = document.querySelector('.text-clima')
        let valueHumidity = document.querySelector('.text-humidity')
        let valueWindSpeed = document.querySelector('.text-wind')
        let valueIcon = document.querySelector('.icon-clima')

        console.log(valueIcon);
        
        let valueNameCity = document.querySelector('.name-city')
        let city = valueInput
        
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

        const response = await fetch(apiWeatherURL);
        const data = await response.json();

      

        valueNameCity.innerHTML = data.name
        valueClima.innerHTML = parseInt(data.main.temp) + "°C"
        valueDescription.innerHTML = data.weather[0].description  
        valueHumidity.innerHTML = data.main.humidity + '%'
        valueWindSpeed.innerHTML = data.wind.speed + 'm/s'
        valueIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

        console.log(valueIcon);


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

