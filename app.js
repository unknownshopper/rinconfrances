const ingredientesDisponibles = [

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

let pedido = {
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

    const grid =
        document.getElementById("ingredientesGrid");

    grid.innerHTML = "";

    ingredientesDisponibles.forEach(item=>{

        const div =
            document.createElement("div");

        div.className =
            `ingrediente ${item.categoria}`;

        const badge =
            item.categoria === "dulce"
            ? "badge badge-dulce"
            : "badge badge-salado";

        div.innerHTML = `
            <h3>${item.nombre}</h3>

            <div class="precio">
                $${item.precio}
            </div>

            <span class="${badge}">
                ${item.categoria.toUpperCase()}
            </span>
        `;

        div.onclick = ()=>{

            div.classList.toggle("activo");

            const existe =
                pedido.ingredientes.find(
                    i=>i.nombre===item.nombre
                );

            if(existe){

                pedido.ingredientes =
                    pedido.ingredientes.filter(
                        i=>i.nombre!==item.nombre
                    );

                pedido.total -= item.precio;

            }else{

                pedido.ingredientes.push(item);

                pedido.total += item.precio;
            }

            actualizarResumen();
        };

        grid.appendChild(div);
    });
}

function actualizarResumen(){

    const resumen =
        document.getElementById("resumen");

    resumen.innerHTML = `
        <p><strong>Masa:</strong> ${pedido.masa}</p>
    `;

    pedido.ingredientes.forEach(item=>{

        resumen.innerHTML += `
            <p>✔ ${item.nombre}</p>
        `;
    });

    document.getElementById("total")
        .textContent = `$${pedido.total}`;
}

function confirmarPedido(){

    const pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos.push({
        fecha:new Date().toLocaleString(),
        ...pedido
    });

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );

    alert("Pedido registrado");

    location.reload();
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest?.(".btn-crepa");
  if (btn) {
    console.log("Crepa seleccionada");
    seleccionarCategoria("crepa");
  }
});