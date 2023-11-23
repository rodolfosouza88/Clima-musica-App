const input = document.getElementById('input-busca');
const apiKey = '7834cf06368aec6780a2a133b91cf15f';


function btnBusca() {
    const inputValue = input.value;

    moveInput(inputValue)
}

function moveInput(inputValue) {
    const visibility = input.style.visibility;

    inputValue && procurarCidade(inputValue);

    visibility === 'hidden' ? abrirInput() : fecharInput();
}

function fecharInput() {
    input.style.visibility = 'hidden';
    input.style.width = '40px';
    input.padding = '0.5rem 0.5rem 0.5rem 2.6rem';
    input.style.transition = 'all 0.5s ease-in-out 0s';
    input.value = "";
}

function abrirInput() {
    input.style.visibility = 'visible';
    input.style.width = '300px';
    input.style.padding = '0.5rem 0.5rem 0.5rem 3.1rem';
    input.style.transition = 'all 0.5s ease-in-out 0s';
    input.value = "";
}

input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        const valorInput = input.value;
        moveInput(valorInput)
    }
})

document.addEventListener('DOMContentLoaded', () => {
    fecharInput();
})

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

async function procurarCidade(city) {
    try {
        const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`)

        if (dados.status === 200) {
            const resultado = await dados.json();

            mostrarClimaNaTela(resultado);
            console.log(resultado, '<<')
        } else {
            throw new Error
        }

    } catch {
        alert('A pesquisa por cidade deu errado!')
    }
}
 
function mostrarClimaNaTela(resultado) {
    document.querySelector('.icone-tempo').src=`./assets/img/${resultado.weather[0].icon}.png`
    document.querySelector('.nome-cidade').innerHTML = `${resultado.name}`;
    document.querySelector('.temperatura').innerHTML = `${resultado.main.temp.toFixed(0)}°C`;
    document.querySelector('.maxTemperatura').innerHTML = `MÁX: ${resultado.main.temp_max.toFixed(0)}°C`;
    document.querySelector('.minTemperatura').innerHTML = `MIN: ${resultado.main.temp_min.toFixed(0)}°C`;
}

