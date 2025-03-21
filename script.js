const scriptURL = "https://script.google.com/macros/s/AKfycbzhjBfzL-MD528Wj9fjvU3AihIGiHeVQ5lmS0azsJwuH73xz6HX7SV8o_RUhQt_xhw8/exec "; // Reemplaza con la URL de tu Google Apps Script

document.getElementById("pedidoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const data = {
        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        producto: document.getElementById("producto").value
    };

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(() => {
        alert("Pedido registrado!");
        cargarPedidos();
    })
    .catch(error => console.error("Error:", error));
});

function cargarPedidos() {
    fetch(scriptURL)
    .then(response => response.json())
    .then(data => {
        let tbody = document.querySelector("#tablaPedidos tbody");
        tbody.innerHTML = "";
        data.slice(1).forEach(row => {
            let tr = document.createElement("tr");
            row.forEach(cell => {
                let td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    });
}

function buscarPedido() {
    let filtro = document.getElementById("buscar").value.toLowerCase();
    let filas = document.querySelectorAll("#tablaPedidos tbody tr");

    filas.forEach(fila => {
        let texto = fila.innerText.toLowerCase();
        fila.style.display = texto.includes(filtro) ? "" : "none";
    });
}

cargarPedidos();