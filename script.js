// Recuperando dados do armazenamento local se existirem
let stock = JSON.parse(localStorage.getItem('stock')) || [];

function addItem() {
    const itemInput = document.getElementById('item');
    const quantityInput = document.getElementById('quantity');
    
    const item = itemInput.value.trim();
    const quantity = parseInt(quantityInput.value);

    if (item && quantity && quantity > 0) {
        const index = stock.findIndex(i => i.item === item);
        if (index !== -1) {
            stock[index].quantity += quantity;
        } else {
            stock.push({ item, quantity });
        }
        saveToLocalStorage();
        displayStock();
    } else {
        alert('Por favor, insira um nome e uma quantidade válida.');
    }

    itemInput.value = '';
    quantityInput.value = '';
}

function removeItem(index) {
    stock.splice(index, 1);
    saveToLocalStorage();
    displayStock();
}

function displayStock() {
    const stockList = document.getElementById('stock-list');
    stockList.innerHTML = '';
    stock.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('item');
        listItem.innerHTML = `
            <span>${item.item} - ${item.quantity}</span>
            <div>
                <button onclick="editItem(${index})">Editar</button>
                <button onclick="removeItem(${index})">Remover</button>
            </div>
        `;
        stockList.appendChild(listItem);
    });
}

function editItem(index) {
    const newName = prompt('Digite o novo nome do item:');
    if (newName !== null) {
        const newQuantity = parseInt(prompt('Digite a nova quantidade:'));
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            stock[index].item = newName.trim();
            stock[index].quantity = newQuantity;
            saveToLocalStorage();
            displayStock();
        } else {
            alert('Por favor, insira uma quantidade válida.');
        }
    }
}

function saveToLocalStorage() {
    localStorage.setItem('stock', JSON.stringify(stock));
}

// Exibindo o estoque inicialmente ao carregar a página
displayStock();