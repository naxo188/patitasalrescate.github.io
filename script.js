// ===========================
// NAVEGACIÓN ENTRE PANTALLAS
// ===========================

function mostrarPantalla(id) {

    document.querySelectorAll(".pantalla").forEach(p => {
        p.classList.remove("activa");
    });

    const pantalla = document.getElementById(id);

    if (pantalla) {
        pantalla.classList.add("activa");
    }

    if (id === "mapa") {
        setTimeout(iniciarMapa, 200);
    }
}

// ===========================
// SELECCIÓN DE ANIMAL
// ===========================

function seleccionarAnimal(elemento) {

    document.querySelectorAll(".animal-card").forEach(card => {
        card.classList.remove("selected");
    });

    elemento.classList.add("selected");
}

// ===========================
// SELECCIÓN DE URGENCIA
// ===========================

function seleccionarUrgencia(elemento) {

    document.querySelectorAll(".urgencia-card").forEach(card => {
        card.classList.remove("selected-urgencia");
    });

    elemento.classList.add("selected-urgencia");
}

// ===========================
// ENVIAR REPORTE
// ===========================

function enviarReporte() {

    alert(
        "✅ Reporte enviado correctamente.\n\nGracias por ayudar a los animales."
    );

    mostrarPantalla("inicio");
}

// ===========================
// FOTO PERFIL
// ===========================

const subirFoto = document.getElementById("subirFoto");

if (subirFoto) {

    subirFoto.addEventListener("change", function () {

        const archivo = this.files[0];

        if (!archivo) return;

        const lector = new FileReader();

        lector.onload = function (e) {

            const fotoPerfil =
                document.getElementById("fotoPerfil");

            if (fotoPerfil) {
                fotoPerfil.src = e.target.result;
            }
        };

        lector.readAsDataURL(archivo);
    });
}

// ===========================
// PLANES
// ===========================

function cambiarPlan(tipo) {

    const mensualBtn = document.getElementById("mensualBtn");
    const anualBtn = document.getElementById("anualBtn");

    const precioPro = document.getElementById("precioPro");
    const precioPremium = document.getElementById("precioPremium");

    const beneficiosPro =
        document.getElementById("beneficiosPro");

    const beneficiosPremium =
        document.getElementById("beneficiosPremium");

    mensualBtn?.classList.remove("activo");
    anualBtn?.classList.remove("activo");

    if (tipo === "mensual") {

        mensualBtn?.classList.add("activo");

        precioPro.innerHTML = "$4.990/mes";
        precioPremium.innerHTML = "$9.990/mes";

        beneficiosPro.innerHTML = `
            <li>✔ Todo lo del plan Básico</li>
            <li>✔ Alertas en tiempo real</li>
            <li>✔ Seguimiento de tus reportes</li>
            <li>✔ Sin publicidad</li>
            <li>✔ Badge "Rescatador Pro"</li>
        `;

        beneficiosPremium.innerHTML = `
            <li>✔ Todo lo del plan Pro</li>
            <li>✔ Estadísticas avanzadas</li>
            <li>✔ Prioridad máxima en reportes</li>
            <li>✔ Badge "Héroe Animal"</li>
            <li>✔ Certificado de impacto mensual</li>
        `;

    } else {

        anualBtn?.classList.add("activo");

        precioPro.innerHTML =
            '$41.916/año <small style="font-size:14px;color:#888">($3.493/mes)</small>';

        precioPremium.innerHTML =
            '$83.916/año <small style="font-size:14px;color:#888">($6.993/mes)</small>';

        beneficiosPro.innerHTML = `
            <li>✔ Todo lo del plan Básico</li>
            <li>✔ Alertas en tiempo real</li>
            <li>✔ Seguimiento de tus reportes</li>
            <li>✔ Sin publicidad</li>
            <li>✔ Badge "Rescatador Pro"</li>
            <li>✔ 2 meses gratis incluidos</li>
            <li>✔ Acceso anticipado a funciones</li>
        `;

        beneficiosPremium.innerHTML = `
            <li>✔ Todo lo del plan Pro</li>
            <li>✔ Estadísticas avanzadas</li>
            <li>✔ Prioridad máxima en reportes</li>
            <li>✔ Badge "Héroe Animal" exclusivo</li>
            <li>✔ Certificado de impacto mensual</li>
            <li>✔ 2 meses gratis incluidos</li>
            <li>✔ Soporte prioritario</li>
        `;
    }
}

// ===========================
// FILTROS VISUALES
// ===========================

function filtrarMapa(btn) {

    document.querySelectorAll(".filtro")
        .forEach(f => f.classList.remove("activo"));

    btn.classList.add("activo");
}

