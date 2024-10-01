
const apiKey = '20fba1ad64c719dbf6e527049f292875';

const getData = async(object) => {
    
    let valueInput = document.querySelector('.input-pesquisa').value
    let valueDescription = document.querySelector('.p-clima')
    let valueClima = document.querySelector('.text-clima')
    let city = valueInput
    
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const response = await fetch(apiWeatherURL);
    const data = await response.json();

    console.log(data);
    console.log(data.main.temp);

    valueClima.innerHTML = parseInt(data.main.temp) + "°C"
    valueDescription.innerHTML = data.weather[0].description
    
    

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
