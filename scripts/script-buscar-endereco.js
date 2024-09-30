// OpenWather - MATHEUS 

const apiKey = '20fba1ad64c719dbf6e527049f292875';
const city = 'Cajamar';

const getData = async() => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const response = await fetch(apiWeatherURL);
    const data = await response.json();

    console.log(data);

};

getData();

    // Functions for animations
    
    const transformPage = () => {
        let div = document.createElement('div')
        div.classList
    }


// 







// LOCAL STORAGE - MATHEUS BEZERRA LIMA 

var boxLista = document.getElementById('box-lista')
var indice = 1
var duplicidade = false

// FUNÇÃO PARA MOSTRAR A DIV COM OS RESULTADOS
const mostrarContainer = () =>{
    let container = document.querySelector(".result-container")
    container.style.marginLeft = 0 

    let containerForm = document.querySelector(".container-form")
    containerForm.style.borderTopRightRadius = 0
    containerForm.style.borderBottomRightRadius = 0
}

// FUNÇÃO PARA FORMATAR PARA CEP
function formatarCEP(numero) {
    // Converte o número para string e remove qualquer caractere que não seja dígito
    let cep = numero.toString().replace(/\D/g, '');

    // Verifica se o número tem o comprimento correto de 8 dígitos
    if (cep.length !== 8) {
        return 'CEP inválido'; // Retorna mensagem de erro se não tiver 8 dígitos
    }

    // Formata o CEP no formato XXXXX-XXX
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}

// FUNÇÃO PARA EXPANDIR CADA ITEM DO HISTÓRICO DE PESQUISAS
const ExpandirItem = (event) =>{    

    // Captura o elemento que disparou o evento (i)
    let QuemDisparou = event.target
    // Captura o pai do elemento que disparou o evento (divValores)
    let divPai = QuemDisparou.parentElement
    // Captura os filhos da DivValores (... p's ...)
    let pFilhos = divPai.children
    
    // Verifica se o elemento html -i- (Que disparou o evento) contém a classe fa-angle-down 
    if(QuemDisparou.classList.contains("fa-angle-down")){

        QuemDisparou.classList.remove("fa-angle-down")
        QuemDisparou.classList.add("fa-angle-up")

        // For para tirar o display none de cada item filho que estava escondido
        for(var i = 1; pFilhos.length; i++){
            pFilhos[i].classList.remove("hidden")
        }
    }else{

        QuemDisparou.classList.remove("fa-angle-up")
        QuemDisparou.classList.add("fa-angle-down")

        // Verifica se algum elemento da divValores possui o atributo "Elemento" (Adicionado apenas no paragrafo-CEP para inpedir que ele seja ocultado)
        for(var i = 1; pFilhos.length; i++){
            if(pFilhos[i].hasAttribute("Elemento")){
            }else{
                pFilhos[i].classList.add("hidden")
            }
        }
    }
}

const informarRegistro = (divClicada) =>{
        
    console.log(divClicada);
    
    divClicada.classList.add('clicked');
    const Ps = divClicada.querySelectorAll('.res')

    for (i = 0 ; i < Ps.length; i++){
        Ps[i].classList.add('p-hidden')
    }
    // Mostrar mensagem de sucesso
    const mensagem = divClicada.querySelector('.container-mensagem');
    mensagem.classList.add('show');

    setTimeout(() => {
        mensagem.classList.remove('show');
        divClicada.classList.remove('clicked');

        for (i = 0 ; i < Ps.length; i++){
            Ps[i].classList.remove('p-hidden')
        }
    }, 2000); // 3 segundos para feedback e voltar ao normal

}

