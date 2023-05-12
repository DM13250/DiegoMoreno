let menuVisible = false;
document.addEventListener("DOMContentLoaded", async function() {
    //Variable para el menu
    var faBars = document.querySelector(".fa-bars");
    var faX = document.querySelector(".fa-x");
    var aside = document.querySelector("aside");
    var asideA = document.getElementsByClassName("aFooter");

    // Eliminar el atributo 'novalidate' del formulario
    $('#contactoForm').removeAttr('novalidate');

    faBars.addEventListener("click", function() {
        aside.classList.remove("menu-tablet");
        faX.classList.remove("menu-tablet");
        faBars.classList.add("menu-tablet");
    });
    faX.addEventListener("click", function() {
        faBars.classList.remove("menu-tablet");
        faX.classList.add("menu-tablet");
        aside.classList.add("menu-tablet");
    });
    var asideAList = document.getElementsByClassName("aFooter");
    for (var i = 0; i < asideAList.length; i++) {
        asideAList[i].addEventListener("click", function() {
            faBars.classList.remove("menu-tablet");
            faX.classList.add("menu-tablet");
            aside.classList.add("menu-tablet");
        });
    }
    var floatingButtonContainer = document.querySelector('.floating-button-div');
    var scrollY = window.scrollY;
});
function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("drupal");
        habilidades[3].classList.add("wordpress");
        habilidades[4].classList.add("angular");
        habilidades[5].classList.add("C");
        habilidades[6].classList.add("comunicacion");
        habilidades[7].classList.add("trabajo");
        habilidades[8].classList.add("creatividad");
        habilidades[9].classList.add("dedicacion");
    }
}
window.onscroll = function(){
    efectoHabilidades();
}
