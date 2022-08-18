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
        <div onclick="setProID(`+productos.id+`)" class="list-group-item list-group-item-actio cursor-active">             
            <div class="row">
                <div class="col-3" >
                <img src="`+productos.image+`" alt="product image" class="img-thumbnail"></img> 
                </div>

                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                            <h4> `+ productos.name +`</h4> 
                            <p> `+ productos.description +`</p> 
                        </div>
                    <small class="text-muted">` + productos.currency + " "+productos.cost +`</small> 
 
                    </div>
                    </div>

            </div>
                
            </div>
        </div>`
        
        document.getElementById("cat-list-products").innerHTML = htmlContentToAppend;  

    }  
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
            categoriesArray = resultObj.data;
            showProductsList(categoriesArray);
        }
    });
});