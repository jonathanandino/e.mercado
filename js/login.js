
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
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    localStorage.setItem("usuario",profile.getName())
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
