function renderExpenses() {
    let list = document.getElementById("expenseList");
    let arr = JSON.parse(localStorage.getItem("details")) || [];
    list.innerHTML = "";
    arr.forEach((item, index) => {
        let li = document.createElement("li");
        li.className = "expense-item";
        li.classList.add("row", "row-cols-3","justify-content-start","gap-2","m-2")
        
        li.innerHTML = `<p class="">${item.amount} - ${item.category} - ${item.description}</p>
            <button class="editbtn btn btn-secondary col-2">Edit Expense</button>
            <button class="deletebtn btn btn-secondary col-2">Delete Expense</button>`;

        li.querySelector('.deletebtn').addEventListener('click', () => {
            arr.splice(index, 1);
            localStorage.setItem('details', JSON.stringify(arr));
            renderExpenses();
        });

        li.querySelector('.editbtn').addEventListener('click', () => {
            document.getElementById('amount').value = item.amount;
            document.getElementById('category').value = item.category;
            document.getElementById('description').value = item.description;

            arr.splice(index, 1);
            localStorage.setItem('details', JSON.stringify(arr));
            renderExpenses();
        });

        list.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", renderExpenses);

document.getElementById("expenseForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;

    let arr = JSON.parse(localStorage.getItem("details")) || [];
    let n = arr.length;

    arr.push({
        amount: amount,
        category: category,
        description: description,
        n: n
    });

    localStorage.setItem("details", JSON.stringify(arr));
    renderExpenses();
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
});