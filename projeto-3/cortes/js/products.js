let products = [];

// Funções para a página de produtos
function loadProductsFromLocalStorage() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
        updateProductsList();
    }
}

function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function updateProductsList() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    products.slice(0, 10).forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.className = 'history-item';
        productItem.innerHTML = `
            <h4>Produto ${index + 1}</h4>
            <p><strong>Produto:</strong> ${product.produto}</p>
            <p><strong>Repetição:</strong> ${product.repeticao}</p>
            <p><strong>Corte:</strong> ${product.corte}</p>
            <p><strong>Perímetro:</strong> ${product.perimetro}</p>
            <p><strong>Velocidade:</strong> ${product.velocidade}</p>
            <p><strong>Chagrim:</strong> ${product.chagrim}</p>
            <p><strong>Observações:</strong> ${product.observacoes}</p>
            <p><small>Data: ${product.dataRegistro}</small></p>
        `;
        historyList.appendChild(productItem);
    });
}

function salvarProduto() {
    const produto = document.getElementById('produto').value;
    const repeticao = document.getElementById('repeticao').value;
    const corte = document.getElementById('corte').value;
    const perimetro = document.getElementById('perimetro').value;
    const velocidade = document.getElementById('velocidade').value;
    const chagrim = document.getElementById('chagrim').value;
    const observacoes = document.getElementById('observacoes').value;
    const dataRegistro = document.getElementById('dataRegistro').value;

    const newProduct = {
        produto,
        repeticao,
        corte,
        perimetro,
        velocidade,
        chagrim,
        observacoes,
        dataRegistro
    };

    products.unshift(newProduct);
    updateProductsList();
    saveProductsToLocalStorage();
}

// Adiciona a função ao escopo global
window.productsPage = {
    loadProductsFromLocalStorage: loadProductsFromLocalStorage
};

// Carrega os produtos ao iniciar
loadProductsFromLocalStorage();