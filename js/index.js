document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

// Escribe en el menu dependiendo de la sesion
function cargarInicio(){

    let botonInicio = "";
if (localStorage.getItem("usuario")){
    if (localStorage.getItem("usuario")== "visitante" ){

        window.location.href= "login.html"
        botonInicio += '<a class="btn btn-primary" href="login.html" role="button">Iniciar Secion</a>'
        document.getElementById("inicio").innerHTML = botonInicio;  
        
    }else{
        var Bienvenida = '<a class="binevenida" >Usuario: '+localStorage.getItem("usuario")+' </a>'
        botonInicio +=  '<a class="btn btn-primary" onclick="salirUsuario()" role="button">salir</a>'        
        document.getElementById("inicio").innerHTML = botonInicio;
        document.getElementById("usuario").innerHTML = Bienvenida; 

    }
    // redirecciona al login en caso que el localSronge = null
}else{
    window.open("login.html","_self");
}
}
// funcion para cerrar seccion quedando el usuario como visitante
function salirUsuario(){
    let user= 'visitante'
    localStorage.setItem("usuario", user);
    location.reload();
}
