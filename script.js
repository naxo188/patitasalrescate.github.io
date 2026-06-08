function mostrarPantalla(id) {

    document
        .querySelectorAll(".pantalla")
        .forEach(p => {
            p.classList.remove("activa");
        });

    document
        .getElementById(id)
        .classList.add("activa");

    if (id === "mapa") {
        setTimeout(iniciarMapa, 200);
    }
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
    const mensualBtn = document.getElementById('mensualBtn');
    const anualBtn = document.getElementById('anualBtn');
    const precioPro = document.getElementById('precioPro');
    const precioPremium = document.getElementById('precioPremium');
    const beneficiosPro = document.getElementById('beneficiosPro');
    const beneficiosPremium = document.getElementById('beneficiosPremium');

    mensualBtn.classList.remove('activo');
    anualBtn.classList.remove('activo');

    if (tipo === 'mensual') {
        mensualBtn.classList.add('activo');
        precioPro.innerHTML = '$4.990/mes';
        precioPremium.innerHTML = '$9.990/mes';
        beneficiosPro.innerHTML = `
            <li>✔ Todo lo del plan Básico</li>
            <li>✔ Alertas en tiempo real</li>
            <li>✔ Seguimiento de tus reportes</li>
            <li>✔ Sin publicidad</li>
            <li>✔ Badge "Rescatador Pro"</li>`;
        beneficiosPremium.innerHTML = `
            <li>✔ Todo lo del plan Pro</li>
            <li>✔ Estadísticas avanzadas</li>
            <li>✔ Prioridad máxima en reportes</li>
            <li>✔ Badge "Héroe Animal"</li>
            <li>✔ Certificado de impacto mensual</li>`;
    } else {
        anualBtn.classList.add('activo');
        precioPro.innerHTML = '$41.916/año <small style="font-size:14px;color:#888">($3.493/mes)</small>';
        precioPremium.innerHTML = '$83.916/año <small style="font-size:14px;color:#888">($6.993/mes)</small>';
        beneficiosPro.innerHTML = `
            <li>✔ Todo lo del plan Básico</li>
            <li>✔ Alertas en tiempo real</li>
            <li>✔ Seguimiento de tus reportes</li>
            <li>✔ Sin publicidad</li>
            <li>✔ Badge "Rescatador Pro"</li>
            <li>✔ 2 meses gratis incluidos</li>
            <li>✔ Acceso anticipado a funciones</li>`;
        beneficiosPremium.innerHTML = `
            <li>✔ Todo lo del plan Pro</li>
            <li>✔ Estadísticas avanzadas</li>
            <li>✔ Prioridad máxima en reportes</li>
            <li>✔ Badge "Héroe Animal" exclusivo</li>
            <li>✔ Certificado de impacto mensual</li>
            <li>✔ 2 meses gratis incluidos</li>
            <li>✔ Soporte prioritario</li>`;
    }
}

function filtrarMapa(btn) {

    document
        .querySelectorAll(".filtro")
        .forEach(f => {
            f.classList.remove("activo");
        });

    btn.classList.add("activo");

}
let mapaCargado = false;

function iniciarMapa() {

    if (mapaCargado) return;

    mapaCargado = true;

    const mapa = L.map('mapaReal').setView(
        [-33.4489, -70.6693],
        11
    );

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: 'OpenStreetMap'
        }
    ).addTo(mapa);

    // Pudahuel
    L.marker([-33.438, -70.790])
        .addTo(mapa)
        .bindPopup(
            '🚨 Perro herido<br>Pudahuel'
        );

    // Maipú
    L.marker([-33.511, -70.760])
        .addTo(mapa)
        .bindPopup(
            '🚨 Gata abandonada'
        );

    // La Florida
    L.marker([-33.530, -70.590])
        .addTo(mapa)
        .bindPopup(
            '⚠ Cachorro desnutrido'
        );

    // Santiago Centro
    L.marker([-33.4489, -70.6693])
        .addTo(mapa)
        .bindPopup(
            '✅ Animal rescatado'
        );

    // Ñuñoa
    L.marker([-33.456, -70.600])
        .addTo(mapa)
        .bindPopup(
            '❤️ Luna en adopción'
        );
}
function abrirPerfilAnimal(
    nombre,
    tipo,
    edad,
    ubicacion,
    descripcion,
    foto
) {

    document.getElementById("animalNombre").innerHTML =
        nombre;

    document.getElementById("animalEdad").innerHTML =
        tipo + " • " + edad;

    document.getElementById("animalUbicacion").innerHTML =
        "📍 " + ubicacion;

    document.getElementById("animalDescripcion").innerHTML =
        descripcion;

    document.getElementById("animalFoto").src =
        foto;

    mostrarPantalla("perfilAnimal");

}

function filtrarAnimales(tipo, btn) {

    document
        .querySelectorAll(".filtro")
        .forEach(f => {
            f.classList.remove("activo");
        });

    btn.classList.add("activo");

    const cards =
        document.querySelectorAll(".card-animal");

    cards.forEach(card => {

        if (tipo === "todos") {

            card.style.display = "block";

        } else {

            if (card.classList.contains(tipo)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        }

    });

}