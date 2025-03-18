let facaRegistros = [];

// Funções para a página de faca
function loadFacaRegistrosFromLocalStorage() {
    const savedRegistros = localStorage.getItem('facaRegistros');
    if (savedRegistros) {
        facaRegistros = JSON.parse(savedRegistros);
        updateFacaRegistrosList();
    }
}

function saveFacaRegistrosToLocalStorage() {
    localStorage.setItem('facaRegistros', JSON.stringify(facaRegistros));
}

function updateFacaRegistrosList() {
    const historico = document.getElementById('historico');
    historico.innerHTML = '';

    facaRegistros.forEach((registro, index) => {
        const registroItem = document.createElement('div');
        registroItem.className = 'history-item';
        registroItem.innerHTML = `
            <h4>Registro ${index + 1}</h4>
            <p><strong>Faca Inferior:</strong></p>
            <p>Antes: Esq ${registro.esqInfAntes}, Meio ${registro.meioInfAntes}, Dir ${registro.dirInfAntes}</p>
            <p>Depois: Esq ${registro.esqInfDepois}, Meio ${registro.meioInfDepois}, Dir ${registro.dirInfDepois}</p>
            <p><strong>Faca Superior:</strong></p>
            <p>Antes: Esq ${registro.esqSupAntes}, Meio ${registro.meioSupAntes}, Dir ${registro.dirSupAntes}</p>
            <p>Depois: Esq ${registro.esqSupDepois}, Meio ${registro.meioSupDepois}, Dir ${registro.dirSupDepois}</p>
            <p><strong>Comentário:</strong> ${registro.comentario}</p>
            <p><small>Data: ${registro.dataRegistro}</small></p>
        `;
        historico.appendChild(registroItem);
    });
}

function salvarMedidas() {
    const esqInfAntes = document.getElementById('esqInfAntes').value;
    const meioInfAntes = document.getElementById('meioInfAntes').value;
    const dirInfAntes = document.getElementById('dirInfAntes').value;
    const esqInfDepois = document.getElementById('esqInfDepois').value;
    const meioInfDepois = document.getElementById('meioInfDepois').value;
    const dirInfDepois = document.getElementById('dirInfDepois').value;
    const esqSupAntes = document.getElementById('esqSupAntes').value;
    const meioSupAntes = document.getElementById('meioSupAntes').value;
    const dirSupAntes = document.getElementById('dirSupAntes').value;
    const esqSupDepois = document.getElementById('esqSupDepois').value;
    const meioSupDepois = document.getElementById('meioSupDepois').value;
    const dirSupDepois = document.getElementById('dirSupDepois').value;
    const comentario = document.getElementById('comentario').value;
    const dataRegistro = document.getElementById('dataRegistro').value;

    const newRegistro = {
        esqInfAntes,
        meioInfAntes,
        dirInfAntes,
        esqInfDepois,
        meioInfDepois,
        dirInfDepois,
        esqSupAntes,
        meioSupAntes,
        dirSupAntes,
        esqSupDepois,
        meioSupDepois,
        dirSupDepois,
        comentario,
        dataRegistro
    };

    facaRegistros.unshift(newRegistro);
    updateFacaRegistrosList();
    saveFacaRegistrosToLocalStorage();
}

// Adiciona a função ao escopo global
window.facaPage = {
    loadFacaRegistrosFromLocalStorage: loadFacaRegistrosFromLocalStorage
};