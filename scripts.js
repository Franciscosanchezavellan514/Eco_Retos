protectRootPage();

const DEFAULT_AVATAR = "./assets/images/avatar_202606112038.jpeg";

let user = getCurrentUser();

const homeAvatar = document.getElementById("homeAvatar");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPoints = document.getElementById("userPoints");
const userLevel = document.getElementById("userLevel");
const userChallenges = document.getElementById("userChallenges");

const gardenLevel = document.getElementById("gardenLevel");
const gardenText = document.getElementById("gardenText");
const gardenImage = document.getElementById("gardenImage");
const userCoins = document.getElementById("userCoins");
const slotsUsedLabel = document.getElementById("slotsUsedLabel");
const gardenSlotsGrid = document.getElementById("gardenSlotsGrid");
const plantShopList = document.getElementById("plantShopList");

const logoutBtn = document.getElementById("logoutBtn");

const GARDEN_SLOTS_KEY = "ecoRetosGardenPlants";
const SLOTS_PER_LEVEL = 3;

const plantCatalog = [
    {
        id: "suculenta",
        name: "Suculenta",
        icon: "fa-seedling",
        price: 1,
        description: "Planta pequeña y resistente, ideal para empezar tu jardín."
    },
    {
        id: "flor",
        name: "Flor eco",
        icon: "fa-spa",
        price: 1,
        description: "Le da color a tu jardín virtual."
    },
    {
        id: "helecho",
        name: "Helecho",
        icon: "fa-pagelines",
        price: 2,
        description: "Planta frondosa que refleja un jardín saludable."
    },
    {
        id: "arbusto",
        name: "Arbusto",
        icon: "fa-leaf",
        price: 2,
        description: "Aporta más volumen y vida a tu espacio verde."
    },
    {
        id: "arbol",
        name: "Árbol pequeño",
        icon: "fa-tree",
        price: 3,
        description: "La planta más valiosa de tu colección ecológica."
    }
];

function calculateLevel(points) {
    if (points >= 800) return 5;
    if (points >= 500) return 4;
    if (points >= 250) return 3;
    if (points >= 100) return 2;
    return 1;
}

function updateUser(updatedUser) {
    user = updatedUser;

    if (typeof updateCurrentUser === "function") {
        updateCurrentUser(user);
    } else {
        saveSession(user);

        const registeredUser = getRegisteredUser();

        if (registeredUser && registeredUser.email === user.email) {
            saveRegisteredUser(user);
        }
    }
}

function getMaxSlots() {
    const level = user?.nivel || calculateLevel(user?.puntos || 0);
    return level * SLOTS_PER_LEVEL;
}

function getPlacedPlants() {
    const stored = localStorage.getItem(GARDEN_SLOTS_KEY);
    return stored ? JSON.parse(stored) : [];
}

function savePlacedPlants(plants) {
    localStorage.setItem(GARDEN_SLOTS_KEY, JSON.stringify(plants));
}

function getPlantById(plantId) {
    return plantCatalog.find(function(plant) {
        return plant.id === plantId;
    });
}

function renderUserInfo() {
    if (!user) {
        return;
    }

    homeAvatar.src = user.fotoPerfil || DEFAULT_AVATAR;
    userName.textContent = user.nombre || "Estudiante Eco";
    userEmail.textContent = user.email || "correo@ejemplo.com";
    userPoints.textContent = user.puntos || 0;
    userLevel.textContent = user.nivel || 1;
    userChallenges.textContent = user.retos || 0;
    userCoins.textContent = user.monedas || 0;

    gardenLevel.textContent = "Nivel " + (user.nivel || 1);

    if ((user.puntos || 0) >= 800) {
        gardenImage.src = "./assets/images/Large_eco_garden_with_trees,_202606112042.jpeg";
        gardenText.textContent = "Tu jardín está completamente desarrollado.";
    } else if ((user.puntos || 0) >= 300) {
        gardenImage.src = "./assets/images/Medium_eco_garden_with_flowers,_202606112041.jpeg";
        gardenText.textContent = "Tu jardín sigue creciendo con tus acciones ambientales.";
    } else {
        gardenImage.src = "./assets/images/Small_eco_garden_with_one_202606112040.jpeg";
        gardenText.textContent = "Completa retos para hacer crecer tu jardín.";
    }
}

