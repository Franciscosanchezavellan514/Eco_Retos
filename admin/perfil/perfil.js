protectPage();

const user = getCurrentUser();

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

document.getElementById("profileStreak").textContent =
user?.racha || 0;

const points = user?.puntos || 0;

let progress = 0;
let nextLevel = "Nivel 2";

if(points < 100){

    progress = points;

    nextLevel = "Nivel 2";

}else if(points < 250){

    progress = ((points - 100) / 150) * 100;

    nextLevel = "Nivel 3";

}else if(points < 500){

    progress = ((points - 250) / 250) * 100;

    nextLevel = "Nivel 4";

}else if(points < 800){

    progress = ((points - 500) / 300) * 100;

    nextLevel = "Nivel 5";

}else{

    progress = 100;

    nextLevel = "Máximo";
}

document.getElementById("levelProgress").style.width =
progress + "%";

document.getElementById("nextLevelText").textContent =
nextLevel;

document.getElementById("logoutBtn")
.addEventListener("click", function(){

    closeSession();

});