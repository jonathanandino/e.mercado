let productData = [];
let modalImag = [];

window.addEventListener('load', function(){ // Funcion que escribe la informacion del producto en el html
   
    fetch(PRODUCT_INFO_URL+ localStorage.getItem("ProID") +EXT_TYPE)
    .then(re => re.json())
    .then(data =>{
        let img = data.images;
        productData = data        

      let  datos =`
                  <div class="single-product-details">
                    <h2><b>`+data.name+`</b></h2>
                    <p class="product-description mt-20" style="color:green"><b>`+data.soldCount+` vendidos</b></p>
                    <h5 class="product-price"><b>`+data.currency+` `+data.cost+`</b></h5><br>
                    <p class="product-description mt-20">`+data.description+`</p>
                    <div class="product-category" style="color:grey"> Categoria: <b>`+data.category+`</b></div><br>
                    <?div>
                    `

    let cargaImagenes = ""  // Se escriven las imagenes en la varible cargaImagenes
    let boton =""          // Se escriven los botones en la variable bton  
    let active = "active" // Utilizamos la variable active para activar(mostrar como primera imagen) la primera imagen que se carge 

     for(let i=0 ; i<img.length ;i++){ // Utilizamos un bucle for para cargar las imagenes al carrusel
        let imagen = img[i];
        modalImag.push(imagen);

        cargaImagenes += `
        <div onclick="modalImagenes(`+i+`)" class="carousel-item `+active+`">
        <img src="`+imagen+`" class="d-block w-100" alt="..." type="button"></div>`

        boton += `
        <button type="button" class="`+active+`" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="`+i+`" aria-label="Slide `+i+1+`"></button>`
        active = "" // luego del primer bucle la active nos da un valor vacio, para que solo quede una sola imagen activada 
    }

    let dat = data.relatedProducts;
    let rel = "";

    for(let i=0 ; i< dat.length; i++){ // bucle que escribe los productos relacionados
        let relacionado = dat[i];

        rel += `
            <div class="zoom col-md-4 card cursor-active list-group-item-actio" onclick="setProID(`+relacionado.id+`)">
                <div class="product-item card h-100">
                    <div class="product-thumb">
                        <img class="card-img-top" src="`+relacionado.image+`" alt="product-img" />
                    </div>
                    <div class="product-content text-center"><br>
                        <h4>`+relacionado.name+`</h4>
                    </div>
                </div>
            </div>
            `
    }
    document.getElementById("dato").innerHTML = datos;
    document.getElementById("rela").innerHTML= rel;
    document.getElementById("bot").innerHTML = boton;
    document.getElementById("carr").innerHTML = cargaImagenes;
    })
    }) 

  
   ///////////////////////////// Comentarios /////////////////////////////////

   let contenedor = document.getElementById("contenedor");
   let item = document.getElementById("item");
   let btnNuevoComent = document.getElementById("agregar");
   var guardado = JSON.parse(localStorage.getItem("comentarios"));   // Recibe lo guardado en el LocalStorage
   var usuario = JSON.parse(localStorage.getItem("usuario"));
   
    function cargarLocal(){                              // Verifica si existen datos y carga los comentarios en caso de que existan
       if (guardado != null) {                          // verifica que existan datos en el localStorage 
            for (let i = 0; i< guardado.length; i++){  // Si existen llama a un bucle for que verifica los datos dentro del array 
                var dato = guardado[i];
                if(dato.id == localStorage.getItem("ProID")){// Si existe un id que coincida con el id del producto, llama a la funcion esctibirComentario() 
                    escribirComentario(dato.comentario);    // Pasandole por parameto los comentarios de ese producto 
                }
            }
        }else {
          guardado = [];   // En caso de que no existan comentarios crea un Array vacio
        }
    }

   window.addEventListener('load', function(){ 

    fetch(PRODUCT_INFO_COMMENTS_URL+localStorage.getItem("ProID")+EXT_TYPE) // Carga los comentario desde la API mediante el uso del Fech
        .then(re => re.json())                                             // y llama a la funcion escribirComentario() para escribirlo en el html
        .then(data =>{
            
            let result = [];

                result = data.sort(function(b, a) {
                    let aCount = parseInt(a.dateTime);
                    let bCount = parseInt(b.dateTime);
    
                        if ( aCount > bCount ){ return -1; }
                        if ( aCount < bCount ){ return 1; }
                    return 0;
                });

            escribirComentario(result);
            cargarLocal();
        })

   btnNuevoComent.addEventListener("click", function () {    // Carga el comentario al Array
        
        var today = new Date();  // Nos da la fecha y hora 
        var fecha = today.toISOString().split('T')[0] +" "+ today.toLocaleTimeString(); //anno - mes - dia - hora
       
        if (item.value != '') { // Verificamos que el comentario no este vacío
           coment=[]                                                                                 // crea un array vacio
           coment.push({description:item.value, dateTime:fecha, score:estrella, user:usuario[0].name});// Le cargamos los datos del comentario ingresado
           escribirComentario(coment);                                                             // Escribimos en el html mediante la funcion escribirComentario()
           coment=[];                                                                             // volvemos a vaciar el array para un nuevo comentario

           comen = [];           
           comen.push({description:item.value, dateTime:fecha, score:estrella, user:usuario[0].name});// Cargamos los datos del comentario ingresado al array "comen"    
           guardado.push({id:localStorage.getItem("ProID"),comentario:comen})                     // Cargamos el array comen al array guardado con un id (el mismo id del producto)
           localStorage.setItem("comentarios", JSON.stringify(guardado));                        // Cargamos el array al localStorage con la KEY del comentarios       
           item.value = "";                                                                     // y vaciamos el campo del comentario
       }else {                                                                                 // Si es vacía le agregamos el placeholder de invalida
           item.setAttribute("placeholder", "Escribe un comentario");
           item.className = "error form-control";
       }
   });
});

