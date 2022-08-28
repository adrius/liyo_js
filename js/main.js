

//INICIO

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




//SELECCIÓN DE PRODUCTO

function selectArt(){
    alert('A continuación seleccioná el artículo que deseas adquirir')
    let articles
    do{
        articles = parseInt(prompt('Seleccioná un artículo \n1- Ilustraciones 🖼 \n2- Remeras 👕, \n3- Stickers 👾, \n4- Gorras🧢 '));
    }while(articles!=1 && articles!=2 && articles!=3 && articles!=4)
    
switch(articles){
    case 1:
    return "Ilustraciones 🖼 ";
    case 2:
    return 'Remeras 👕';
    case 3:
    return 'Stickers 👾 ';
    case 4:
    return 'Gorras🧢 ';
   } 
}

//COMPRA

function importArticle(articles){
    if(articles==="Ilustraciones 🖼 "){
        return 1000;
    }
    else if(articles==='Remeras 👕'){
        return 1500;
    } 
    else if(articles==='Stickers 👾 '){
        return 500;
    } 
    else if(articles==='Gorras🧢 '){
        return 900;
    }
}

//COBRAR

function payArticle(item, value){
    alert('Estás comprando ' +  item + '\nValor:  $' + value);
    let pay = parseInt(prompt('Ingrese el monto con el que abona'));
    if(pay>value){
        alert('Muchas gracias!' + '\nSu vuelto es $ ' + (pay - value) +'\nVUELVA PRONTOS!');
    }else if(pay==value){
        alert('Gracias por el cambio' +'\nVUELVA PRONTOS!');

    }
    else{ 
        alert('El importe ingresado es insuficiente')
        
    }while(pay<value){
     pay = parseInt(prompt('Por favor ingrese el monto indicado'));
     if(pay>value){
        alert('Muchas gracias!' + '\nSu vuelto es $ ' + (pay - value) +'\nVUELVA PRONTOS!');
    }else if(pay==value){
        alert('Gracias por el cambio' +'\nVUELVA PRONTOS!');

    }
    }
    }

    


//LLAMADOS

registroUsuario();

let myArticle = selectArt();
alert('Seleccionaste ' + myArticle);
let costArticle = importArticle(myArticle);
console.log(costArticle);
payArticle(myArticle, costArticle)