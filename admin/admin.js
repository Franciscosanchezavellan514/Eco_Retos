protectPage();

const user = getCurrentUser();
const registeredUser = getRegisteredUser();

const totalUsers = document.getElementById("totalUsers");
const totalChallenges = document.getElementById("totalChallenges");
const totalPoints = document.getElementById("totalPoints");
const totalPosts = document.getElementById("totalPosts");
const clearDataBtn = document.getElementById("clearDataBtn");

const posts =
JSON.parse(localStorage.getItem("ecoRetosPosts")) || [];

function loadAdminStats() {
    totalUsers.textContent = registeredUser ? 1 : 1;
    totalChallenges.textContent = user?.retos || 0;
    totalPoints.textContent = user?.puntos || 0;
    totalPosts.textContent = posts.length;
}

function loadUserTable() {
    const rows = [
        {
            nombre: user?.nombre || "Estudiante Eco",
            email: user?.email || "demo@ecoretos.com",
            puntos: user?.puntos || 0,
            nivel: user?.nivel || 1,
            retos: user?.retos || 0
        }
    ];

    createTable(
        "userTable",
        [
            { key: "nombre", label: "Nombre" },
            { key: "email", label: "Correo" },
            { key: "puntos", label: "Puntos" },
            { key: "nivel", label: "Nivel" },
            { key: "retos", label: "Retos" }
        ],
        rows
    );
}

function loadPostsTable() {
    const rows = posts.map(function(post) {
        return {
            autor: post.author,
            publicacion: post.text.length > 28
                ? post.text.substring(0, 28) + "..."
                : post.text,
            likes: post.likes,
            comentarios: post.comments,
            fecha: post.date
        };
    });

    createTable(
        "postsTable",
        [
            { key: "autor", label: "Autor" },
            { key: "publicacion", label: "Publicación" },
            { key: "likes", label: "Likes" },
            { key: "comentarios", label: "Comentarios" },
            { key: "fecha", label: "Fecha" }
        ],
        rows
    );
}

clearDataBtn.addEventListener("click", function() {
    const confirmDelete = confirm(
        "¿Seguro que desea reiniciar los datos del prototipo?"
    );

    if (!confirmDelete) {
        return;
    }

    localStorage.removeItem("ecoRetosCompletedChallenges");
    localStorage.removeItem("ecoRetosPosts");

    const current = getCurrentUser();

    if (current) {
        current.puntos = 0;
        current.retos = 0;
        current.nivel = 1;
        current.racha = 0;
        saveSession(current);
    }

    const reg = getRegisteredUser();

    if (reg) {
        reg.puntos = 0;
        reg.retos = 0;
        reg.nivel = 1;
        reg.racha = 0;
        saveRegisteredUser(reg);
    }

    alert("Datos reiniciados correctamente.");
    window.location.reload();
});

loadAdminStats();
loadUserTable();
loadPostsTable();