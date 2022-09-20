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
    document.getElementById("Peugeot208").addEventListener("click", function() {
            localStorage.setItem("ProID", 50924);
            window.location = "product-info.html"
        });
    document.getElementById("BMX").addEventListener("click", function() {
            localStorage.setItem("ProID", 50744);
            window.location = "product-info.html"
        });
    document.getElementById("PS5").addEventListener("click", function() {
            localStorage.setItem("ProID", 50743);
            window.location = "product-info.html"
        });
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
}