function renderSlots() {
    const maxSlots = getMaxSlots();
    const placedPlants = getPlacedPlants();

    slotsUsedLabel.textContent = placedPlants.length + "/" + maxSlots;

    gardenSlotsGrid.innerHTML = "";

    for (let i = 0; i < maxSlots; i++) {
        const plantId = placedPlants[i];
        const slot = document.createElement("div");

        if (plantId) {
            const plant = getPlantById(plantId);

            slot.className = "garden-slot filled";
            slot.innerHTML = `
                <i class="fa-solid ${plant ? plant.icon : "fa-seedling"}"></i>
                <span>${plant ? plant.name : "Planta"}</span>
                <button class="remove-plant-btn" data-index="${i}" type="button">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;
        } else {
            slot.className = "garden-slot empty";
            slot.innerHTML = `
                <i class="fa-solid fa-plus"></i>
                <span>Vacío</span>
            `;
        }

        gardenSlotsGrid.appendChild(slot);
    }

    const removeButtons = document.querySelectorAll(".remove-plant-btn");

    removeButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            removePlant(Number(this.dataset.index));
        });
    });
}

function renderShop() {
    plantShopList.innerHTML = "";

    const maxSlots = getMaxSlots();
    const placedPlants = getPlacedPlants();
    const gardenFull = placedPlants.length >= maxSlots;

    plantCatalog.forEach(function(plant) {
        const canAfford = (user?.monedas || 0) >= plant.price;
        const canBuy = canAfford && !gardenFull;

        const card = document.createElement("article");
        card.className = "plant-shop-item";

        let buttonText = "Comprar y plantar";

        if (gardenFull) {
            buttonText = "Jardín lleno";
        } else if (!canAfford) {
            buttonText = "Monedas insuficientes";
        }

        card.innerHTML = `
            <div class="plant-shop-icon">
                <i class="fa-solid ${plant.icon}"></i>
            </div>

            <div class="plant-shop-info">
                <h4>${plant.name}</h4>
                <p>${plant.description}</p>
                <span class="plant-price"><i class="fa-solid fa-coins"></i> ${plant.price}</span>
            </div>

            <button class="plant-buy-btn ${canBuy ? "" : "disabled"}" data-id="${plant.id}" ${canBuy ? "" : "disabled"}>
                ${buttonText}
            </button>
        `;

        plantShopList.appendChild(card);
    });

    const buyButtons = document.querySelectorAll(".plant-buy-btn:not(.disabled)");

    buyButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            buyPlant(this.dataset.id);
        });
    });
}

function buyPlant(plantId) {
    const plant = getPlantById(plantId);

    if (!plant) {
        return;
    }

    const maxSlots = getMaxSlots();
    const placedPlants = getPlacedPlants();

    if (placedPlants.length >= maxSlots) {
        alert("Tu jardín ya está lleno para tu nivel actual. Sube de nivel o quita una planta.");
        return;
    }

    if ((user.monedas || 0) < plant.price) {
        alert("No tienes monedas suficientes. Gana más completando Retos y Trivia.");
        return;
    }

    user.monedas = (user.monedas || 0) - plant.price;
    updateUser(user);

    placedPlants.push(plant.id);
    savePlacedPlants(placedPlants);

    renderAll();

    alert("¡Plantaste: " + plant.name + "!");
}

function removePlant(index) {
    const placedPlants = getPlacedPlants();

    if (index < 0 || index >= placedPlants.length) {
        return;
    }

    placedPlants.splice(index, 1);
    savePlacedPlants(placedPlants);

    renderAll();
}

function renderAll() {
    renderUserInfo();
    renderSlots();
    renderShop();
}

if (user) {
    renderAll();
}

logoutBtn.addEventListener("click", function() {
    closeSession();
});