// FUNÇÃO PARA LISTAR OS CEPS JÁ PESQUISADOS NO HISTÓRICO 
 const listarPesquisas = () =>{

    // Teste para verificar se a chave que armazena os históricos no LocalStorage já foi criada  
    try{
    boxLista.innerHTML = ""
    indice = 1
    
    // Tenta capturar uma chave no LocalStorage
     let Lista = localStorage.getItem("LISTA_CEPS")

    //  Converte o resultado que vem no formato JSON para um elemento Script
     Lista = JSON.parse(Lista)
    
    //  Percorre todos os valores armazenados na chave LISTA_CEPS no LocalStorage
     Lista.forEach(item => {

        // Criando os elementos HTML e adicionando as respectivas classes e atributos

        let div = document.createElement("div")
        div.classList.add("item-lista")

        let span = document.createElement("span")
        span.classList.add('indice')
        span.innerHTML = indice

        let divValores = document.createElement('div')
        divValores.classList.add("valores-item")

        let p_cep = document.createElement('p')
        p_cep.innerHTML = `<b>CEP:</b> ${item.CEP} <br>`
        p_cep.setAttribute("Elemento", "CEP")

        let p_rua = document.createElement('p')
        p_rua.innerHTML = `<b>RUA:</b> ${item.RUA} `
        p_rua.classList.add("hidden")

        let p_bairro = document.createElement('p')
        p_bairro.innerHTML = `<b>BAIRRO:</b> ${item.BAIRRO} `
        p_bairro.classList.add("hidden")

        let p_cidade = document.createElement('p')
        p_cidade.innerHTML = `<b>CIDADE:</b> ${item.CIDADE}`
        p_cidade.classList.add("hidden")

        let p_estado = document.createElement('p')
        p_estado.innerHTML = `<b>UF :</b> ${item.ESTADO} `
        p_estado.classList.add("hidden")

        let iconExpandir = document.createElement('i')
        iconExpandir.classList.add("espandir")
        iconExpandir.classList.add("fa")
        iconExpandir.classList.add("fa-angle-down")

        // Adiciona o evento de ExpandirItem ao elemento i 
        iconExpandir.addEventListener("click", ExpandirItem)
        
    

        div.appendChild(span)
        divValores.appendChild(iconExpandir)
        divValores.appendChild(p_cep)
        divValores.appendChild(p_rua)
        divValores.appendChild(p_bairro)
        divValores.appendChild(p_cidade)
        divValores.appendChild(p_estado)
        div.appendChild(divValores)
        boxLista.appendChild(div)

       indice += 1
       
     });

    //  Caso a chave LISTA_CEPS não exista, ou seja, NADA FOI PESQUISADO AINDA, ele avisará no CATCH 
    }catch{
        let div = document.createElement("div")
        div.classList.add("item-vazio")


        let p = document.createElement('p')
        p.innerHTML = `<b>Histórico Vazio...</b>` 

        div.appendChild(p)
        boxLista.appendChild(div)
    }

    return;
 }

 listarPesquisas()

//  FUNÇÃO PARA ADICIONAR OS RESULTADOS VALIDOS DE UMA PESQUISA NO HISTÓRICO DO INDIVIDUO
 const adicionarItem = (cepVigente, rua, bairro, cidade, estado, divClicada) => {

    // Captura o número digitado em uma input e trata esse valor para deixar em formato de CEP
    cepVigente = formatarCEP(cepVigente)

    // Verifica se a chave LISTA_CEPS existe no localStorage, se sim, executa esse bloco abaixo 
    if(localStorage.getItem("LISTA_CEPS")){
        try{
            // Captura a chave do LocalStorage e tranforma em elemento Script
            let listaExistente = localStorage.getItem("LISTA_CEPS");
            listaExistente = JSON.parse(listaExistente);

            // Caso ele captura o valor da chave e ele não retorne como um ARRAY ele transformará em um
            if (!Array.isArray(listaExistente)) {
                listaExistente = [{}]; 
            }
        
            // Função para verificar duplicidade de valores no histórico para não repetir  
            listaExistente.forEach(item =>{  
                if(cepVigente == item.CEP){
                duplicidade = true
                }    
            })

            // Caso não seja uma pesquisa repetida ele adicionará no histórico
            if(duplicidade == false){
                // Adicniona um objeto dentro de um array com os valores retirados do resultado da pesquisa
                listaExistente.push(
                    {CEP: cepVigente, RUA: rua, BAIRRO: bairro, CIDADE: cidade, ESTADO: estado}
                );

                // Converte para JSON antes de adicionar na chave 
                let listaAtualizada = JSON.stringify(listaExistente);

                // RECRIA a chave no localStorage com os valores atualizados
                localStorage.setItem("LISTA_CEPS", listaAtualizada)

                informarRegistro(divClicada)

            }else{
                return;
            }
        }catch(error){
            console.log(error);
        }
     
    // Caso seja a primeira pesquisa ele criará a chave no bloco ELSE abaixo
    }else{
         let listaCeps = [
            {CEP: cepVigente, RUA: rua, BAIRRO: bairro, CIDADE: cidade, ESTADO: estado}
        ]

         let listaCepsJson = JSON.stringify(listaCeps)

         localStorage.setItem("LISTA_CEPS", listaCepsJson)

         informarRegistro(divClicada)
    }    
     
    listarPesquisas()
    transformPage(cepVigente, rua, bairro, cidade, estado, divClicada)
};


 const searchCEP = () =>{
    let parametro = document.getElementById('searchCEP').value

    if(parametro == ""){
        listarPesquisas()
    }else{

     var cepEncontrado = false
     boxLista.innerHTML = ""
    
     try{
        let Lista = localStorage.getItem("LISTA_CEPS")
        Lista = JSON.parse(Lista)
     
     Lista.forEach(item =>{
        indice += 1

        // Filtrando a listagem com base no parametro de pesquisa (Valor digitado na input)
        if(item.CEP.toLowerCase().includes(parametro.toLowerCase())){
             
            let div = document.createElement("div")
            div.classList.add("item-lista")

            let divValores = document.createElement('div')
            divValores.classList.add("valores-item")

            let p_cep = document.createElement('p')
            p_cep.innerHTML = `<b>CEP:</b> ${item.CEP} <br>`
            p_cep.setAttribute("Elemento", "CEP")

            let p_rua = document.createElement('p')
            p_rua.innerHTML = `<b>RUA:</b> ${item.RUA} `
            p_rua.classList.add("hidden")

            let p_bairro = document.createElement('p')
            p_bairro.innerHTML = `<b>BAIRRO:</b> ${item.BAIRRO} `
            p_bairro.classList.add("hidden")

            let p_cidade = document.createElement('p')
            p_cidade.innerHTML = `<b>CIDADE:</b> ${item.CIDADE}`
            p_cidade.classList.add("hidden")

            let p_estado = document.createElement('p')
            p_estado.innerHTML = `<b>UF :</b> ${item.ESTADO} `
            p_estado.classList.add("hidden")

            let iconExpandir = document.createElement('i')
            iconExpandir.classList.add("espandir")
            iconExpandir.classList.add("fa")
            iconExpandir.classList.add("fa-angle-down")
            iconExpandir.addEventListener("click", ExpandirItem)
            
        


            divValores.appendChild(iconExpandir)
            divValores.appendChild(p_cep)
            divValores.appendChild(p_rua)
            divValores.appendChild(p_bairro)
            divValores.appendChild(p_cidade)
            divValores.appendChild(p_estado)
            div.appendChild(divValores)
            boxLista.appendChild(div)

            // Atualiza a váriavel 
            cepEncontrado = true
         }
     })

        if(cepEncontrado == false){
            let div = document.createElement("div")
            div.classList.add("item-lista")

            let p = document.createElement('p')
            p.innerHTML = `<b>Esse cep ainda nâo foi pesquisado</b>` 

            div.appendChild(p)
            boxLista.appendChild(div)
        }
    
    }catch{
        return;
    }
}
 }

 const verHistorico = () => {
    let DivListagem = document.getElementById('listagem')
    DivListagem.style.right = '0'
 }

 const fecharHistorico = () => {
    let DivListagem = document.getElementById('listagem')
    DivListagem.style.right = '-350px'
 }

 const limparHistorico = () =>{
    localStorage.removeItem("LISTA_CEPS")
    listarPesquisas()
}


