let tipoDeEnvio = [{name: "Premium", costo: 0.15},{name: "Express", costo: 0.07},{name:"Standar", costo: 0.05}]; // Opciones de envió con sus valores 
let cartArray = [];            // En este array se alojan todo los artículos, los de la API y los del almacenamiento local 
let cantidadArticulosJson= 0;  // Variable que indica la cantidad de productos alojados en la API
let tipoDePago; 

// Función que carga los articulos del almacenamiento local y de la API a la variable cartArray
// Y la cantidad de artículos en la API en la variable cantidadArticulosJson
// Luego verifica que exista el carrito en el localSorage, si es así carga los artículos al mismo array (cartArray)
// Y llamamos a la función showProductosCart().
function cargarArray(){ 
    getJSONData(CART_INFO_URL +25801+ EXT_TYPE).then(function(resultObj){
        
        if (resultObj.status === "ok"){                                
            cartProducts = resultObj.data; 
            cartArray = cartProducts.articles;
            cantidadArticulosJson = cartArray.length; 

            if (localStorage.getItem("cart")){                     
                cartLocal= JSON.parse(localStorage.getItem("cart"))
                
                for(let i=0 ; i< cartLocal.length; i++){
                    let product = cartLocal[i];
                    cartArray.push(product);
                }
            }
        showProductsCart();                             
        }
    });
}

// Función que escribe un div por artículo en cart.html
// Tomamos el número de posición en la lista [i] para identificar los div 
function showProductsCart(){                
    let htmlContentToAppend = ""

    for(let i=0 ; i< cartArray.length; i++){
        let product = cartArray[i];
            htmlContentToAppend += `
                <div id="articulo`+i+`" class="card mb-3" style=";margin: auto">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="`+product.image+`"  onclick="setProID(`+product.id+`)" class="img-fluid rounded-start cursor-active" alt="...">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body">
                                <h5 onclick="setProID(`+product.id+`)" class="cursor-active card-title">`+product.name+`</h5>
                                <p class="card-text">precio unitario `+product.currency+" "+product.unitCost+`</p>
                                <div class="input-group input-number-group">
                                    <p> Cantidad:
                                        <input id="carntProduct`+i+`" onchange="subTotal(`+i+`)" class="input-number" type="number" value="`+product.count+`" min="1" max="1000" style="margin-left: 10px;height: 30px; width: 45px;">
                                    </p>
                                </div>
                            </div> 
                        </div>
                        <div class="col-md-3" >
                            <button onclick="removerArticulo(`+i+`)" type="button" style="float: right; margin-block: 14px; margin-right: 15px" class="btn-close row" aria-label="Close"></button>
                            <div class="row" style="float: left; margin:10px; margin-block: 14px">
                                <h5>`+product.currency+` <span id="total`+i+`">`+product.unitCost * product.count+`</span></h5>
                            </div>    
                        </div>
                    </div>
                </div>`
    }

    document.getElementById("cart").innerHTML= htmlContentToAppend;
    total()
}

// Función que calcula es subtotal de los artículos pasándole por parámetro el número de posición del artículo en la lista
// Se calcula el nombre del id (el cual es compuesto) del objeto que queremos tomar con las variables 
// Y calcula la cantidad total y escribe en el div total[i] 
function subTotal(i){
    let imputCant = `carntProduct`+i;
    let divTotal = `total`+i;
    let cantidad = document.getElementById(imputCant).value;
    cartArray[i].count = cantidad;
    document.getElementById(divTotal).innerHTML= cartArray[i].unitCost * cantidad;
    total();
}

// Función que elimina los artículos (llamándola al evento onclick en el botón x de los artículos)
// Mediante el if verificamos que el articulo a eliminar no pertenezca a un elemento del JSON
// Toma como parámetro el identificador (la posición en la que se encuentra en la lista) y elimina ese elemento de la misma
// Vuelve a subir la lista modificada al localStorage
// Por último borramos el contenido de del articulo eliminado y escribimos un aviso para avisarle al usuario que el artículo fue removido
function removerArticulo(i){  
    cartArray.splice(i,1);

    if(i>= cantidadArticulosJson){
        cartArray.splice(0,cantidadArticulosJson)
        localStorage.setItem("cart", JSON.stringify(cartArray));

        document.getElementById("avisoRemovido").classList.remove("d-none");
        setTimeout(function() {
            document.getElementById("avisoRemovido").classList.add("d-none");
        },1500);
       

    }
    cargarArray()
    total()
}

