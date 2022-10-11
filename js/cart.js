let cartArray = []
let cantidadArticulosJson= 0


document.addEventListener("DOMContentLoaded", function (e){               // Al cargar la página llama a getJSONData y carga los datos del Json y lo carga ca cart array 
    getJSONData(CART_INFO_URL +25801+ EXT_TYPE).then(function(resultObj){// Y la cantidad de artículos en la variable cantidadArticulosJson
        if (resultObj.status === "ok"){                                 // Luego verifica que exista el carrito en el localSorage, si es así carga los artículos al mismo array (cartArray)
            cartProducts = resultObj.data; 
            cartArray = cartProducts.articles
            cantidadArticulosJson = cartArray.length 

            if (localStorage.getItem("cart")){                     // Luego verifica que exista el carrito en el localSorage, si es así carga los artículos al mismo array (cartArray)
                cartLocal= JSON.parse(localStorage.getItem("cart"))
                for(let i=0 ; i< cartLocal.length; i++){
                    let product = cartLocal[i];
                        cartArray.push(product);
                }
           }
            showProductsCart();                              // Y llamamos a la función showProductosCart().
        }
    });
})

function showProductsCart(){                // Esta función escribe un div por artículo en cart.html
let htmlContentToAppend = ""               // Tomamos el número de posición en la lista [i] para identificar los div 
    for(let i=0 ; i< cartArray.length; i++){
        let product = cartArray[i];
            htmlContentToAppend += `
            <div id="articulo`+i+`" class="card mb-3" style="max-width: 800px;margin: auto">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="`+product.image+`"  onclick="setProID(`+product.id+`)" class="img-fluid rounded-start cursor-active" alt="...">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <h5 onclick="setProID(`+product.id+`)" class="cursor-active card-title">`+product.name+`</h5>
                                <p class="card-text">precio unitario `+product.currency+" "+product.unitCost+`</p>
                                <div class="input-group input-number-group">
                                    <p> Cantidad:
                                    <input id="carntProduct`+i+`" onchange="subTotal(`+i+`)" class="input-number" type="number" value="`+product.count+`" min="0" max="1000" style="margin-left: 10px;height: 30px; width: 45px;">
                                    <p/>
                                </div>
                            </div> 
                        </div>
                        <div class="col-md-2" >
                            <button onclick="removerArticulo(`+i+`)" type="button" style="float: right; margin-block: 14px; margin-right: 15px" class="btn-close" aria-label="Close"></button>
                            <div style="float: left; margin:10px; margin-block: 14px">
                                <h5>`+product.currency+` <span id="total`+i+`">`+product.unitCost * product.count+`</span></h5>
                            <div>    
                        </div>
                    </div>
                    </div>
            </div>
            </div>`
        }

document.getElementById("cart").innerHTML= htmlContentToAppend
}

//// Función que calcula es subtotal de los artículos pasándole por parámetro el número de posición del artículo en la lista
/// Se calcula el nombre del id (el cual es compuesto) del objeto que queremos tomar con las variables 
// Y calcula la cantidad total y escribe en el div total[i] 
function subTotal(i){
    let imputCant = `carntProduct`+i;
    let divTotal = `total`+i;
    let cantidad = document.getElementById(imputCant).value
    document.getElementById(divTotal).innerHTML= cartArray[i].unitCost * cantidad;
}

////// Función que elimina los artículos (llamándola al evento onclick en el botón x de los artículos)
///// Mediante el if verificamos que el articulo a eliminar no pertenezca a un elemento del JSON
//// Toma como parámetro el identificador (la posición en la que se encuentra en la lista) y elimina ese elemento de la misma
/// Vuelve a subir la lista modificada al localStorage
// Por último borramos el contenido de del articulo eliminado y escribimos un aviso para avisarle al usuario que el artículo fue removido
function removerArticulo(i){  
 if(i>= cantidadArticulosJson){
    cartArray.splice(i,1);
    cartArray.splice(0,cantidadArticulosJson)
    localStorage.setItem("cart", JSON.stringify(cartArray));
    console.log(cartArray)
 }
 let divArticulo = `articulo`+i;
 document.getElementById(divArticulo).innerHTML = `<div class=" alert-danger" role="alert">Este articulo se ha removido de “Mi carrito”</div>`

}