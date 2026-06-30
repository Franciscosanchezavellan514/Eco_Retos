protectPage();

let user = getCurrentUser();

const currentPoints = document.getElementById("currentPoints");
const currentChallenges = document.getElementById("currentChallenges");
const challengeList = document.getElementById("challengeList");
const shopList = document.getElementById("shopList");
const inventoryList = document.getElementById("inventoryList");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

const INVENTORY_KEY = "ecoRetosInventory";
const COMPLETED_KEY = "ecoRetosCompletedChallenges";

const materials = [
    {
        id: "botella",
        name: "Botella plástica",
        icon: "fa-bottle-water",
        price: 40,
        description: "Base para construir macetas, carritos y comederos."
    },
    {
        id: "tapa",
        name: "Tapa plástica",
        icon: "fa-circle",
        price: 10,
        description: "Sirve como rueda o pieza decorativa."
    },
    {
        id: "carton",
        name: "Cartón reciclado",
        icon: "fa-box",
        price: 25,
        description: "Material útil para organizadores y estructuras."
    },
    {
        id: "periodico",
        name: "Papel periódico",
        icon: "fa-newspaper",
        price: 15,
        description: "Sirve para decorar, reforzar o cubrir superficies."
    },
    {
        id: "palito",
        name: "Palito de madera",
        icon: "fa-grip-lines",
        price: 20,
        description: "Funciona como eje, soporte o estructura."
    },
    {
        id: "tetrapak",
        name: "Caja Tetra Pak",
        icon: "fa-box-open",
        price: 35,
        description: "Ideal para crear casas, macetas y contenedores."
    },
    {
        id: "cuerda",
        name: "Cuerda o hilo",
        icon: "fa-link",
        price: 15,
        description: "Sirve para colgar, sujetar y amarrar piezas."
    },
    {
        id: "cinta",
        name: "Cinta adhesiva",
        icon: "fa-tape",
        price: 20,
        description: "Permite unir materiales durante la construcción."
    },
    {
        id: "pintura",
        name: "Pintura ecológica",
        icon: "fa-palette",
        price: 30,
        description: "Sirve para decorar los proyectos ecológicos."
    },
    {
        id: "cd",
        name: "CD/DVD viejo",
        icon: "fa-compact-disc",
        price: 30,
        description: "Material decorativo para proyectos creativos."
    },
    {
        id: "semillas",
        name: "Semillas",
        icon: "fa-seedling",
        price: 25,
        description: "Necesarias para retos de cultivo y plantas."
    },
    {
        id: "tierra",
        name: "Tierra abonada",
        icon: "fa-mound",
        price: 35,
        description: "Base para macetas y proyectos de siembra."
    }
];

const challenges = [
    {
        id: "carrito-botella",
        name: "Carrito con botella plástica",
        description: "Construye un carrito ecológico usando una botella como base y tapas como ruedas.",
        icon: "fa-car-side",
        difficulty: "medio",
        reward: 120,
        requirements: {
            botella: 1,
            tapa: 4,
            palito: 2,
            cinta: 1
        }
    },
    {
        id: "maceta-reciclada",
        name: "Maceta reciclada",
        description: "Crea una maceta reutilizando una botella plástica y siembra una planta pequeña.",
        icon: "fa-seedling",
        difficulty: "facil",
        reward: 100,
        requirements: {
            botella: 1,
            tierra: 1,
            semillas: 1
        }
    },
    {
        id: "portalapices",
        name: "Portalápices ecológico",
        description: "Construye un portalápices decorativo reutilizando material reciclable.",
        icon: "fa-pen",
        difficulty: "facil",
        reward: 90,
        requirements: {
            botella: 1,
            pintura: 1,
            periodico: 1
        }
    },
    {
        id: "organizador",
        name: "Organizador de escritorio",
        description: "Crea un organizador para útiles escolares usando cartón reciclado.",
        icon: "fa-boxes-stacked",
        difficulty: "medio",
        reward: 140,
        requirements: {
            carton: 2,
            cinta: 1,
            pintura: 1
        }
    },
    {
        id: "comedero-aves",
        name: "Comedero para aves",
        description: "Diseña un comedero colgante para aves usando una botella plástica.",
        icon: "fa-dove",
        difficulty: "medio",
        reward: 160,
        requirements: {
            botella: 1,
            cuerda: 1,
            semillas: 2
        }
    },
    {
        id: "molino-viento",
        name: "Molino decorativo",
        description: "Arma un molino decorativo reutilizando CD viejo, palitos y pintura.",
        icon: "fa-fan",
        difficulty: "dificil",
        reward: 180,
        requirements: {
            cd: 1,
            palito: 3,
            cinta: 1,
            pintura: 1
        }
    },
    {
        id: "casa-plantas",
        name: "Casa para plantas",
        description: "Convierte una caja Tetra Pak en una pequeña casa/maceta para plantas.",
        icon: "fa-house-chimney",
        difficulty: "dificil",
        reward: 200,
        requirements: {
            tetrapak: 1,
            tierra: 1,
            semillas: 1,
            pintura: 1
        }
    }
];