// ===========================
// MAPA LEAFLET
// ===========================

let mapa;
let mapaCargado = false;
let marcadores = [];

function iniciarMapa() {

    if (mapaCargado) return;

    const mapaElemento =
        document.getElementById("mapaReal");

    if (!mapaElemento) return;

    mapaCargado = true;

    mapa = L.map("mapaReal")
        .setView([-33.4489, -70.6693], 11);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "© OpenStreetMap"
        }
    ).addTo(mapa);

    agregarMarcador(
        -33.4489,
        -70.6693,
        "🐶 Rocky busca hogar",
        "adopcion"
    );

    agregarMarcador(
        -33.4569,
        -70.6483,
        "🐱 Luna disponible",
        "adopcion"
    );

    agregarMarcador(
        -33.4700,
        -70.6900,
        "🚨 Perro herido",
        "urgente"
    );

    agregarMarcador(
        -33.5180,
        -70.5980,
        "⚠ Cachorro desnutrido",
        "atencion"
    );

    agregarMarcador(
        -33.4372,
        -70.6506,
        "✅ Animal recuperado",
        "estable"
    );
}

function agregarMarcador(lat, lng, texto, tipo) {

    const marker =
        L.marker([lat, lng]).addTo(mapa);

    marker.bindPopup(texto);
    marker.tipo = tipo;

    marcadores.push(marker);
}

function filtrarMarcadores(tipo, boton) {

    document.querySelectorAll(".filtro")
        .forEach(b => b.classList.remove("activo"));

    boton.classList.add("activo");

    marcadores.forEach(marker => {

        mapa.removeLayer(marker);

        if (
            tipo === "todos" ||
            marker.tipo === tipo
        ) {
            marker.addTo(mapa);
        }
    });
}

// ===========================
// MODAL / PERFIL ANIMAL
// ===========================

function abrirPerfilAnimal(
    nombre,
    edad,
    ubicacion,
    descripcion,
    foto
) {

    document.getElementById("animalNombre").textContent =
        nombre;

    document.getElementById("animalEdad").textContent =
        edad;

    document.getElementById("animalUbicacion").textContent =
        ubicacion;

    document.getElementById("animalDescripcion").textContent =
        descripcion;

    document.getElementById("animalFoto").src =
        foto;

    mostrarPantalla("perfilAnimal");
}

function cerrarModal() {

    const modal =
        document.getElementById("modalAnimal");

    if (modal) {
        modal.classList.remove("abierto");
    }
}

// ===========================
// FILTRO ANIMALES
// ===========================

function filtrarAnimales(tipo, btn) {

    document.querySelectorAll(".filtro")
        .forEach(f => f.classList.remove("activo"));

    btn.classList.add("activo");

    const cards =
        document.querySelectorAll(".card-animal");

    cards.forEach(card => {

        if (
            tipo === "todos" ||
            card.classList.contains(tipo)
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// ===========================
// PREVISUALIZAR FOTO
// ===========================

function previsualizarFoto(input) {

    const preview =
        document.getElementById("fotoAnimalPreview");

    const placeholder =
        document.getElementById("fotoPreview");

    if (
        input.files &&
        input.files[0]
    ) {

        const reader = new FileReader();

        reader.onload = e => {

            preview.src = e.target.result;
            preview.style.display = "block";

            if (placeholder) {
                placeholder.style.display = "none";
            }
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// ===========================
// CHAT
// ===========================

function abrirChat() {

    document.getElementById("chatOverlay")
        ?.classList.add("abierto");
}

function cerrarChat() {

    document.getElementById("chatOverlay")
        ?.classList.remove("abierto");
}

async function enviarMensaje() {

    const input =
        document.getElementById("chatInput");

    const mensajes =
        document.getElementById("chatMensajes");

    const texto =
        input.value.trim();

    if (!texto) return;

    mensajes.innerHTML +=
        `<div class="msg-user"><span>${texto}</span></div>`;

    input.value = "";

    mensajes.scrollTop =
        mensajes.scrollHeight;

    const typing =
        document.createElement("div");

    typing.className = "msg-typing";
    typing.innerHTML = "<span>...</span>";

    mensajes.appendChild(typing);

    try {

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                message: texto
            })
        });

        const data = await res.json();

        typing.remove();

        mensajes.innerHTML += `
            <div class="msg-bot">
                <span>${data.reply || data.error || "Sin respuesta"}</span>
            </div>
        `;

    } catch {

        typing.remove();

        mensajes.innerHTML += `
            <div class="msg-bot">
                <span>Lo siento, hubo un error.</span>
            </div>
        `;
    }

    mensajes.scrollTop =
        mensajes.scrollHeight;
}