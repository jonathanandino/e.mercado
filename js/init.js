const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// Escribe en el menu dependiendo del usuario - (si - usuario == x) muestra usuario  
function cargarInicio(){
  let botonInicio = "";

  if (localStorage.getItem("usuario")){
      if (localStorage.getItem("usuario")== "visitante" ){

          window.location.href= "login.html"
          botonInicio += '<a class=" btn-primary" href="login.html" role="button">Iniciar Secion</a>'
          document.getElementById("usuario").innerHTML = botonInicio;  
          
      }else{

          var Bienvenida = '<a class="binevenida" >Usuario: <b>'+localStorage.getItem("usuario")+'</b> </a>'
          botonInicio +=  '<a class="btn dropdown-item " onclick="salirUsuario()" >Salir</a>'        
          document.getElementById("inicio").innerHTML = botonInicio;
          document.getElementById("usuario").innerHTML = Bienvenida; 

      }
      // redirecciona al login en caso que usuario == null
  }else{
      window.open("login.html","_self");
  }
}
// funcion para cerrar seccion quedando el usuario == visitante
  function salirUsuario(){
      let user= 'visitante';

      localStorage.setItem("usuario", user);
      location.reload();
  }
// salir de google
  function signOut() {
      google.accounts.id.disableAutoSelect();
      location.reload();
}