document.addEventListener('DOMContentLoaded', () => {
    const addItemBtn = document.getElementById('add-item-btn');
    const itemList = document.getElementById('item-list');
    const totalApcElement = document.getElementById('total-apc');
    const downloadBtn = document.getElementById('download-btn');

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
            <label for="name">Name:</label>
            <input type="text" class="name" placeholder="Enter Name">
            <label for="cost-price">Delivery Price:</label>
            <input type="number" class="cost-price" placeholder="Enter Cost Price">
            <label for="marked-price">Cost Price:</label>
            <input type="number" class="marked-price" placeholder="Enter Marked Price">
            <button class="delete-btn">Delete</button>
        `;
        itemList.appendChild(newItem);

        newItem.querySelector('.name').addEventListener('input', calculateAPC);
        newItem.querySelector('.cost-price').addEventListener('input', calculateAPC);
        newItem.querySelector('.marked-price').addEventListener('input', calculateAPC);
        newItem.querySelector('.delete-btn').addEventListener('click', () => {
            newItem.remove();
            calculateAPC();
        });
    }

    function downloadExcel() {
        const items = document.querySelectorAll('.item');
        const data = [];
        items.forEach(item => {
            const name = item.querySelector('.name').value || "";
            const costPrice = parseFloat(item.querySelector('.cost-price').value) || 0;
            const markedPrice = parseFloat(item.querySelector('.marked-price').value) || 0;
            const apc = (markedPrice - costPrice).toFixed(2);

            data.push({
                "Name": name,
                "Delivery Price": costPrice,
                "Cost Price": markedPrice,
                "APC": apc
            });
        });

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "APC Values");

        XLSX.writeFile(wb, "APC_Calculator_Values.xlsx");
    }

    addItemBtn.addEventListener('click', addItem);
    downloadBtn.addEventListener('click', downloadExcel);

    document.querySelectorAll('.name, .cost-price, .marked-price').forEach(input => {
        input.addEventListener('input', calculateAPC);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            button.parentElement.remove();
            calculateAPC();
        });
    });
});
