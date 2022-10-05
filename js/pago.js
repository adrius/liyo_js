function render() {
    //
    refrescarCarrito();
}

//Seccion pago
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const botonPago= document.getElementById("btn__pago");
botonPago.addEventListener('click',(e)=>{
    
    const nombre = document.getElementById("nombre").value,
          celular = document.getElementById("celular").value,
          correoElectronico = document.getElementById("correoElectronico").value,
          visa = document.getElementById("visa").checked,
          master =  document.getElementById("master").checked,
          american = document.getElementById("american").checked,
          numeroTarjeta = document.getElementById("numeroTarjeta").value;

          //console.log(nombre, celular,correoElectronico,visa, master, american,numeroTarjeta);
        if(nombre===""){
            Swal.fire('Debe ingresar un nombre');
            return;   
        }
        if(celular===""){
            Swal.fire('Debe ingresar un número de celular');
            return;   
        }
        if(correoElectronico==="" || validateEmail(correoElectronico)==null){
            Swal.fire('Debe ingresar un correo');
            return;   
        }
        if(numeroTarjeta===""){
            Swal.fire('Debe ingresar un número de tarjeta');
            return;   
        }
        if(!(visa || master || american)){
            Swal.fire('Seleccione una tarjeta');
            return; 
        }
        Swal.fire(`Muchas gracias,${nombre}`)
        .then((resalt)=>{
            carrito = [];
            SalvarCarrito(carrito);
            //history.back();
            window.location.href="index.html";
        });

       /*  setTimeout(() => {
            carrito = [];
            SalvarCarrito(carrito);
            //history.back();
            window.location.href="index.html";
        }, 3000); */
        
});
