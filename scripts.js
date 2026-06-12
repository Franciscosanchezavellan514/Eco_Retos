protectRootPage();

const user =
getCurrentUser();

const userName =
document.getElementById("userName");

const userEmail =
document.getElementById("userEmail");

const userPoints =
document.getElementById("userPoints");

const userLevel =
document.getElementById("userLevel");

const userChallenges =
document.getElementById("userChallenges");

const gardenLevel =
document.getElementById("gardenLevel");

const gardenText =
document.getElementById("gardenText");

const logoutBtn =
document.getElementById("logoutBtn");

if(user){

    userName.textContent =
    user.nombre || "Estudiante Eco";

    userEmail.textContent =
    user.email || "correo@ejemplo.com";

    userPoints.textContent =
    user.puntos || 0;

    userLevel.textContent =
    user.nivel || 1;

    userChallenges.textContent =
    user.retos || 0;

    gardenLevel.textContent =
    "Nivel " + (user.nivel || 1);

    if((user.puntos || 0) >= 800){

        gardenText.textContent =
        "Tu jardín está avanzado. Sigue acumulando logros.";

    }else if((user.puntos || 0) >= 300){

        gardenText.textContent =
        "Tu jardín está creciendo con tus acciones ambientales.";

    }else{

        gardenText.textContent =
        "Completa retos para hacer crecer tu jardín.";

    }

}

logoutBtn.addEventListener(
"click",
function(){

    localStorage.removeItem("ecoRetosAuth");
    window.location.href =
    "./auth/login.html";

});