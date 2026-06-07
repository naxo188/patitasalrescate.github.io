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
const subirFoto = document.getElementById("subirFoto");

if (subirFoto) {

    subirFoto.addEventListener("change", function () {

        const archivo = this.files[0];

        if (archivo) {

            const lector = new FileReader();

            lector.onload = function (e) {

                document.getElementById("fotoPerfil").src =
                    e.target.result;

            }

            lector.readAsDataURL(archivo);

        }

    });

}
function cambiarPlan(tipo) {

    const mensualBtn =
        document.getElementById("mensualBtn");

    const anualBtn =
        document.getElementById("anualBtn");

    const precioPro =
        document.getElementById("precioPro");

    const precioPremium =
        document.getElementById("precioPremium");

    mensualBtn.classList.remove("activo");
    anualBtn.classList.remove("activo");

    if (tipo === "mensual") {

        mensualBtn.classList.add("activo");

        precioPro.innerHTML =
            "$4.990/mes";

        precioPremium.innerHTML =
            "$9.990/mes";

    } else {

        anualBtn.classList.add("activo");

        precioPro.innerHTML =
            "$41.916/año";

        precioPremium.innerHTML =
            "$83.916/año";

    }

}