function estrellas(num){ // Función  que devuelve el html de estrellas dependiendo la cantedad que halla 
    var estrellas = "";
    for(let i=0 ; i< num; i++){
    estrellas += `<span class="fa fa-star checked"></span>`
    }for(let i=0 ; i< 5- num; i++){
    estrellas += `<span class="fa fa-star"></span>`
    }
    return(estrellas)
}

function escribirComentario(data){ // Función que devuelve el html de estrellas dependiendo la cantidad que haya allí 
    let htmlComentsProducts =""
    for(let i=0 ; i< data.length; i++){
        let dato = data[i];
    
        htmlComentsProducts +=`
                                <div class="card">
                                    <div class="card">    
                                        <div class="card-header">
                                             `+estrellas(dato.score)+` - <b> `+dato.user+`</b> - `+dato.dateTime+` - 
                                        </div>
                                        <div class="card-body">   
                                            <p class="card-text">`+dato.description+`</p>
                                        </div>
                                    </div
                                </div>
                                `
    } document.getElementById("contenedor").innerHTML += htmlComentsProducts
}

function modalImagenes(act){  //----------------------Modal Imagenes----------------------
    document.getElementById("bot").style.display = "none";
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("carruselModal");
    var carru = "";

    for(let i=0 ; i< modalImag.length; i++){ // Bucle que escribe el carrusel del modal 
        let imag = modalImag[i];
        let active ="";

        if (i== act){ active= "active"};
            carru += `
                <div class="carousel-item `+active+`">
                    <img src="`+imag+`" class="d-block w-100" alt="...">
                </div>`;
    }

    modal.style.display = "block";     // muestra el modal y escribe las imágenes 
    modalImg.innerHTML = carru;

    var span = document.getElementsByClassName("close")[0];   // botón cerrar modal

    span.onclick = function() { // función que al darle clics a cerrar esconde el modal
                                modal.style.display = "none";
                                document.getElementById("bot").style.display = "flex";
                            }
}

//---------------------------- Añadir a carrito---------------------------------

// función que carga los elementos al carrito en el localStorage 
// Al evento click en añadir al carrito, creamos un array vacío
// (if) Si existe una key "cart" en el localStorage carga los datos en ella al array creado
// Tomamos los datos del articulo a cargar (incluyendo la cantidad seleccionada "cant") y lo cargamos al array "cart" con un formato (el mismo formato de la API)
// Y subimos el array al localStorage.
// también agregamos un botón de aviso de la cantidad de artículos agregados(para eso utilizamos el contador), en el usuario y en la opción de "Mi carrito"

var contador = 0
document.getElementById("cart").addEventListener("click", function(){

    var cart = [];
    contador += 1
    document.getElementById("miCarrito").innerHTML =  `<span class="badge">`+contador+`</span>`;
    document.getElementById("picture").innerHTML += `<span class="badge">`+contador+`</span>`;
    var cant = document.getElementById("cant").value;

    if (localStorage.getItem("cart")){
        cartLocal= JSON.parse(localStorage.getItem("cart"))
        cart = cartLocal;
    }

    cart.push({ id: localStorage.getItem("ProID"), name: productData.name, count: cant, unitCost: productData.cost, currency: productData.currency, image: productData.images[0]});
    localStorage.setItem("cart", JSON.stringify(cart));

})
