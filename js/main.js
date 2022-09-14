

//INICIO
// clase siempre en singular
class Articulo {
    constructor(nombre, precio, detalles,icono, tipo){
        this.name= nombre;
        this.price=precio;
        this.details=detalles;
        this.icon= icono;
        this.type= tipo;
    }
}
//creo array vacio, para despues ingresar los articulos
//Variables para el pago
let PagoTotal=0;
let CantTotal=0;


const stock = [];
//Objeto de clase articulo
const remera = new Articulo('remera', 1000, 'Remera cuello redondo, color blanco', '👕', 'prenda');
const gorra= new Articulo('gorra', 1500, 'Gorra de 5 paneles', '🧢', 'accesorio');
const ilustracion= new Articulo('cuadro', 3000, 'cuadro de Ilustración', '🖼 ', 'otros');
const pin= new Articulo('Pin', 200, 'Pin metalcio', '👾', 'otros');
stock.push(remera);
stock.push(gorra);
stock.push(ilustracion);
stock.push(pin);
console.log(stock);




//filtro por precio

function mayorQue(n){
    return (art)=> art.price > n;
}

let mayorQue1000 = mayorQue(1000);

let articulosMayores1000 = stock.filter( mayorQue1000 );
console.log(articulosMayores1000);



// INGRESO DE USUARIO

function registroUsuario (){ 
    alert('Hola! a continuación por favor ingresá tu nombre');  
    let usuario = prompt('Ingresá tu nombre');
    while((!isNaN(usuario))){
    alert('Debes ingresar un nombre en caracteres');
    usuario = prompt('Ingresá nuevamente tu nombre');
}
    alert('Bienvenido ' + usuario + ' cómo estas?');
}




//Selección de categoría de producto.

function filtradoPorTipo(tipo) {
    return (articulo)=> articulo.type.toUpperCase() == tipo.toUpperCase();
}


//SELECCIÓN DE PRODUCTO

function selectArt(){

    let seleccionTipo = prompt('Elija una categoría:\n-Prenda \n-Accesorio \n-Otros')
    
    let filtrado = filtradoPorTipo(seleccionTipo);
    let stockFiltrado = stock.filter(filtrado);


    let listadearticulos = '0- Para salir\n';
    for( let i = 0; i < stockFiltrado.length; i++) {
        listadearticulos = listadearticulos + (i + 1) + ' ' + stockFiltrado[i].icon + ' ' + stockFiltrado[i].name +'\n';
    }
    
    
/*     alert('A continuación seleccioná el artículo que deseas adquirir') */
    let seleccion;
    //let articulos = '1- Ilustraciones 🖼 \n2- Remeras 👕, \n3- Stickers 👾, \n4- Gorras🧢 ';
    do{
        seleccion = parseInt(prompt('A continuación seleccioná el artículo que deseas adquirir\n-Artículos: \n' + listadearticulos));
    }while(seleccion<0 || seleccion>stockFiltrado.length+1)

    const posEnArray = seleccion -1;
    return stockFiltrado[posEnArray];
    

    return posEnArray;
    const articuloSeleccionado = stock[posEnArray];
    return   articuloSeleccionado.name    ;

}

//COMPRA

function importArticle(article){
    return article.price;
}


//iva
const CalcularIva = (monto) => monto * 1.21;


//COBRAR

function payArticle(){
    if (PagoTotal <= 0)
        return;

    alert('Estás comprando ' +  CantTotal + ' artículos \nValor:  $' + PagoTotal);
    let pay = parseInt(prompt('Ingrese el monto con el que abona'));
    if(pay>PagoTotal){
        alert('Muchas gracias!' + '\nSu vuelto es $ ' + (pay - PagoTotal) +'\nVUELVA PRONTOS!');
    }else if(pay==PagoTotal){
        alert('Gracias por el cambio' +'\nVUELVA PRONTOS!');

    }
    else{ 
        alert('El importe ingresado es insuficiente')
        
    }while(pay<PagoTotal){
     pay = parseInt(prompt('Por favor ingrese el monto indicado'));
     if(pay>PagoTotal){
        alert('Muchas gracias!' + '\nSu vuelto es $ ' + (pay - PagoTotal) +'\nVUELVA PRONTOS!');
    }else if(pay==PagoTotal){
        alert('Gracias por el cambio' +'\nVUELVA PRONTOS!');

    }
    }
    }

    


//LLAMADOS

registroUsuario();



let seguircomprando = true;
do {
    //
    let myArticle = selectArt();
    if (myArticle == undefined) {
        seguircomprando = false;
    } else {
        let costArticle = importArticle(myArticle);
        PagoTotal= PagoTotal + CalcularIva(costArticle);
        CantTotal = CantTotal + 1;
    }
} while (seguircomprando);



payArticle();

/////DOM

const h2= document.getElementById('h2');
const parrafo= document.getElementsByClassName('parrafo');
const ul= document.getElementById('lista')

//console.log(h2.innerHtml);
//console.log(parrafo[0].innerText="Creando contenido desde JS");
parrafo[0].innerText="Creando un 2º contenido desde JS";
parrafo[1].innerText="Creando un 3º contenido desde JS";

parrafo[2].innerHTML="Creando un 3º contenido desde JS";
//h2
/* h2.innerText="Marceliyo en JS";
const articulos=["gorra", "remera", "sticker", "ilustracion"] */


for (const articulo of stock) {
    let li=document.createElement('li');
    li.innerHTML=`<div class="card">
    <h3>${articulo.name}</h3>
    <p>${articulo.price}</p>
    <p>${articulo.details}</p> </div>` 
    ul.append(li)
    
}

