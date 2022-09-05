
let currCategoriesArray = [];
let currProductsArray = [];

// * Funcion que se ejecuta una vez cargue la pagina
// * Carga los productos al array currentProductsArray
// * Y llama a la funcion buscar()

window.addEventListener("load", function(){

    getJSONData(CATEGORIES_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                currCategoriesArray = resultObj.data

                carArray()
            }
        })})

      
        function carArray (){

            for(let i = 0; i < currCategoriesArray.length; i++) { 
                let category = currCategoriesArray[i]; 
                getJSONData(PRODUCTS_URL + category.id + EXT_TYPE).then(function(resultObj){
                if (resultObj.status === "ok"){

                    currentProducts = resultObj.data
                    vur =currentProducts.products
                    
                    currProductsArray.push.apply(currProductsArray,(vur));
            
                }})
                };}


document.getElementById("search").addEventListener("click", ()=> {
    buscador()    
})


function setProID(id) {
    localStorage.setItem("ProID", id);
    window.location = "product-info.html"
}

function showProdList(){

   
    let htmlContentToAppend = "";

    for(let i = 0; i < currProductsArray.length; i++) { 
        let productos = currProductsArray[i]; 

        htmlContentToAppend += `
        <div class="card cursor-active list-group-item-act" onclick="setProID(`+productos.id+`)">
        <img src="`+productos.image+`" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">`+productos.name+`</h5>
          <p class="card-text">`+productos.description+`</p>
          <h4 class="card-text">`+productos.currency+ " " + productos.cost+`</h4>
          <p><small class="text-muted">`+productos.soldCount+` vendidos</small></p>
        </div>
      </div>
    `
    };
    document.getElementById("productss-list-container").innerHTML = htmlContentToAppend;  
} 




// Funcion que realiza la busqueda, ocultando los objetos que no coinciden con la busqueda 
function busca() {
    let input = document.getElementById('searches').value
    input=input.toLowerCase();
 
    if (input.length > 0){
    let x = document.getElementsByClassName('list-group-item-act');
    
            var search = `
            <br>
            <div style="color:gray; margin-left: 8rem"> 
             <h4><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
             <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
           </svg> Resultados de su busqueda: </h4></div>
            <hr>
            <div class="container">
            <div class="row row-cols-1 row-cols-md-3 g-4" id="productss-list-container">
            </div>
             </div> `

        document.getElementById("busqueda").innerHTML = search;
        showProdList()
        document.getElementById("busqueda").style.display="list-item";

        document.getElementById("main").style.display="none";

    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }}else{
        document.getElementById("busqueda").style.display="none";
        document.getElementById("main").style.display="list-item";

    }
}