//  API - FELIPAO


// Capturando o form e a div do resultado
const form = document.getElementById("form")
const resultContainer = document.getElementById("result")

// Adicionando uma ação quando o formulário for enviado
form.addEventListener("submit", (e) => {
    // Previnindo que o formulário seja enviado e seja direcionado a outra página
    e.preventDefault()

    // Capturando valores do formulário
    const cep = document.getElementById("cep").value

    // URL da API com dados do formulário como parâmetro
    const url = `https://viacep.com.br/ws/${cep}/json/`

    // Conectando API a aplicação
    fetch(url)
        // Transformando a resposta em JSON e tratando-a
        .then(response => response.json())
        .then(data => {
            // Limpando o campo de resultado
            resultContainer.innerHTML = ''

            // Verificando se o CEP foi encontrado
            if (data.erro) {
                resultContainer.innerHTML = "<p>CEP não encontrado.</p>"
            } else {
                // Criando um link para o Google Maps com o endereço enviado
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${data.logradouro + ', ' + data.bairro + ', ' + data.localidade + ', ' + data.uf}`

                    const Cep = data.cep
                    const Rua = data.logradouro
                    const Bairro = data.bairro
                    const Cidade = data.localidade
                    const Estado = data.uf

                    // Criando o HTML para exibir as informações do endereço
                    const address = `
                    <div class="resultado" onclick="adicionarItem('${Cep}', '${Rua}', '${Bairro}', '${Cidade}', '${Estado}', this)">
                     <div class="container-mensagem">
                        <p class="mensagem" id="mensagem"> Adicionado ao histórico</p>
                        <i class="fa fa-check-circle" style="font-size:24px;color:#155724"></i>
                    </div>
                    <p class="res"><strong>CEP:</strong> ${data.cep}</p>
                    <p class="res"><strong>Rua:</strong> ${data.logradouro}</p>
                    <p class="res"><strong>Bairro:</strong> ${data.bairro}</p>
                    <p class="res"><strong>Cidade:</strong> ${data.localidade}</p>
                    <p class="res"><strong>Estado:</strong> ${data.uf}</p>
                    <p class="res"><a href="${mapsUrl}" target="_blank">Ver no Google Maps</a></p> 
                    </div>   
                `

                // Adicionando HTML no campo de resultado
                resultContainer.innerHTML += address

          
            }
            
            mostrarContainer()
        })
        .catch(error => {
            // Se a conexão com a API falhar
            console.error('Erro:', error)
        })
})

// Adicionando um evento ao botão de reset para limpar o resultado
form.addEventListener("reset", () => {
    // Limpa o conteúdo da div de resultado
    resultContainer.innerHTML = '' 
})


