function mostrarPantalla(id) {

    document.querySelectorAll(".pantalla")
        .forEach(pantalla => {
            pantalla.classList.remove("activa");
        });

    document
        .getElementById(id)
        .classList.add("activa");
}

function seleccionarAnimal(elemento) {

    document.querySelectorAll(".animal-card")
        .forEach(card => {
            card.classList.remove("selected");
        });

    elemento.classList.add("selected");
}

function seleccionarUrgencia(elemento) {

    document.querySelectorAll(".urgencia-card")
        .forEach(card => {
            card.classList.remove("selected-urgencia");
        });

    elemento.classList.add("selected-urgencia");
}

function enviarReporte() {

    alert(
        "✅ Reporte enviado correctamente.\n\nGracias por ayudar a los animales."
    );

    mostrarPantalla("inicio");
}