function updateUser(updatedUser) {
    user = updatedUser;

    if (typeof updateCurrentUser === "function") {
        updateCurrentUser(user);
    } else {
        saveSession(user);
        saveRegisteredUser(user);
    }
}

function calculateLevel(points) {
    if (points >= 800) {
        return 5;
    }

    if (points >= 500) {
        return 4;
    }

    if (points >= 250) {
        return 3;
    }

    if (points >= 100) {
        return 2;
    }

    return 1;
}

function getInventory() {
    const inventory = localStorage.getItem(INVENTORY_KEY);

    if (inventory) {
        return JSON.parse(inventory);
    }

    const emptyInventory = {};

    materials.forEach(function(material) {
        emptyInventory[material.id] = 0;
    });

    localStorage.setItem(INVENTORY_KEY, JSON.stringify(emptyInventory));

    return emptyInventory;
}

function saveInventory(inventory) {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
}

function getCompletedChallenges() {
    const completed = localStorage.getItem(COMPLETED_KEY);

    if (completed) {
        return JSON.parse(completed);
    }

    localStorage.setItem(COMPLETED_KEY, JSON.stringify([]));

    return [];
}

function saveCompletedChallenges(completed) {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
}

function getMaterialName(materialId) {
    const material = materials.find(function(item) {
        return item.id === materialId;
    });

    return material ? material.name : materialId;
}

function getMaterialIcon(materialId) {
    const material = materials.find(function(item) {
        return item.id === materialId;
    });

    return material ? material.icon : "fa-box";
}

function hasRequiredMaterials(challenge, inventory) {
    return Object.keys(challenge.requirements).every(function(materialId) {
        return (inventory[materialId] || 0) >= challenge.requirements[materialId];
    });
}

function renderSummary() {
    currentPoints.textContent = user?.puntos || 0;
    currentChallenges.textContent = user?.retos || 0;
}

function renderChallenges() {
    const inventory = getInventory();
    const completed = getCompletedChallenges();

    challengeList.innerHTML = "";

    challenges.forEach(function(challenge) {
        const isCompleted = completed.includes(challenge.id);
        const canBuild = hasRequiredMaterials(challenge, inventory);

        const card = document.createElement("article");
        card.className = "challenge-card";

        const materialsHtml = Object.keys(challenge.requirements).map(function(materialId) {
            const required = challenge.requirements[materialId];
            const owned = inventory[materialId] || 0;
            const ok = owned >= required;

            return `
                <span class="material-item ${ok ? "ok" : "missing"}">
                    <i class="fa-solid ${getMaterialIcon(materialId)}"></i>
                    ${getMaterialName(materialId)} ${owned}/${required}
                </span>
            `;
        }).join("");

        let buttonText = "Construir reto";
        let buttonClass = "action-btn";
        let disabled = "";

        if (isCompleted) {
            buttonText = "Reto completado";
            buttonClass = "action-btn completed";
            disabled = "disabled";
        } else if (!canBuild) {
            buttonText = "Faltan materiales";
            buttonClass = "action-btn disabled";
            disabled = "disabled";
        }

        card.innerHTML = `
            <div class="challenge-top">

                <div class="challenge-icon">
                    <i class="fa-solid ${challenge.icon}"></i>
                </div>

                <div class="challenge-info">
                    <h3>${challenge.name}</h3>
                    <p>${challenge.description}</p>
                </div>

            </div>

            <div class="challenge-meta">
                <span class="badge ${challenge.difficulty}">
                    ${challenge.difficulty.toUpperCase()}
                </span>

                <span class="points">
                    +${challenge.reward} pts
                </span>
            </div>

            <div class="material-box">
                <span class="material-title">Materiales requeridos</span>
                <div class="material-list">
                    ${materialsHtml}
                </div>
            </div>

            <button class="${buttonClass}" data-id="${challenge.id}" ${disabled}>
                ${buttonText}
            </button>
        `;

        challengeList.appendChild(card);
    });

    const buildButtons = document.querySelectorAll(".challenge-card .action-btn:not(.disabled):not(.completed)");

    buildButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            completeChallenge(this.dataset.id);
        });
    });
}

