var modalImag = [];

window.addEventListener('load', function(){ 
   
    fetch(PRODUCT_INFO_URL+ localStorage.getItem("ProID") +EXT_TYPE)
    .then(re => re.json())
    .then(data =>{
        let img = data.images;        
        // Funcion que escribe la informacion del producto en el html

      let  datos =`

                  <div class="single-product-details">
                    <h2><b>`+data.name+`</b></h2>
                    <p class="product-description mt-20" style="color:green"><b>`+data.soldCount+` vendidos</b></p>
                    <h5 class="product-price"><b>`+data.currency+` `+data.cost+`</b></h5><br>
                    <p class="product-description mt-20">`+data.description+`</p>
                    <div class="product-category" style="color:grey"> Categoria: <b>`+data.category+`</b></div><br>
                    <div class="text-center" 
                    <div ><button type="button" class="zoom btn btn-outline-dark"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>  Añadir al carrito</button><a href="" style="background-color:black; color:white" class="zoom btn"><b>Comprar</b></a></div>
                    </div>
                    </div>
                
        `
        // Utilizamos un bucle for para cargar las imagenes al carrusel
        // Se escriven los botones en la variable bton y las imagenes en la varible cargaImagenes
        // Tambien utilizamos la variable active para activar(mostrar como primera imagen) la primera imagen que se carge 
        // luego del primer bucle la active nos da un valor vacio, para que solo quede una sola imagen activada 
    let cargaImagenes = ""
    let boton =""
    let active = "active"
     for(let i=0 ; i<img.length ;i++){

        let imagen = img[i];
        modalImag.push(imagen);

        cargaImagenes += `
        <div onclick="modalImagenes(`+i+`)" class="carousel-item `+active+`">
        <img src="`+imagen+`" class="d-block w-100" alt="..." type="button"></div>`
        boton += `
        <button type="button" class="`+active+`" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="`+i+`" aria-label="Slide `+i+1+`"></button>`
        active = "" 
    }
    let dat = data.relatedProducts;
    let rel = "";
    for(let i=0 ; i< dat.length; i++){
        let relacionado = dat[i];

        rel += `
        <div class="zoom col-md-4 card cursor-active list-group-item-actio" onclick="setProID(`+relacionado.id+`)">
            <div class="product-item card h-100">
                <div class="product-thumb">
                    <img class="card-img-top" src="`+relacionado.image+`" alt="product-img" />
                </div>
            <div class="product-content text-center">
                <br>
                <h4>`+relacionado.name+`</h4>
            </div>
            </div>
        </div>
`
    }
     console.log(modalImag)
    document.getElementById("dato").innerHTML = datos;
    document.getElementById("rela").innerHTML= rel;
    document.getElementById("bot").innerHTML = boton;
    document.getElementById("carr").innerHTML = cargaImagenes;
    })
    })
    
    function setProID(id) {
        localStorage.setItem("ProID", id);
        window.location = "product-info.html"
    }

  
   //---------------------- Comentarios ----------------------------------

   let contenedor = document.getElementById("contenedor");
   let item = document.getElementById("item");
   let btnNuevoComent = document.getElementById("agregar");
   // Recibe lo guardado en el LocalStorage
   var guardado = JSON.parse(localStorage.getItem(localStorage.getItem("ProID")));
   var estre = 0
   var usuario = localStorage.getItem("usuario")

   
   // Verifica si existen datos y carga los comentarios en caso de que existan
    function cargarLocal(){
        // verifica que existan datos en el localStorage 
    // Si existen llama a la funcion escribirComentario() para escribirlo en el html
       if (guardado != null) {
        escribirComentario(guardado);

        }
   // En caso de que no existan comentarios crea un Array vacio
        else {
          guardado = [];
        }

    }

   window.addEventListener('load', function(){ 

    // Carga los comentario desde la API mediante el uso del Fech
    // y llama a la funcion escribirComentario() para escribirlo en el html
    fetch(PRODUCT_INFO_COMMENTS_URL+localStorage.getItem("ProID")+EXT_TYPE)
        .then(re => re.json())
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


   // Carga el comentario al Array
   btnNuevoComent.addEventListener("click", function () {

        // Nos da la fecha y hora 
        var today = new Date();
        var fecha = today.toISOString().split('T')[0] +" "+ today.toLocaleTimeString();


        //anno mes dia hora

       // Verificamos que el comentario no este vacio
       if (item.value != '') {

            // crea un array vacio
            // Le cargamos los datos del comentario ingresado
            // Escribimos en el html mediante la funcion escribirComentario()
            // volvemos a vaciar el array para un nuevo comentario
           coment=[]
           coment.push({description:item.value, dateTime:fecha, score:estre, user:usuario});
           escribirComentario(coment);
           coment=[];

           // Cargamos los datos del comentario ingresado al array "guardado"
           // Cargamos el array al localStorage con la KEY del producto
           // y vaciamos el campo del comentario 
           guardado.push({description:item.value, dateTime:fecha, score:estre, user:usuario});
           localStorage.setItem(localStorage.getItem("ProID"), JSON.stringify(guardado));
           item.value = "";
       }
       // Si es vacía le agregamos el placeholder de invalida
       else {
           item.setAttribute("placeholder", "Escribe un comentario");
           item.className = "error form-control";
       }
   });
});

//-------------Funciones extras para comentarios-----------------

// Funcion que carga el numero de estrellas desde el html

function cantEstrellas(num){
    estre= num;
}


// Funcion que devuelve el html de estrellas dependiendo la cantedad que halla 
function estrellas(num){
    var estrellas = ""
    for(let i=0 ; i< num; i++){
    estrellas += `<span class="fa fa-star checked"></span>`
    }
    for(let i=0 ; i< 5- num; i++){
    estrellas += `<span class="fa fa-star"></span>`
    }
    return(estrellas)
}

// Funcion que escribe los comentarios en el html tomando un array 
function escribirComentario(data){

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

//----------------------Modal Imagenes----------------------
function modalImagenes(act){
document.getElementById("bot").style.display = "none";

var modal = document.getElementById("myModal");
var modalImg = document.getElementById("carruselModal");

// Bucle que escribe el carrucel del modal 
var carru = ""
    for(let i=0 ; i< modalImag.length; i++){
        let imag = modalImag[i];
        let active ="";

        if (i== act){ active= "active"};
        carru += `
        <div class="carousel-item `+active+`">
            <img src="`+imag+`" class="d-block w-100" alt="...">
        </div>`;
    }
    // muestra el modal y escribe las imagenes
  modal.style.display = "block";
  modalImg.innerHTML = carru;

  // Boton cerrar modal
var span = document.getElementsByClassName("close")[0];

// Funcion que al darle click a cerrar esconde el modal
span.onclick = function() {
  modal.style.display = "none";
  document.getElementById("bot").style.display = "flex";

}}
