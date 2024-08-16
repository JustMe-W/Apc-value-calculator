document.addEventListener('DOMContentLoaded', () => {
    const addItemBtn = document.getElementById('add-item-btn');
    const itemList = document.getElementById('item-list');
    const totalApcElement = document.getElementById('total-apc');

    function calculateAPC() {
        let totalApc = 0;
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            const costPrice = parseFloat(item.querySelector('.cost-price').value) || 0;
            const markedPrice = parseFloat(item.querySelector('.marked-price').value) || 0;
            totalApc += (markedPrice - costPrice);
        });
        totalApcElement.textContent = totalApc.toFixed(2);
    }

    function addItem() {
        const newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.innerHTML = `
            <label for="cost-price">Delivery Price:</label>
            <input type="number" class="cost-price" placeholder="Enter Cost Price">
            <label for="marked-price">Cost Price:</label>
            <input type="number" class="marked-price" placeholder="Enter Marked Price">
            <button class="delete-btn">Delete</button>
        `;
        itemList.appendChild(newItem);
        newItem.querySelector('.cost-price').addEventListener('input', calculateAPC);
        newItem.querySelector('.marked-price').addEventListener('input', calculateAPC);
        newItem.querySelector('.delete-btn').addEventListener('click', () => {
            newItem.remove();
            calculateAPC();
        });
    }

    addItemBtn.addEventListener('click', addItem);
    document.querySelectorAll('.cost-price, .marked-price').forEach(input => {
        input.addEventListener('input', calculateAPC);
    });
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            button.parentElement.remove();
            calculateAPC();
        });
    });
});

function convertToNpr() {
    const usdAmount = document.getElementById('usd').value;
    const conversionRate = 134.46;
    const nprAmount = usdAmount * conversionRate;

    document.getElementById('result').innerText = `Equivalent in NPR: रु ${nprAmount.toFixed(2)}`;
}
