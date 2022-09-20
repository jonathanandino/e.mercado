// funcion para obtener respuesta
        function handleCredentialResponse(response) {
            const responsePayload = decodeJwtResponse(response.credential);
            user = [];
            user.push({name:responsePayload.name, picture:responsePayload.picture});
            localStorage.setItem("usuario", JSON.stringify(user));
            window.open("index.html","_self");

        }

        window.onload = function () {
            google.accounts.id.initialize({
                client_id: "594088268717-r5jh7p81ufh2dtdojt8744o48t5n23av.apps.googleusercontent.com",
                callback: handleCredentialResponse,
                auto_select: true,
                auto: true
            });
            google.accounts.id.renderButton(
                document.getElementById("google-button"),
                { theme: "filled_blue", size: "medium", width: '200' } 
            );
            // también muestra el cuadro de diálogo One Tap en el lado derecho
            // importante para el inicio de sesión automático
            google.accounts.id.prompt(); 
        }

            // función para decodificar la response.credential
            function decodeJwtResponse(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }

        