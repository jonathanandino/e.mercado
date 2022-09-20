function comprobarValores() {
    
    var usuario = document.ingreso.floatingInput.value;
    var contra = document.ingreso.floatingPassword.value;

    var alert = document.getElementById("alert");
    var impUsuario = document.getElementById("floatingInput");
    var impContrasena = document.getElementById("floatingPassword")

// Funcion que activa el mensaje de alerta 
    function error(mensaje){
        document.getElementById("mensaje").innerHTML= mensaje;

        impContrasena.classList.add("alert-danger");
        impUsuario.classList.add("alert-danger");
        impContrasena.classList.add("border-danger");
        impUsuario.classList.add("border-danger");
        alert.classList.add("show");

    }

    // Verificador de campos vacios
    if(usuario.length > 0 && contra.length > 0){    

        // Verifica que exista un correo electronico
        emailCheck = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (emailCheck.test(usuario)){  

        // Si existe un correo tomo el nombre(antes del @) y lo sube al localStorage
        // Y redirecciona al index    
        var email_analizado = /^([^]+)@(\w+).(\w+)$/.exec(usuario);
        var [,nombre,servidor,dominio] = email_analizado;
        user = [];
        user.push({name:nombre});
        localStorage.setItem("usuario", JSON.stringify(user));
        window.location.href = "index.html"

        // Si no existe correo electronico muestra la alerta de error
        }else{
            error("Introduzca un <strong>Correo electrónico</strong> valido");
            impContrasena.classList.remove("alert-danger");
            impContrasena.classList.remove("border-danger");

        }

        // Verifica que el imput de correo no este vacio 
    }else if(usuario.length > 0){
        error("Introduzca un <strong>contraseña</strong>");
        impUsuario.classList.remove("alert-danger");
        impUsuario.classList.remove("border-danger");

        // Verifica que el imput de contrasenna no este vacio 
    }else if(contra.length > 0){
        error("Introduzca un <strong>Correo electrónico</strong>");
        impContrasena.classList.remove("alert-danger");
        impContrasena.classList.remove("border-danger");

    }else{
        error("Complete los campos <strong>vacíos</sgrong>")
    }

    document.getElementById("close").addEventListener('click', function(){
        alert.classList.remove("show");
    
    })

};

// salida de google 

function SalidaDeGoogle(){
    if(localStorage.setItem("usuario") == "visitante"){
        signOut()
    }
     
    function signOut() {
    google.accounts.id.disableAutoSelect();
    location.reload();
    }
}