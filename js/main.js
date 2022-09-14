//INICIO
// Declaracion de la clase
class Articulo {
    constructor(id, nombre, precio, detalles,icono, tipo){
        this.id=id;
        this.name= nombre;
        this.price=precio;
        this.details=detalles;
        this.icon= icono;
        this.type= tipo;
    }
}

//Variables para el pago
let PagoTotal=0;
let CantTotal=0;

//creo array vacio, para despues ingresar los articulos
const stock = [];

//Objeto de clase articulo
const remera = new Articulo(1,'Remera', 1000, 'Remera cuello redondo, color blanco', '👕', 'prenda');
const gorra= new Articulo(2,'Gorra', 1500, 'Gorra de 5 paneles', '🧢', 'accesorio');
const ilustracion= new Articulo(3, 'Cuadro', 3000, 'cuadro de Ilustración', '🖼 ', 'otros');
const pin= new Articulo(4,'Pin', 200, 'Pin metalcio', '👾', 'otros');
stock.push(remera);
stock.push(gorra);
stock.push(ilustracion);
stock.push(pin);

const containerDiv= document.querySelector(".container");
const carritoDiv = document.querySelector(".carrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Listado
function Listado(){
    Articulo.forEach(element=>{
        containerDiv.innerHTML += `<div style="background-color:yellow;">
        <h4>${element.name}</h4>
        <h3>${element.price}</h3>
        <button class="btnCarrito" id="btn-agregar${element.id}">Agregar</button>
        </div>`
    })
}



function MostrarError(mensaje) {
    const elementAreaDeMensajes = document.getElementById("area-de-mensajes");
    elementAreaDeMensajes.innerText = mensaje;
}


//COBRAR

function payArticle(){
    if (PagoTotal <= 0)
    {
        MostrarError("No hay nada para pagar!");
        return;
    }


    // Meter en una variable el monto con el que el usuario paga
    const elementoPagaCon = document.getElementById("pagaConCantidad");
    const pagaCon = elementoPagaCon.valueAsNumber;

    // Calcular el cambio
    const cambio = pagaCon - PagoTotal;

    if (cambio < 0) {
        MostrarError("No te alcanza!");
        return;
    }

    // tomar el nombre del usuario
    const elementNombre = document.getElementById("nombre");


    // Mostrar el cambio en pantalla
    const elementoCambio = document.getElementById("cambio");
    elementoCambio.innerText = `$ ${cambio}, gracias por su compra, ${elementNombre.value}`;

    
   
}

    
// Agrego elementos dinamicamente a la tabla de producto
function MostrarProductos() {


    const productos = document.getElementById("productos");

   
    for( let i = 0; i < stock.length; i++) {

        const articulo = stock[i];


        // La fila (TR)
        let fila = document.createElement("tr");

        // Las celdas de datos (TD)
        let columnaProducto = document.createElement("td");
        let columnaTipo = document.createElement("td");
        let columnaArticulo = document.createElement("td");
        let columnaPrecio = document.createElement("td");


        columnaProducto.innerHTML = (i + 1).toString();
        columnaProducto.className = "articulo-celda";

        columnaTipo.innerHTML = articulo.type;
        columnaTipo.className = "articulo-celda";

        columnaArticulo.innerHTML = articulo.details;
        columnaArticulo.className = "articulo-celda";
 
        columnaPrecio.innerHTML = articulo.price;
        columnaPrecio.className = "articulo-celda";

        fila.className = "articulo-fila";
        fila.append(columnaProducto);
        fila.append(columnaTipo);
        fila.append(columnaArticulo);
        fila.append(columnaPrecio);
        
        productos.append(fila);
    }
}


function teclaPresionada(e) {

    if (e.code == "Enter") {
        const elegirProducto = document.getElementById("elegir-producto");
        const seleccion = elegirProducto.valueAsNumber - 1;
        if (seleccion > stock.length)
        {
            MostrarError("los productos van de 1 a " + String(stock.length));
            return;
        }

        const articuloSeleccionado = stock[seleccion];
        agregarAlCarrito(articuloSeleccionado);
        PagoTotal += articuloSeleccionado.price;
        ActualizarTotal(PagoTotal);
    }
}

// agrega un articulo al carrito

function agregarAlCarrito(Articulo){
    let existente = carrito.some(art=>art.id === Articulo.id);
    if (existente === false){
     Articulo.cantidad = 1;
     carrito.push(Articulo);
    }
    else{
        let artFind = carrito.find(art => art.id === Articulo.id);
        artFind.cantidad++;
    }
    console.log(carrito);
    mostrarCarrito();

}
function mostrarCarrito(){
    carritoDiv.innerHTML="";
    carrito.forEach(art => {
        carritoDiv.innerHTML += `<div>
        <h4>${art.name}</h4>
        <h3>Cantidad: ${art.cantidad}</h3>
        <p>$ ${art.price}</p>
        <button class="btnCarrito" id="btn-borrar${art.name}">Borrar</button>
        <button class="btnCarrito" id="btn-borrarUnidad${art.name}">Borrar x1</button>
        </div>`
    })
    agregarEventoBorrarArticulo();
    RecalcularTotal();
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

function RecalcularTotal() {
    PagoTotal = 0;
    for (const articulo of carrito) {
        PagoTotal += articulo.cantidad * articulo.price;
    }
    ActualizarTotal(PagoTotal);
}


function agregarEventoBorrarArticulo(){

    carrito.forEach(articulo=>{
        document.querySelector(`#btn-borrar${articulo.name}`).addEventListener("click", ()=>{
            let indice= carrito.findIndex(element=>element.id===articulo.id);
            carrito.splice(indice,1);
            mostrarCarrito();
        })
    })


    carrito.forEach(articulo=>{
        document.querySelector(`#btn-borrarUnidad${articulo.name}`).addEventListener("click", ()=>{
            let indice= carrito.findIndex(element=>element.id===articulo.id);
            carrito[indice].cantidad = carrito[indice].cantidad - 1;
            if (carrito[indice].cantidad == 0)
            {
                carrito.splice(indice,1);
            }

            mostrarCarrito();
        })
    })
}
mostrarCarrito();

//

function ActualizarTotal(nuevoTotal) {
    const elementoTotal = document.getElementById("total");
    elementoTotal.innerHTML = `$ ${nuevoTotal}`;
}

//LLAMADOS

MostrarProductos();

const elegirProducto = document.getElementById("elegir-producto");
elegirProducto.addEventListener("keypress", teclaPresionada );


const botonPagar = document.getElementById("pagar");
botonPagar.addEventListener("click", payArticle );


