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
function abrirPerfilAnimal(nombre, tipo, edad, ubicacion, descripcion, foto) {
    document.getElementById("animalNombre").innerHTML = nombre;
    document.getElementById("animalEdad").innerHTML = tipo + " • " + edad;
    document.getElementById("animalUbicacion").innerHTML = "📍 " + ubicacion;
    document.getElementById("animalDescripcion").innerHTML = descripcion;
    document.getElementById("animalFoto").src = foto;
    document.getElementById("modalAnimal").classList.add("abierto");
}

function cerrarModal() {
    document.getElementById("modalAnimal").classList.remove("abierto");
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
function previsualizarFoto(input) {
    const preview = document.getElementById('fotoAnimalPreview');
    const placeholder = document.getElementById('fotoPreview');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
            preview.src = e.target.result;
            preview.style.display = 'block';
            placeholder.style.display = 'none';
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function abrirChat() {
    document.getElementById('chatOverlay').classList.add('abierto');
}

function cerrarChat() {
    document.getElementById('chatOverlay').classList.remove('abierto');
}

async function enviarMensaje() {
    const input = document.getElementById('chatInput');
    const mensajes = document.getElementById('chatMensajes');
    const texto = input.value.trim();
    if (!texto) return;

    mensajes.innerHTML += `<div class="msg-user"><span>${texto}</span></div>`;
    input.value = '';
    mensajes.scrollTop = mensajes.scrollHeight;

    const typing = document.createElement('div');
    typing.className = 'msg-typing';
    typing.innerHTML = '<span>...</span>';
    mensajes.appendChild(typing);
    mensajes.scrollTop = mensajes.scrollHeight;

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: texto })
        });

        const data = await res.json();
        typing.remove();

        mensajes.innerHTML += `<div class="msg-bot"><span>${data.reply || data.error || 'Sin respuesta'}</span></div>`;
        mensajes.scrollTop = mensajes.scrollHeight;

    } catch (e) {
        typing.remove();
        mensajes.innerHTML += `<div class="msg-bot"><span>Lo siento, hubo un error. Intenta de nuevo.</span></div>`;
    }
}
const mapElement = document.getElementById("map");

if (mapElement) {

    const map = L.map('map').setView([-33.4489, -70.6693], 11);

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: '© OpenStreetMap'
        }
    ).addTo(map);

    L.marker([-33.4489, -70.6693])
        .addTo(map)
        .bindPopup("🚨 Rescate reportado");

    L.marker([-33.4372, -70.6506])
        .addTo(map)
        .bindPopup("🐶 Rocky busca hogar");

    L.marker([-33.4569, -70.6483])
        .addTo(map)
        .bindPopup("🐱 Luna disponible");
}
let mapa;
let marcadores = [];

const mapaElemento = document.getElementById("mapaReal");

if (mapaElemento) {

    mapa = L.map("mapaReal").setView([-33.4489, -70.6693], 11);

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

    const marker = L.marker([lat, lng]).addTo(mapa);

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

        if (tipo === "todos" || marker.tipo === tipo) {
            marker.addTo(mapa);
        }

    });
}

function abrirPerfilAnimal(
    nombre,
    edad,
    ubicacion,
    descripcion,
    foto
) {

    document.getElementById("animalNombre").textContent = nombre;
    document.getElementById("animalEdad").textContent = edad;
    document.getElementById("animalUbicacion").textContent = ubicacion;
    document.getElementById("animalDescripcion").textContent = descripcion;
    document.getElementById("animalFoto").src = foto;

    mostrarPantalla("perfilAnimal");
}