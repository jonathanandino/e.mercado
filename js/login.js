
// Verificador de campos vacios
function comprobarValores() {
    
    var usuario = document.ingreso.floatingInput.value;
    var contra = document.ingreso.floatingPassword.value;
    

    if(usuario.length > 0 && contra.length > 0){
        window.location.href = "index.html"
        localStorage.setItem("usuario", usuario);
    }else{
        alert("Por favor complete los campos")
    }
};

function SalidaDeGoogle(){
    if(localStorage.setItem("usuario") == "visitante"){
        signOut()
    }
     
    function signOut() {
    google.accounts.id.disableAutoSelect();
    location.reload();
    }
}
