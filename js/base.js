//INICIO
// Declaracion de la clase
class Articulo {
    constructor(id, name, price, details,icon, type, image){
        this.id=id;
        this.name= name;
        this.price=price;
        this.details=details;
        this.icon= icon;
        this.type= type;
        this.image=image;
    }
}
//creo array vacio, para despues ingresar los articulos
let stock = [];

//Objeto de clase articulo
// const remera = new Articulo(1,'Remera', 1000, 'Remera cuello redondo, color blanco', '👕', 'prenda', './assets/img/illus/chicaDj.jpeg');
// const gorra= new Articulo(2,'Gorra', 1500, 'Gorra de 5 paneles', '🧢', 'accesorio','./assets/img/illus/chicaDj.jpeg');
// const ilustracion= new Articulo(3, 'Cuadro', 3000, 'cuadro de Ilustración', '🖼 ', 'otros', './assets/img/illus/chicaDj.jpeg');
// const pin= new Articulo(4,'Pin', 200, 'Pin metalcio', '👾', 'otros', './assets/img/illus/chicaDj.jpeg');
// stock.push(remera);
// stock.push(gorra);
// stock.push(ilustracion);
// stock.push(pin);

// console.log(JSON.stringify(stock));


/* fetch("./js/data.json")
.then(response=>response.json())
.then(data=>{
    stock = data;
    render();
}) */

const respuesta = async ()=>{
    const response = await fetch ('./js/data.json');
    const data = await response.json();
    stock = data;
    render();

}
respuesta()
class ItemCarrito {
    constructor(id, name, quantity, price){
        this.id=id;
        this.name=name;
        this.quantity= quantity;
        this.price=price;
    }
}

// Leer el carrito desde la base de datos
// si la base de datos (el storage) no tiene carrito salvado
// entonces inicializar el carrito con un array vacio = []
let carrito = LeerCarrito() || [];


// "la base de datos"
// funciones que lean y graben el storage
function LeerCarrito() {
    // lee la variable carrito del storage y la devuelve
    return JSON.parse(localStorage.getItem("carrito"));
}

function SalvarCarrito(carrito) {
    // salva en el storage el carrito que recibe como argumento
    localStorage.setItem("carrito",JSON.stringify(carrito));
}