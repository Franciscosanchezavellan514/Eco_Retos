protectRootPage();

const DEFAULT_AVATAR = "./assets/images/avatar_202606112038.jpeg";

const user = getCurrentUser();

const homeAvatar =
document.getElementById("homeAvatar");

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

const gardenImage =
document.getElementById("gardenImage");

const logoutBtn =
document.getElementById("logoutBtn");

if(user){

    homeAvatar.src =
    user.fotoPerfil || DEFAULT_AVATAR;

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

    if ((user.puntos || 0) >= 800) {

        gardenImage.src =
        "./assets/images/Large_eco_garden_with_trees,_202606112042.jpeg";

        gardenText.textContent =
        "Tu jardín está completamente desarrollado.";

    } else if ((user.puntos || 0) >= 300) {

        gardenImage.src =
        "./assets/images/Medium_eco_garden_with_flowers,_202606112041.jpeg";

        gardenText.textContent =
        "Tu jardín sigue creciendo con tus acciones ambientales.";

    } else {

        gardenImage.src =
        "./assets/images/Small_eco_garden_with_one_202606112040.jpeg";

        gardenText.textContent =
        "Completa retos para hacer crecer tu jardín.";
    }

}

logoutBtn.addEventListener(
"click",
function(){
    closeSession();
});