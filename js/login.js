
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
    //localStorage.setItem("usuario",profile.getName());
    alert("bienvenido"); 
    Windows.location.href("index.html");
  }
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
