protectPage();

const user = getCurrentUser();

if (user) {
    document.getElementById("profileName").textContent = user.nombre;
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("profilePoints").textContent = user.puntos || 0;
    document.getElementById("profileLevel").textContent = user.nivel || 1;
    document.getElementById("profileChallenges").textContent = user.retos || 0;
}

document.getElementById("logoutBtn").addEventListener("click", function() {
    closeSession();
});