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

// Escribe en el menú dependiendo del usuario - (si - usuario == x) muestra usuario  
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
              var picture = `<img  id="menuImg" src="`+usuario[0].picture+`" width="40" height="40" class="zoom rounded-circle">`
              document.getElementById("picture").innerHTML = picture;
              if(document.getElementById("usuario1")){
                document.getElementById("picture1").innerHTML = picture;
                }
            }else{
              var picture = `
              <li class="" type="button" aria-expanded="false" id="menuImg">
                <svg xmlns="http://www.w3.org/2000/svg" style="color:white; margin: 2px" width="35" height="35" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
              </li>`
            document.getElementById("picture").innerHTML += picture;
            if(document.getElementById("usuario1")){
              document.getElementById("picture1").innerHTML = picture;
              }
            }
          var Bienvenida = '<div style="color:white">Usuario: <b>'+usuario[0].name+'</b> </div>'
   
          document.getElementById("usuario").innerHTML = Bienvenida;
          
          if(document.getElementById("usuarioMedia")){
            document.getElementById("usuarioMedia").innerHTML = Bienvenida;
            }


      }
      // redirecciona al login en caso de que usuario == null
      }else{
      window.open("login.html","_self");
  }
}
// función para cerrar sección quedando el usuario == visitante
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

function setProID(id) {
  localStorage.setItem("ProID", id);
  window.location = "product-info.html"
}


function myFunction(x) {

  var div1 = document.getElementById("usuarioLg");
  var div2 = document.getElementById("usuarioMg");

  var user = document.getElementById("usuario");


  if (x.matches) { // If media query matches
    div2.appendChild(user)
    mostrarNavbar( window.matchMedia("(max-width: 991px)").matches)
 }else{
    div1.appendChild(user)
    mostrarNavbar( window.matchMedia("(max-width: 991px)").matches)
 }
}

var x = window.matchMedia("(max-width: 9991px)")

myFunction(x) // Call listener function at run time
x.addListener(myFunction)



function mostrarNavbar(consigna){
  if (consigna) {
    document.getElementById("navbar").classList.add("navbar1");
    document.getElementById("searches").classList.replace("searchEffectInit","searchEffect")

  } else{
    document.getElementById("navbar").classList.remove("navbar1");
    document.getElementById("searches").classList.replace("searchEffect","searchEffectInit")
  
  }
}


function busquedaIndex(){ // Cambia de color la navbar al escribir en el buscador
  busca();               // Y llama a la función busca()
  scrollFunction()
}
function scrollFunction() { // cambia de color la navbar haciendo scroll

  let input = document.getElementById('searches').value;
  mostrarNavbar(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 || input.length > 0 || window.matchMedia("(max-width: 991px)").matches);    
}