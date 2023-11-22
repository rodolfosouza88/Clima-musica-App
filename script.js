function btnBusca() {
    const input = document.getElementById('input-busca').value;

    moveInput()
}

function fecharInput() {
    document.getElementById('input-busca').style.visibility = 'hidden';
    document.getElementById('input-busca').style.width = '40px';
    document.getElementById('input-busca').padding = '0.5rem 0.5rem 0.5rem 2.6rem';
    document.getElementById('input-busca').style.transition = 'all 0.5s ease-in-out 0s';
    document.getElementById('input-busca').value = "";
}

function abrirInput() {
    document.getElementById('input-busca').style.visibility = 'visible';
    document.getElementById('input-busca').style.width = '300px';
    document.getElementById('input-busca').style.padding = '0.5rem 0.5rem 0.5rem 3.1rem';
}

function moveInput() {
    const visibility = document.getElementById('input-busca').style.visibility;

    if (visibility === 'hidden') {
        abrirInput()
    } else {
        fecharInput()
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fecharInput();
})