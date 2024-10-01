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
