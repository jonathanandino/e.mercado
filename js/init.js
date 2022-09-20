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
          var usuario = JSON.parse(localStorage.getItem("usuario"));
            if (usuario[0].picture){
              var picture = `<img src="`+usuario[0].picture+`" width="40" height="40" class="zoom rounded-circle">`
              document.getElementById("picture").innerHTML = picture;
              if(document.getElementById("usuario1")){
                document.getElementById("picture1").innerHTML = picture;
                }
            }else{
              var picture = `
              <li class="zoom" type="button" aria-expanded="false" >
              <svg xmlns="http://www.w3.org/2000/svg" style="color:white; margin: 2px" width="35" height="35" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>
            </li>`
            document.getElementById("picture").innerHTML = picture;
            if(document.getElementById("usuario1")){
              document.getElementById("picture1").innerHTML = picture;
              }
            }
          var Bienvenida = '<a class="" >Usuario: <b>'+usuario[0].name+'</b> </a>'
   
          document.getElementById("usuario").innerHTML = Bienvenida;
          
          if(document.getElementById("usuario1")){
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