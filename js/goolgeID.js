        // function to get response
        function handleCredentialResponse(response) {
            const responsePayload = decodeJwtResponse(response.credential);
            localStorage.setItem("usuario", responsePayload.name);
            localStorage.setItem("imag", responsePayload.picture);

            window.open("index.html","_self");

        }

        window.onload = function () {
            google.accounts.id.initialize({
                // replace your client id below
                client_id: "594088268717-r5jh7p81ufh2dtdojt8744o48t5n23av.apps.googleusercontent.com",
                callback: handleCredentialResponse,
                auto_select: true,
                auto: true
            });
            google.accounts.id.renderButton(
                document.getElementById("google-button"),
                { theme: "filled_blue", size: "medium", width: '200' }  // customization attributes
            );
            // also display the One Tap dialog on right side
            // important for auto login
            google.accounts.id.prompt(); 
        }

        // function to decode the response.credential
        function decodeJwtResponse(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }

        