// Función que calcula el total de todos los artículos, el porcentaje de envío y la suma de estos dos.
// Tomamos el valor del envío (corresponde a la ubicación en el array tipoDeEnvio).
// Mediante un bucle for realiza la suma en la variable con el mismo número, y si está en UYU los pasa a dólares
// Y escribimos los datos en los campos correspondiente.
function total(){
    let suma = 0;
    let envio = document.querySelector('input[name="envio"]:checked').value;

    for(const i in cartArray){
        let product = cartArray[i];
        let precioEnDolar = product.unitCost;

        if(product.currency == "UYU"){
            precioEnDolar = precioEnDolar / 42,40;
        }
        suma += precioEnDolar *product.count;
    }

    validarDireccion();
    document.getElementById("subTotal").innerHTML = "USD " + suma.toFixed(2);
    document.getElementById("costoDeEnvio").innerHTML= "USD " + (suma * tipoDeEnvio[envio].costo).toFixed(2);
    document.getElementById("total").innerHTML= "USD " + (suma * (1 + tipoDeEnvio[envio].costo)).toFixed(2);
    document.getElementById("envioVisible").innerHTML= tipoDeEnvio[envio].name;
}

// Función que valida los datos de dirección y los muestra en una miniatura del div completo
function validarDireccion(){
    let imputCalle = document.getElementById("calle").value
    let imputNumero = document.getElementById("numero").value

    if(imputCalle.length > 0 && imputNumero.length > 0){
        let direccionVisible = `
            <p class="text-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg> `+imputCalle+` `+imputNumero+`
            </p>`
        document.getElementById("direccionVisible").innerHTML = direccionVisible
        document.getElementById("infoEnvio").classList.remove("invalid")
    }
}

// Función que valida los inputs de método de pago según selección
function aplicarMetodoDePago(){
    const input1 =document.querySelectorAll('#tarjetaDeCredito input');
    const input2 =document.getElementById("numeroDeCuenta");
    let envio = document.querySelector('input[name="checkedPago"]:checked').value;

    if(envio == 1){
        input1.forEach((input) =>{
        input.disabled = false; 
        })
        input2.disabled = true;
    }if(envio == 2){
        input1.forEach((input) =>{
            input.disabled = true;
        })
        input2.disabled = false;
    }
}

// Función que valida las miniaturas de datos de envío y datos de pago 
function validacion(){
    const inputs =document.querySelectorAll('#formulario input')
    inputs.forEach((input) =>{

        if(!input.value){
            document.getElementById("tipoDeEnvio").classList.add("show")
            document.getElementById("infoEnvio").classList.add("invalid")

        }if(!tipoDePago){
            document.getElementById('cardPago').setAttribute('style', 'border-block-color: red; color: red;')
        }if(tipoDePago){
            document.getElementById('cardPago').setAttribute('style', '')

        }
    })
}

// Al cargar la página llama a la función cargarArray()
document.addEventListener("DOMContentLoaded", function (e){  
    cargarArray()
 })

// Al enviar formulario modal verifica que estén todos los campos completos 
// Y escribe la miniatura según opción seleccionada 
document.getElementById("formularioModal").addEventListener('submit', event => {
    var myModalEl = document.getElementById('formularioModal');
    var modal = bootstrap.Modal.getInstance(myModalEl);
    let envio = document.querySelector('input[name="checkedPago"]:checked').value;

    if (!document.getElementById('formularioModal').checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }else{
        event.preventDefault();
        modal.hide();

        if (envio == 1){
            tipoDePago = envio;
            document.getElementById('pagoVisible').innerHTML = `<a data-bs-toggle="modal" data-bs-target="#formularioModal"><p style="color:green">Tarjeta de Crédito</p></a>`;
            document.getElementById('pagoIcono').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                </svg>`;

        }else if(envio == 2){
            tipoDePago = envio;
            document.getElementById('pagoVisible').innerHTML = `<a data-bs-toggle="modal" data-bs-target="#formularioModal"><p style="color:green">Transferencia Bancaria</p></a>`;
            document.getElementById('pagoIcono').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bank2" viewBox="0 0 16 16">
                    <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916l-7.5-5zM12.375 6v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1H.5z"/>
                </svg>`;
        }
    }
    document.getElementById('formularioModal').classList.add('was-validated');
  })

// Al enviar formulario valida todos los datos 
document.getElementById("formulario").addEventListener('submit', event => {

    validacion();
    if (!document.getElementById('formulario').checkValidity()|| !tipoDePago) {
        event.preventDefault();
        event.stopPropagation();
    }else{
        event.preventDefault();
        document.getElementById("avisoCompra").classList.remove("d-none");
        setTimeout(function() {
            document.getElementById("avisoCompra").classList.add("d-none");
        },2000)
    }
     

    document.getElementById('formulario').classList.add('was-validated');
 ;

  })
