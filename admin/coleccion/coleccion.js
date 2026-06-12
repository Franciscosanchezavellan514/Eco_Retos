protectPage();

const user = getCurrentUser();

const earnedBadges = document.getElementById("earnedBadges");
const totalBadges = document.getElementById("totalBadges");
const badgesGrid = document.getElementById("badgesGrid");

const badges = [
    {
        id: 1,
        name: "Primer reto",
        description: "Completa tu primer reto ecológico.",
        icon: "fa-seedling",
        condition: function(user) {
            return (user.retos || 0) >= 1;
        }
    },
    {
        id: 2,
        name: "Eco aprendiz",
        description: "Alcanza 50 puntos en la plataforma.",
        icon: "fa-leaf",
        condition: function(user) {
            return (user.puntos || 0) >= 50;
        }
    },
    {
        id: 3,
        name: "Reciclador activo",
        description: "Completa al menos 3 retos.",
        icon: "fa-recycle",
        condition: function(user) {
            return (user.retos || 0) >= 3;
        }
    },
    {
        id: 4,
        name: "Guardián del agua",
        description: "Alcanza 100 puntos acumulados.",
        icon: "fa-droplet",
        condition: function(user) {
            return (user.puntos || 0) >= 100;
        }
    },
    {
        id: 5,
        name: "Eco líder",
        description: "Completa 5 retos ecológicos.",
        icon: "fa-users",
        condition: function(user) {
            return (user.retos || 0) >= 5;
        }
    },
    {
        id: 6,
        name: "Defensor verde",
        description: "Alcanza 250 puntos acumulados.",
        icon: "fa-tree",
        condition: function(user) {
            return (user.puntos || 0) >= 250;
        }
    },
    {
        id: 7,
        name: "Comunidad activa",
        description: "Publica una acción en el Muro Eco.",
        icon: "fa-message",
        condition: function() {
            const posts = JSON.parse(localStorage.getItem("ecoRetosPosts")) || [];
            return posts.some(function(post) {
                return post.author === user.nombre;
            });
        }
    },
    {
        id: 8,
        name: "Nivel avanzado",
        description: "Llega al nivel 3 dentro de Eco-Retos.",
        icon: "fa-medal",
        condition: function(user) {
            return (user.nivel || 1) >= 3;
        }
    }
];

function renderBadges() {
    let unlockedCount = 0;

    badgesGrid.innerHTML = "";

    badges.forEach(function(badge) {
        const unlocked = badge.condition(user);

        if (unlocked) {
            unlockedCount++;
        }

        const card = document.createElement("article");

        card.className =
        "badge-card " + (unlocked ? "unlocked" : "locked");

        card.innerHTML = `
            <div class="badge-icon">
                <i class="fa-solid ${badge.icon}"></i>
            </div>

            <h3>${badge.name}</h3>

            <p>${badge.description}</p>

            <span class="badge-status">
                ${unlocked ? "Obtenida" : "Bloqueada"}
            </span>
        `;

        badgesGrid.appendChild(card);
    });

    earnedBadges.textContent = unlockedCount;
    totalBadges.textContent = badges.length;
}

renderBadges();