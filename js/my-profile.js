document.addEventListener("DOMContentLoaded", function(){
    var user = localStorage.getItem("usuario")

    if (user){
        var usuario = JSON.parse(user);

        if(usuario[0].picture){
            document.getElementById("picture").innerHTML = `<img  id="menuImg" src="`+usuario[0].picture+`" width="150" height="150" class="zoom rounded-circle"></img>`
            
        }
        if (usuario[0].givenName){
            document.getElementById("name").setAttribute("value", usuario[0].givenName)
        }
        if (usuario[0].family_name){
            document.getElementById("lastName").setAttribute("value", usuario[0].lastName)
        }
        if (usuario[0].email){
            document.getElementById("email").setAttribute("value", usuario[0].email)
        }
    }

})


