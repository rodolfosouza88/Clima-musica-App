const input = document.getElementById('input-busca');
const apiKey = '7834cf06368aec6780a2a133b91cf15f';

const clientID = `6020022c819c4149bcb5ce37b67b2160`;
const clienteSecret = `a89b3c64c350414f8e3b85093f58798f`;


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


            topAlbunsPorPais(resultado.sys.country);
            mostrarClimaNaTela(resultado);
        } else {
            throw new Error
        }

    } catch {
        alert('Tente novamente!');
    }
}

function mostrarClimaNaTela(resultado) {
    document.querySelector('.icone-tempo').src = `./assets/img/${resultado.weather[0].icon}.png`;
    document.querySelector('.nome-cidade').innerHTML = `${resultado.name}`;
    document.querySelector('.temperatura').innerHTML = `${resultado.main.temp.toFixed(0)}°C`;
    document.querySelector('.maxTemperatura').innerHTML = `MÁX: ${resultado.main.temp_max.toFixed(0)}°C`;
    document.querySelector('.minTemperatura').innerHTML = `MIN: ${resultado.main.temp_min.toFixed(0)}°C`;
}

async function obterAcessoToken() {
    const credencials = `${clientID}:${clienteSecret}`;
    const encodedCredentials = btoa(credencials);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
    });


    const data = await response.json()

    return data.access_token;

    //'https://api.spotifycom/v1/browse/featured-playlists?timestamp=2023-01-12T9%3A00%3A00' 436 670 278 93

}

function obterDataAtual() {
    const currentDate = new Date();
    const ano = currentDate.getFullYear();
    const mes = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const dia = currentDate.getDate().toString().padStart(2, '0')

    return `${ano} - `
}


async function topAlbunsPorPais(country) {
    try {

        const accessToken = await obterAcessoToken();
        const url = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=2023-12-04T9%3A00%3A00&limit=3`

        const resultado = await fetch(`${url}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if (resultado.status === 200) {

            const data = await resultado.json()
            const result = data.playlists.items.map(item => ({
                name: item.name,
                image: item.images[0].url
            }))

            mostrarMusicaNaTela(result)
            

        } else {
            throw new Error
        }


    } catch {
        alert('a pesquisa por música deu errado')
    }
}


const ulElement = document.querySelector('.playlist-caixa');
const liElement = ulElement.querySelectorAll('li');

function mostrarMusicaNaTela(dados) {
    liElement.forEach((liElement, index) => {
      const imgElement = liElement.querySelector('img');
      const pElement = liElement.querySelector('p');

      imgElement.src = dados[index].image;
      pElement.textContent = dados[index].name
    })
}