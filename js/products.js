//array donde se cargarán los datos recibidos:
let categoriesArray = [];


function setProID(id) {
    localStorage.setItem("ProID", id);
    window.location = "product-info.html"
}
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array){
    let htmlContentToAppend = "";

    

    for(let i = 0; i < array.products.length; i++) { 
        let productos = array.products[i];
        
        htmlContentToAppend += `
       
        <div class="card cursor-active list-group-item-actio" onclick="setProID(`+productos.id+`)">
        <img src="`+productos.image+`" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">`+productos.name+`</h5>
          <p class="card-text">`+productos.description+`</p>
          <h4 class="card-text">`+productos.currency+ " " + productos.cost+`</h4>
          <p><small class="text-muted">`+productos.soldCount+` vendidos</small></p>
        </div>
      </div>
    `
    }
        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;  

    }  



/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

*/
document.addEventListener("DOMContentLoaded", function (e){
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
});

// Carga la imagen del titulo
function cargarTitulo(){

fetch(CATEGORIES_URL)
.then(re => re.json())
.then(data =>{
    let nData = localStorage.getItem("catID")
    let htmlTitleProductos =`
    <style> .prod { background: url(`+data[nData-101].imgSrc+`);  
      background-color: grey;
      background-position: center;
      background-repeat: no-repeat;
      background-blend-mode: multiply;
      background-size: cover;
      height: 200px;} </style>
      <h2>`+data[nData-101].name+`</h2>
      <p class="lead">`+data[nData-101].description+`</p>
    `
document.getElementById("prod").innerHTML = htmlTitleProductos
})
}

cargarTitulo()