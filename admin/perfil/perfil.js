protectPage();

const DEFAULT_AVATAR = "../../assets/images/avatar_202606112038.jpeg";

let user = getCurrentUser();

const profileAvatar = document.getElementById("profileAvatar");
const photoInput = document.getElementById("photoInput");
const changePhotoBtn = document.getElementById("changePhotoBtn");
const removePhotoBtn = document.getElementById("removePhotoBtn");

document.getElementById("profileName").textContent =
    user?.nombre || "Usuario";

document.getElementById("profileEmail").textContent =
    user?.email || "correo@ejemplo.com";

document.getElementById("profileLevel").textContent =
    user?.nivel || 1;

document.getElementById("profilePoints").textContent =
    user?.puntos || 0;

document.getElementById("profileChallenges").textContent =
    user?.retos || 0;

function renderAvatar() {
    profileAvatar.src = user?.fotoPerfil || DEFAULT_AVATAR;
}

function renderStreak() {
    const racha = user?.racha || 0;
    const mejorRacha = user?.mejorRacha || 0;
    const diasActivos = user?.diasActivos || 0;
    const retos = user?.retos || 0;
    const puntos = user?.puntos || 0;

    document.getElementById("streakCurrentDays").textContent = racha;
    document.getElementById("streakBest").textContent = mejorRacha;
    document.getElementById("activeDaysTotal").textContent = diasActivos;
    document.getElementById("tasksCompletedTotal").textContent = retos;
    document.getElementById("pointsEarnedTotal").textContent = puntos;

    const streakMessage = document.getElementById("streakMessage");

    if (racha <= 0) {
        streakMessage.textContent = "Inicia hoy tu racha";
    } else if (racha === 1) {
        streakMessage.textContent = "¡Buen comienzo! Vuelve mañana";
    } else if (racha < 5) {
        streakMessage.textContent = "Racha activa, sigue así";
    } else if (racha < 10) {
        streakMessage.textContent = "¡Racha en llamas! No la pierdas";
    } else {
        streakMessage.textContent = "Racha imparable. Eres un eco-experto";
    }
}

function saveCurrentUser(updatedUser) {
    updateCurrentUser(updatedUser);
}

changePhotoBtn.addEventListener("click", function() {
    photoInput.click();
});

photoInput.addEventListener("change", function() {
    const file = this.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("Seleccione un archivo de imagen válido.");
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert("La imagen es demasiado pesada. Use una imagen menor a 2 MB.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        user.fotoPerfil = event.target.result;
        saveCurrentUser(user);
        renderAvatar();
        alert("Foto de perfil actualizada correctamente.");
    };

    reader.readAsDataURL(file);
});

removePhotoBtn.addEventListener("click", function() {
    user.fotoPerfil = "";
    saveCurrentUser(user);
    renderAvatar();
    alert("Foto de perfil eliminada.");
});

const points = user?.puntos || 0;
let progress = 0;
let nextLevel = "Nivel 2";

if (points < 100) {
    progress = points;
    nextLevel = "Nivel 2";
} else if (points < 250) {
    progress = ((points - 100) / 150) * 100;
    nextLevel = "Nivel 3";
} else if (points < 500) {
    progress = ((points - 250) / 250) * 100;
    nextLevel = "Nivel 4";
} else if (points < 800) {
    progress = ((points - 500) / 300) * 100;
    nextLevel = "Nivel 5";
} else {
    progress = 100;
    nextLevel = "Máximo";
}

document.getElementById("levelProgress").style.width =
    progress + "%";

document.getElementById("nextLevelText").textContent =
    nextLevel;

document.getElementById("logoutBtn")
    .addEventListener("click", function() {
        closeSession();
    });

renderAvatar();
renderStreak();