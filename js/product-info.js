function cargarTitulo(){

    fetch(PRODUCT_INFO_URL+ localStorage.getItem("ProID") +EXT_TYPE)
    .then(re => re.json())
    .then(data =>{
        let img = data.images;        
        
      let  datos =`

                  <div class="single-product-details">
                    <h2>`+data.name+`</h2>
                    <h3 class="product-price">`+data.currency+` `+data.cost+`</h3>
                    <p class="product-description mt-20">`+data.description+`</p>
                    <div class="product-category"> Categoria:`+data.category+`</div>
                    <div class="text-center"><a href="" class="btn btn-primary ">Comprar</a></div>
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
        console.log(active)
        active = "" 
    }
    let dat = data.relatedProducts;
    let rel = "";
    for(let i=0 ; i< dat.length; i++){
        let relacionado = dat[i];

        rel += `
        <div class="col-md-5">
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
     
     console.log(dat.length)
    document.getElementById("dato").innerHTML = datos;
    document.getElementById("rela").innerHTML= rel;
    document.getElementById("bot").innerHTML = boton;
    document.getElementById("carr").innerHTML = cargaImagenes;
    })
    }
    
    cargarTitulo()