function renderShop() {
    const inventory = getInventory();

    shopList.innerHTML = "";

    materials.forEach(function(material) {
        const canBuy = (user?.puntos || 0) >= material.price;

        const card = document.createElement("article");
        card.className = "shop-card";

        card.innerHTML = `
            <div class="shop-top">

                <div class="shop-icon">
                    <i class="fa-solid ${material.icon}"></i>
                </div>

                <div class="shop-info">
                    <h3>${material.name}</h3>
                    <p>${material.description}</p>
                </div>

            </div>

            <div class="shop-meta">
                <span class="points">
                    ${material.price} pts
                </span>

                <span class="material-item ok">
                    Tienes: ${inventory[material.id] || 0}
                </span>
            </div>

            <button class="action-btn ${canBuy ? "buy" : "no-points"}" data-id="${material.id}">
                ${canBuy ? "Comprar material" : "Puntos insuficientes"}
            </button>
        `;

        shopList.appendChild(card);
    });

    const buyButtons = document.querySelectorAll(".shop-card .action-btn");

    buyButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            buyMaterial(this.dataset.id);
        });
    });
}

function renderInventory() {
    const inventory = getInventory();

    inventoryList.innerHTML = "";

    const hasItems = Object.values(inventory).some(function(quantity) {
        return quantity > 0;
    });

    if (!hasItems) {
        inventoryList.innerHTML =
            '<p class="empty-message">Todavía no tienes materiales. Compra en la Tienda Eco usando tus puntos.</p>';
        return;
    }

    materials.forEach(function(material) {
        const quantity = inventory[material.id] || 0;

        if (quantity <= 0) {
            return;
        }

        const card = document.createElement("article");
        card.className = "inventory-card";

        card.innerHTML = `
            <div class="inventory-top">

                <div class="inventory-icon">
                    <i class="fa-solid ${material.icon}"></i>
                </div>

                <div class="inventory-info">
                    <h3>${material.name}</h3>
                    <p>${material.description}</p>
                </div>

            </div>

            <div class="inventory-meta">
                <span class="material-item ok">
                    Cantidad disponible: ${quantity}
                </span>
            </div>
        `;

        inventoryList.appendChild(card);
    });
}

function buyMaterial(materialId) {
    const material = materials.find(function(item) {
        return item.id === materialId;
    });

    if (!material) {
        return;
    }

    if ((user?.puntos || 0) < material.price) {
        alert("No tienes puntos suficientes. Gana más puntos en Trivia.");
        return;
    }

    const inventory = getInventory();

    inventory[material.id] = (inventory[material.id] || 0) + 1;

    user.puntos = (user.puntos || 0) - material.price;
    user.nivel = calculateLevel(user.puntos || 0);

    saveInventory(inventory);
    updateUser(user);

    renderAll();

    alert("Compraste: " + material.name);
}

function completeChallenge(challengeId) {
    const challenge = challenges.find(function(item) {
        return item.id === challengeId;
    });

    if (!challenge) {
        return;
    }

    const completed = getCompletedChallenges();

    if (completed.includes(challenge.id)) {
        alert("Este reto ya fue completado.");
        return;
    }

    const inventory = getInventory();

    if (!hasRequiredMaterials(challenge, inventory)) {
        alert("Aún te faltan materiales para completar este reto.");
        return;
    }

    Object.keys(challenge.requirements).forEach(function(materialId) {
        inventory[materialId] =
            (inventory[materialId] || 0) - challenge.requirements[materialId];
    });

    completed.push(challenge.id);

    user.puntos = (user.puntos || 0) + challenge.reward;
    user.retos = (user.retos || 0) + 1;
    user.nivel = calculateLevel(user.puntos || 0);

    saveInventory(inventory);
    saveCompletedChallenges(completed);
    updateUser(user);

    renderAll();

    alert("¡Reto completado! Ganaste " + challenge.reward + " puntos.");
}

function renderAll() {
    renderSummary();
    renderChallenges();
    renderShop();
    renderInventory();
}

tabButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const selectedTab = this.dataset.tab;

        tabButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        tabContents.forEach(function(content) {
            content.classList.remove("active");
        });

        this.classList.add("active");

        document.getElementById(selectedTab + "Tab").classList.add("active");
    });
});

renderAll();