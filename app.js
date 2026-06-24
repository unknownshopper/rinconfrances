var ingredientesDisponibles = [

    // Dulces
    {nombre:"Nutella",precio:15,categoria:"dulce"},
    {nombre:"Lechera",precio:8,categoria:"dulce"},
    {nombre:"Chocolate",precio:10,categoria:"dulce"},
    {nombre:"Oreo",precio:12,categoria:"dulce"},
    {nombre:"Mermelada",precio:10,categoria:"dulce"},
    {nombre:"Fresa",precio:10,categoria:"dulce"},
    {nombre:"Plátano",precio:10,categoria:"dulce"},
    {nombre:"Mango",precio:12,categoria:"dulce"},
    {nombre:"Nuez",precio:15,categoria:"dulce"},

    // Salados
    {nombre:"Philadelphia",precio:15,categoria:"salado"},
    {nombre:"Queso Crema",precio:12,categoria:"salado"},
    {nombre:"Sirloin",precio:35,categoria:"salado"},
    {nombre:"Habanero",precio:5,categoria:"salado"}

];

var pedido = {
    categoria:null,
    masa:null,
    total:0,
    ingredientes:[]
};

function mostrar(id){

    document
        .querySelectorAll(".pantalla")
        .forEach(p=>p.classList.remove("activa"));

    document
        .getElementById(id)
        .classList.add("activa");
}

function seleccionarCategoria(categoria){

    pedido.categoria = categoria;

    mostrar("masa");
}

function seleccionarMasa(nombre,precio){

    pedido.masa = nombre;
    pedido.total = precio;

    mostrar("ingredientes");

    cargarIngredientes();
    actualizarResumen();
}

function cargarIngredientes(){

    var grid =
        document.getElementById("ingredientesGrid");

    grid.innerHTML = "";

    for (var idx = 0; idx < ingredientesDisponibles.length; idx++) {
        (function (item) {

            var div =
                document.createElement("div");

            div.className =
                "ingrediente " + item.categoria;

            var badge =
                item.categoria === "dulce"
                ? "badge badge-dulce"
                : "badge badge-salado";

            div.innerHTML =
                "<h3>" + item.nombre + "</h3>" +
                "<div class=\"precio\">$" + item.precio + "</div>" +
                "<span class=\"" + badge + "\">" + item.categoria.toUpperCase() + "</span>";

            div.onclick = function () {

                div.classList.toggle("activo");

                var existeIndex = -1;
                for (var i = 0; i < pedido.ingredientes.length; i++) {
                    if (pedido.ingredientes[i].nombre === item.nombre) {
                        existeIndex = i;
                        break;
                    }
                }

                if (existeIndex !== -1) {
                    pedido.ingredientes.splice(existeIndex, 1);
                    pedido.total -= item.precio;
                } else {
                    pedido.ingredientes.push(item);
                    pedido.total += item.precio;
                }

                actualizarResumen();
            };

            grid.appendChild(div);
        })(ingredientesDisponibles[idx]);
    }
}

function actualizarResumen(){

    var resumen =
        document.getElementById("resumen");

    resumen.innerHTML =
        "<p><strong>Masa:</strong> " + pedido.masa + "</p>";

    for (var i = 0; i < pedido.ingredientes.length; i++) {
        var item = pedido.ingredientes[i];
        resumen.innerHTML +=
            "<p>✔ " + item.nombre + "</p>";
    }

    document.getElementById("total")
        .textContent = "$" + pedido.total;
}

function confirmarPedido(){

    var pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos.push({
        fecha: new Date().toLocaleString(),
        categoria: pedido.categoria,
        masa: pedido.masa,
        total: pedido.total,
        ingredientes: pedido.ingredientes
    });

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );

    alert("Pedido registrado");

    location.reload();
}

document.addEventListener("click", function (e) {
  var btn = (e.target && e.target.closest) ? e.target.closest(".btn-crepa") : null;
  if (btn) {
    console.log("Crepa seleccionada");
    seleccionarCategoria("crepa");
  }
});