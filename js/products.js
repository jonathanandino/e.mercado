//array donde se cargarán los datos recibidos:
let productsArray = [];


function setProID(id) {
    localStorage.setItem("ProID", id);
    window.location = "product-info.html"
}
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(){

   

    let htmlContentToAppend = "";

    for(let i = 0; i < currentProductsArray.length; i++) { 
        let productos = currentProductsArray[i]; 

        if (((minCount == undefined) || (minCount != undefined && parseInt(productos.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(productos.cost) <= maxCount))){
        
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

    } }



/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en productsArray.
-Por último, se llama a showProductsList() pasándole por parámetro productsArray.

*/
document.addEventListener("DOMContentLoaded", function (e){
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentProducts = resultObj.data;
            currentProductsArray = currentProducts.products
            showProductsList();  
     }
    });
});

//------------------- Carga la Titulo y imagen del titulo -------------------------
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





// ----------------------funcion de filro alfabetico--------------------------- 
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}



/////

function sortAndShowProduct(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;
    if(productsArray != undefined){
        currentProductsArray = productsArray.products;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}




    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProduct(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });



    //------------------buscador-------------------------


function buscador() {
    let inp = document.getElementById("Search").value
    inp=inp.toLowerCase();
    let x = document.getElementsByClassName('list-group-item-actio');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(inp)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}