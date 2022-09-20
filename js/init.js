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

          var Bienvenida = '<a class="" >Usuario: <b>'+localStorage.getItem("usuario")+'</b> </a>'
          botonInicio +=  `
          <a class="btn dropdown-item" onclick="salirUsuario()" >        <svg xmlns="http://www.w3.org/2000/svg" style="color: white; margin: 0px" width="25" height="25" fill="currentColor" class="bi bi-cart3" viewBox="0 0 576 512">
          <path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>         
          </svg>  Cerrar sesión</a>`        
          document.getElementById("inicio").innerHTML = botonInicio;
          document.getElementById("usuario").innerHTML = Bienvenida;
          
          if(document.getElementById("inicio1")){
            document.getElementById("inicio1").innerHTML = botonInicio;
            document.getElementById("usuario1").innerHTML = Bienvenida; 
            }


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