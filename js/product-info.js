function cargarTitulo(){

    fetch(PRODUCT_INFO_URL+ localStorage.getItem("ProID") +EXT_TYPE)
    .then(re => re.json())
    .then(data =>{
        let img = data.images;        
        
      let  datos =`

                  <div class="single-product-details">
                    <h2><b>`+data.name+`</b></h2>
                    <p class="product-description mt-20" style="color:green"><b>`+data.soldCount+` vendidos</b></p>
                    <h5 class="product-price"><b>`+data.currency+` `+data.cost+`</b></h5><br>
                    <p class="product-description mt-20">`+data.description+`</p>
                    <div class="product-category" style="color:grey"> Categoria: <b>`+data.category+`</b></div><br>
                    <div class="text-center" 
                    <div ><button type="button" class="btn btn-outline-dark"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>  Añadir al carrito</button><a href="" style="background-color:black; color:white" class="btn"><b>Comprar</b></a></div>
                    </div>
                    </div>
                
        `

    let cargaImagenes = ""
    let boton =""
    let active = "active"
     for(let i=0 ; i<img.length ;i++){
        let imagen = img[i];
        cargaImagenes += `
        <div class="carousel-item `+active+`">
        <img src="`+imagen+`" class="d-block w-100" alt="..."></div>`
        boton += `
        <button type="button" class="`+active+`" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="`+i+`" aria-label="Slide `+i+1+`"></button>`
        active = "" 
    }
    let dat = data.relatedProducts;
    let rel = "";
    for(let i=0 ; i< dat.length; i++){
        let relacionado = dat[i];

        rel += `
        <div class="col-md-5 card cursor-active list-group-item-actio" onclick="setProID(`+relacionado.id+`)">
            <div class="product-item card h-100">
                <div class="product-thumb">
                    <img class="card-img-top" src="`+relacionado.image+`" alt="product-img" />
                </div>
            <div class="product-content text-center">
                <br>
                <h4>`+relacionado.name+`</h4>
            </div>
            </div>
        </div>`
    }
     
    document.getElementById("dato").innerHTML = datos;
    document.getElementById("rela").innerHTML= rel;
    document.getElementById("bot").innerHTML = boton;
    document.getElementById("carr").innerHTML = cargaImagenes;
    })
    }
    
    function setProID(id) {
        localStorage.setItem("ProID", id);
        window.location = "product-info.html"
    }
    cargarTitulo()
