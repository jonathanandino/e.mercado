var userLocal = localStorage.getItem("usuario")       
var usuario = JSON.parse(userLocal);

let image = document.getElementById("img")
let name = document.getElementById("name")
let secondName = document.getElementById("secondName")
let lastName = document.getElementById("lastName")
let secondLastName = document.getElementById("secondLastName")
let email = document.getElementById("email")
let numberPhone = document.getElementById("numberPhone")

let picture = "";

// AL iniciar verifica que existan datos en el almacenamiento local
// y comprueba que exista cada dato, si existe lo carga a los inputs correspondientes
// y si existe foto tambien la carga a la variable picture
document.addEventListener("DOMContentLoaded", function(){
       
    if (userLocal){
        if(usuario[0].picture){
            picture = usuario[0].picture
            image.innerHTML = `<img class="perfil" src="`+picture+`"></img>`
        }
        if (usuario[0].givenName){
            name.setAttribute("value", usuario[0].givenName)
        }
        if (usuario[0].secondName){
            secondName.setAttribute("value", usuario[0].secondName)
        }
        if (usuario[0].lastName){
            lastName.setAttribute("value", usuario[0].lastName)
        }
        if (usuario[0].secondLastName){
            secondLastName.setAttribute("value", usuario[0].secondLastName)
        }
        if (usuario[0].email){
            email.setAttribute("value", usuario[0].email)
        }
        if (usuario[0].numberPhone){
            numberPhone.setAttribute("value", usuario[0].numberPhone)
        }
    }
    
// Función que carga los datos en el almacenamiento local
// Toma los datos de los inputs y la imagen que se encuentre en la variable picture
// Luego de cargar todos los datos al array (user) lo sube nuevamente al almacenamiento local
// Y muestra un cartel indicando que los datos se cargaron correctamente
    function saveData() {
        
                let user = []
                user.push({picture:picture, name:(name.value+" " + lastName.value), givenName:name.value,secondName:secondName.value, lastName:lastName.value, secondLastName:secondLastName.value, email:email.value, numberPhone:numberPhone.value});
                localStorage.setItem("usuario", JSON.stringify(user));
                Swal.fire({
                  icon: 'success',
                  title: 'Datos ingresado correctamente',
                })
    }

    // Función que al guardar los datos verifica que los campos con required estén completos
    // Si es así llama a la función saveData() la cual sube los datos al almacenamiento local
    (function () {
        var forms = document.querySelectorAll('.needs-validation')
      
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()

              }else{
                saveData()
                event.preventDefault()
                event.stopPropagation()

              }
      
              form.classList.add('was-validated')
            },)
          })
      })()
})

// Función que codifica la foto a "data base64" 
// al cargar una imagen se ejecuta esta función que carga la imagen a la variable "picture"
// y escribe en el html, luego le agrega la clase "perfil" la cual le da el tama;o y formato a la imagen
function encodeImageFileAsURL() {
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64

        picture= srcData
        var newImage = document.createElement('img');
        newImage.src = srcData;
        newImage.classList.add("perfil");


        document.getElementById("img").innerHTML = newImage.outerHTML ;
      }
      fileReader.readAsDataURL(fileToLoad);
    }
  }
