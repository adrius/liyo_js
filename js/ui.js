function dibujarProductos(productos){
    // Tomar una referencia del elemento contenedor
    // El elemento contenedor se usa para poder agregarle los nuevos elementos que vamos a crear
    // Crear tantos elementos como productos haya en el array de stock[]
    const contenedor = document.getElementById('contProducto');

    // Iterar los productos de a uno
    for (const articulo of productos) {

        // crear un elemento vacio de tipo DIV
        const el = document.createElement('div');
        
        // Desestructurar el objeto en varias variables
        const {id, name, price, details, icon, type, image} = articulo;

        // crear el template del producto (individual) remplazando con los valores del articulo
        const templateProducto=`   
        <div class="card" style="width: 18rem;">
            <img src="${image}" class="card-img-top " alt="...">
            <div class="card-body ">
                <p class="card-text">${name} ${icon}</p>
                <p class="card-text"> ${details} </p>
                <p class="card-text">$ ${price} </p>
                <input id="contador${id}" class="cantidad" type="number"  value="1" min="0" max="100" step="1">
                
                <button id="agregar${id}" type="button" class="btn btn-dark">Agregar</button>
            </div>
        </div>`;

        // asignar el HTML del template, al elemento que se va a agregar
        el.innerHTML=templateProducto;

        // agregar el elemento a su contenedor
        contenedor.append(el);

        // Escuchar el evento CLICK del boton "agregar"
        const boton=document.getElementById(`agregar${id}` );
        boton.addEventListener("click",()=>{
            // cada vez que el usuario clickea en el boton "Agregar" del producto
            agregarArticulo(articulo)
        });
    }
    
}

function agregarArticulo(artElegido){
    const cantidadEl=document.getElementById(`contador${artElegido.id}`);
    const cantidad= cantidadEl.valueAsNumber;
    let itemCarrito= carrito.find((item)=> item.id==artElegido.id);
    if(itemCarrito==undefined){
        itemCarrito= new ItemCarrito(artElegido.id, artElegido.name,0,artElegido.price);
        carrito.push(itemCarrito);
    }
    itemCarrito.quantity+= cantidad;
    refrescarContador();
    
    // Guardo en la base
    SalvarCarrito(carrito);
}

function refrescarContador(){
    let cantidadTotal=0;

    for (const item of carrito) { 
        cantidadTotal += item.quantity;
    }
    const alertaEl=document.getElementById("alerta__compra");
    alertaEl.innerHTML=cantidadTotal;
}

function refrescarCarrito(){
    const contenedor=document.getElementById("contCarrito");
    //Limpia el contenedor
    contenedor.innerHTML="";
    let cantidadTotal=0;
    let costoTotal=0;

    for (const item of carrito) { 

        cantidadTotal += item.quantity;
        costoTotal += (item.quantity * item.price);

        // crear un elemento vacio de tipo DIV
        const el = document.createElement('div');
        el.className = "listado_compra";

        
        const templateLineaCarrito=` <div class="card__compra ">
        <p class="card-text">${item.name}</p>
        </div>   
        <div class="card__compra">
        <input type="number" id="cantidad${item.id}" min="0" max="100" step="1" value="${item.quantity}">
        </div>
        <div class="card__compra">
        <p>${item.price}</p>
        </div> 
        <div class="card__compra">
        <p>${item.quantity*item.price}</p>
        </div> 
        <div class="card__compra">
        <button id="borrarLinea${item.id}" type="button" class="btn-close " aria-label="Close"></button>
        </div>`;

        // asignar el HTML del template, al elemento que vamos a agregar
        el.innerHTML=templateLineaCarrito;

        // agregar el elemento a su contenedor
        contenedor.append(el);

        // Escuchar el evento change del input "cantidad<X>"
        const cantidadEl=document.getElementById(`cantidad${item.id}` );
        cantidadEl.addEventListener("change", (e)=>{
            // este codigo se llama cada vez que el usuario cambia la cantidad del carrito
            // tengo que encontrar el carrito[], el articulo que el usuario esta modificando
            // y actualizar la cantidad

            // Busco la posicion en el carrito (el array) que el usuario esta intentando modificar
            const itemAModificar=carrito.find( (itemEnCarrito) => itemEnCarrito.id == item.id );

            // Remplazo la cantidad en el carrito con el valor que el usuario puso en el <input>
            itemAModificar.quantity = e.target.valueAsNumber;

            // Redibujo el carrito
            refrescarCarrito();

            // Salvo en la base de datos
            SalvarCarrito(carrito);
        });


        // Escuchar el evento click del boton "borrarLinea<X>"
        const borrarLineaEl=document.getElementById(`borrarLinea${item.id}` );
        borrarLineaEl.addEventListener("click", (e)=>{
            // este codigo se llama cada vez que el usuario clickea el boton BORRAR
            // de la linea del carrito

            // Busco la posicion en el carrito (el array) que el usuario esta intentando borrar
            const itemABorrar=carrito.findIndex( (itemEnCarrito) => itemEnCarrito.id == item.id );

            // Borro esa posicion del carrito (el array)
            carrito.splice(itemABorrar, 1);

            // redibujo la pantalla
            refrescarCarrito();

            // Salvo en la base de datos
            SalvarCarrito(carrito);
        });

        
        
    }

    const alertaEl=document.getElementById("precio_total");
    alertaEl.innerHTML=costoTotal;
    

}


