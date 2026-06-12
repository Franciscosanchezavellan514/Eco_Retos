protectPage();

const challengeList = document.getElementById("challengeList");
const currentPoints = document.getElementById("currentPoints");
const currentChallenges = document.getElementById("currentChallenges");
const filterButtons = document.querySelectorAll(".filter-btn");

let user = getCurrentUser();

const retos = [
    {
        id: 1,
        titulo: "Reciclar una botella",
        descripcion: "Deposita una botella plástica en un contenedor de reciclaje.",
        puntos: 10,
        dificultad: "facil",
        icono: "fa-bottle-water",
        imagen: "../../imagen/Student_placing_bottles_recyclin…_202606112046.jpeg"
    },
    {
        id: 2,
        titulo: "Ahorrar agua en casa",
        descripcion: "Cierra el grifo mientras te cepillas los dientes.",
        puntos: 15,
        dificultad: "facil",
        icono: "fa-droplet",
        imagen: "../../imagen/Student_saving_water_brushing_teeth_202606112047.jpeg"
    },
    {
        id: 3,
        titulo: "Apagar luces innecesarias",
        descripcion: "Apaga luces de habitaciones vacías durante el día.",
        puntos: 15,
        dificultad: "facil",
        icono: "fa-lightbulb",
        imagen: "../../imagen/Student_turning_off_lights_202606112048.jpeg"
    },
    {
        id: 4,
        titulo: "Clasificar residuos",
        descripcion: "Separa plástico, papel y residuos orgánicos.",
        puntos: 25,
        dificultad: "medio",
        icono: "fa-recycle",
        imagen: "../../imagen/Student_sorting_waste_202606112049.jpeg"
    },
    {
        id: 5,
        titulo: "Limpieza escolar",
        descripcion: "Participa en una actividad de limpieza dentro de tu centro educativo.",
        puntos: 35,
        dificultad: "dificil",
        icono: "fa-people-group",
        imagen: "../../imagen/Student_cleaning_school_202606112050.jpeg"
    },
    {
        id: 6,
        titulo: "Usar botella reutilizable",
        descripcion: "Utiliza una botella reutilizable durante todo el día.",
        puntos: 20,
        dificultad: "facil",
        icono: "fa-glass-water",
        imagen: "../../imagen/Student_using_reusable_bottle_202606112051.jpeg"
    },
    {
        id: 7,
        titulo: "Sembrar una planta",
        descripcion: "Siembra una semilla o planta en casa o en la escuela.",
        puntos: 40,
        dificultad: "medio",
        icono: "fa-seedling",
        imagen: "../../imagen/Student_planting_seedling_202606112052.jpeg"
    },
    {
        id: 8,
        titulo: "Reducir uso de papel",
        descripcion: "Utiliza medios digitales en lugar de imprimir documentos.",
        puntos: 20,
        dificultad: "medio",
        icono: "fa-file-lines",
        imagen: "../../imagen/Student_using_digital_media_202606112053.jpeg"
    },
    {
        id: 9,
        titulo: "Caminar o usar bicicleta",
        descripcion: "Realiza un trayecto sin utilizar vehículo motorizado.",
        puntos: 45,
        dificultad: "dificil",
        icono: "fa-bicycle",
        imagen: "../../imagen/Student_walking_or_riding_bike_202606112054.jpeg"
    },
    {
        id: 10,
        titulo: "Jornada de reciclaje comunitaria",
        descripcion: "Participa en una actividad organizada de reciclaje comunitario.",
        puntos: 60,
        dificultad: "dificil",
        icono: "fa-earth-americas",
        imagen: "../../imagen/Student_participating_in_community_recycling_event_202606112055.jpeg"
    }
];

function getCompletedChallenges() {
    const data = localStorage.getItem("ecoRetosCompletedChallenges");
    return data ? JSON.parse(data) : [];
}

function saveCompletedChallenges(completed) {
    localStorage.setItem(
        "ecoRetosCompletedChallenges",
        JSON.stringify(completed)
    );
}

function saveUserData() {
    saveSession(user);

    const registeredUser = getRegisteredUser();

    if (registeredUser) {
        registeredUser.puntos = user.puntos;
        registeredUser.retos = user.retos;
        registeredUser.nivel = user.nivel;
        registeredUser.racha = user.racha;

        saveRegisteredUser(registeredUser);
    }
}

function updateResume() {
    currentPoints.textContent = user.puntos || 0;
    currentChallenges.textContent = user.retos || 0;
}

function updateLevel() {
    if (user.puntos >= 800) {
        user.nivel = 5;
    } else if (user.puntos >= 500) {
        user.nivel = 4;
    } else if (user.puntos >= 250) {
        user.nivel = 3;
    } else if (user.puntos >= 100) {
        user.nivel = 2;
    } else {
        user.nivel = 1;
    }
}

function renderChallenges(filter = "todos") {
    const completed = getCompletedChallenges();

    challengeList.innerHTML = "";

    const filteredRetos = retos.filter(function(reto) {
        return filter === "todos" || reto.dificultad === filter;
    });

    if (filteredRetos.length === 0) {
        challengeList.innerHTML =
        '<p class="empty-message">No hay retos disponibles en esta categoría.</p>';
        return;
    }

    filteredRetos.forEach(function(reto) {
        const isCompleted = completed.includes(reto.id);

        const card = document.createElement("article");
        card.className = "challenge-card";

        card.innerHTML = `
            ${
                reto.imagen
                ? `<img class="challenge-img" src="${reto.imagen}" alt="${reto.titulo}">`
                : ""
            }

            <div class="challenge-top">
                <div class="challenge-icon">
                    <i class="fa-solid ${reto.icono}"></i>
                </div>

                <div class="challenge-info">
                    <h3>${reto.titulo}</h3>
                    <p>${reto.descripcion}</p>
                </div>
            </div>

            <div class="challenge-meta">
                <span class="badge ${reto.dificultad}">
                    ${reto.dificultad.toUpperCase()}
                </span>

                <span class="points">
                    +${reto.puntos} puntos
                </span>
            </div>

            <button class="complete-btn ${isCompleted ? "completed" : ""}"
                data-id="${reto.id}">
                ${isCompleted ? "Completado" : "Completar reto"}
            </button>
        `;

        challengeList.appendChild(card);
    });

    const buttons = document.querySelectorAll(".complete-btn");

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const retoId = Number(this.dataset.id);
            completeChallenge(retoId);
        });
    });
}

function completeChallenge(retoId) {
    const completed = getCompletedChallenges();

    if (completed.includes(retoId)) {
        alert("Este reto ya fue completado.");
        return;
    }

    const reto = retos.find(function(item) {
        return item.id === retoId;
    });

    if (!reto) {
        return;
    }

    completed.push(retoId);
    saveCompletedChallenges(completed);

    user.puntos = (user.puntos || 0) + reto.puntos;
    user.retos = (user.retos || 0) + 1;
    user.racha = (user.racha || 0) + 1;

    updateLevel();
    saveUserData();
    updateResume();
    renderChallenges(getActiveFilter());

    alert("Reto completado. Has ganado " + reto.puntos + " puntos.");
}

function getActiveFilter() {
    const active = document.querySelector(".filter-btn.active");
    return active ? active.dataset.filter : "todos";
}

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        renderChallenges(this.dataset.filter);
    });
});

updateResume();
renderChallenges();