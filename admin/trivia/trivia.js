protectPage();

let user = getCurrentUser();

const categoryBox = document.getElementById("categoryBox");
const groupBox = document.getElementById("groupBox");
const groupList = document.getElementById("groupList");
const selectedCategoryLabel = document.getElementById("selectedCategoryLabel");
const backToCategoriesBtn = document.getElementById("backToCategoriesBtn");

const triviaCard = document.getElementById("triviaCard");
const questionNumber = document.getElementById("questionNumber");
const questionPoints = document.getElementById("questionPoints");
const difficultyLabel = document.getElementById("difficultyLabel");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("optionsBox");

const resultBox = document.getElementById("resultBox");
const resultCategory = document.getElementById("resultCategory");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");
const changeGroupBtn = document.getElementById("changeGroupBtn");
const changeCategoryBtn = document.getElementById("changeCategoryBtn");

const TRIVIA_STATE_KEY = "ecoRetosTriviaGroupedState";

const triviaData = {
    facil: {
        name: "Fácil",
        icon: "fa-leaf",
        className: "facil",
        points: 10,
        description: "Preguntas básicas sobre reciclaje y hábitos ambientales.",
        groups: {
            A: [
                {
                    question: "¿Qué material se puede reciclar con mayor facilidad?",
                    options: ["Botella plástica", "Comida dañada", "Papel sucio", "Aceite usado"],
                    correct: 0
                },
                {
                    question: "¿Cuál acción ayuda al ambiente?",
                    options: ["Tirar basura al suelo", "Separar residuos", "Quemar plástico", "Usar más bolsas"],
                    correct: 1
                },
                {
                    question: "¿Qué debemos hacer con una botella vacía?",
                    options: ["Reutilizarla o reciclarla", "Botarla en la calle", "Quemarla", "Enterrarla"],
                    correct: 0
                },
                {
                    question: "¿Qué hábito ahorra agua?",
                    options: ["Cerrar el grifo al cepillarse", "Lavar con manguera siempre", "Dejar el grifo abierto", "Usar agua sin control"],
                    correct: 0
                },
                {
                    question: "¿Cuál de estos residuos es orgánico?",
                    options: ["Cáscara de fruta", "Botella plástica", "Lata", "Vidrio"],
                    correct: 0
                }
            ],
            B: [
                {
                    question: "¿Dónde debe ir una botella reciclable?",
                    options: ["En el suelo", "En un contenedor adecuado", "En el río", "En una fogata"],
                    correct: 1
                },
                {
                    question: "¿Qué significa reutilizar?",
                    options: ["Usar algo otra vez", "Botar todo", "Comprar más", "Romper objetos"],
                    correct: 0
                },
                {
                    question: "¿Qué objeto puede convertirse en maceta?",
                    options: ["Botella plástica", "Papel mojado", "Comida dañada", "Polvo"],
                    correct: 0
                },
                {
                    question: "¿Cuál opción reduce basura?",
                    options: ["Usar bolsa reutilizable", "Usar bolsas desechables", "Comprar sin pensar", "Tirar envases"],
                    correct: 0
                },
                {
                    question: "¿Qué debe hacerse con el papel limpio?",
                    options: ["Reciclarlo", "Quemarlo", "Mojarlo", "Botarlo al suelo"],
                    correct: 0
                }
            ],
            C: [
                {
                    question: "¿Qué color representa normalmente lo ecológico?",
                    options: ["Verde", "Negro", "Gris", "Rojo"],
                    correct: 0
                },
                {
                    question: "¿Qué ayuda a cuidar las plantas?",
                    options: ["Regarlas correctamente", "Arrancarlas", "Pisarlas", "Dejarlas sin luz"],
                    correct: 0
                },
                {
                    question: "¿Cuál acción es positiva?",
                    options: ["Recoger basura", "Tirar basura", "Quemar plástico", "Desperdiciar agua"],
                    correct: 0
                },
                {
                    question: "¿Qué puede hacerse con cartón limpio?",
                    options: ["Reciclar o reutilizar", "Tirarlo al río", "Quemarlo siempre", "Mezclarlo con comida"],
                    correct: 0
                },
                {
                    question: "¿Qué objeto sirve para hacer manualidades recicladas?",
                    options: ["Tapas plásticas", "Basura orgánica podrida", "Aceite usado", "Humo"],
                    correct: 0
                }
            ]
        }
    },

    intermedia: {
        name: "Intermedia",
        icon: "fa-recycle",
        className: "intermedia",
        points: 20,
        description: "Preguntas sobre impacto ambiental, consumo y reutilización.",
        groups: {
            A: [
                {
                    question: "¿Cuál de estos materiales tarda más tiempo en degradarse?",
                    options: ["Papel", "Plástico", "Cáscara de fruta", "Cartón"],
                    correct: 1
                },
                {
                    question: "¿Por qué es importante reutilizar materiales?",
                    options: ["Para reducir residuos y consumo", "Para generar más basura", "Para contaminar más", "Para gastar recursos"],
                    correct: 0
                },
                {
                    question: "¿Qué significa separar residuos en origen?",
                    options: ["Clasificar desde casa o escuela", "Mezclar todo", "Tirar todo junto", "Quemar basura"],
                    correct: 0
                },
                {
                    question: "¿Qué medio de transporte contamina menos?",
                    options: ["Bicicleta", "Motocicleta", "Carro particular", "Camioneta"],
                    correct: 0
                },
                {
                    question: "¿Qué representa el jardín virtual en Eco-Retos?",
                    options: ["El progreso ambiental del usuario", "Un adorno visual", "Un juego sin relación", "Una imagen fija"],
                    correct: 0
                }
            ],
            B: [
                {
                    question: "¿Qué práctica reduce el uso de plástico?",
                    options: ["Usar botella reutilizable", "Comprar botellas diario", "Usar más pajillas", "Botar envases"],
                    correct: 0
                },
                {
                    question: "¿Qué material se usa para hacer compost?",
                    options: ["Residuos orgánicos", "Vidrio roto", "Plástico duro", "Metal oxidado"],
                    correct: 0
                },
                {
                    question: "¿Qué acción mejora el reciclaje?",
                    options: ["Limpiar envases antes de reciclar", "Mezclar comida con papel", "Quemar residuos", "Tirar todo junto"],
                    correct: 0
                },
                {
                    question: "¿Cuál es una forma de ahorrar energía?",
                    options: ["Apagar luces innecesarias", "Dejar todo encendido", "Abrir la refrigeradora siempre", "Usar más aparatos"],
                    correct: 0
                },
                {
                    question: "¿Qué se logra al reducir residuos?",
                    options: ["Menos contaminación", "Más basura", "Más humo", "Más desperdicio"],
                    correct: 0
                }
            ],
            C: [
                {
                    question: "¿Qué significa consumo responsable?",
                    options: ["Comprar solo lo necesario", "Comprar sin medir", "Desperdiciar productos", "Tirar lo reutilizable"],
                    correct: 0
                },
                {
                    question: "¿Qué material puede reciclarse muchas veces?",
                    options: ["Vidrio", "Comida dañada", "Papel sucio", "Cáscara"],
                    correct: 0
                },
                {
                    question: "¿Qué actividad ayuda en la escuela?",
                    options: ["Separar residuos en recipientes", "Tirar basura en el aula", "Desperdiciar papel", "Romper plantas"],
                    correct: 0
                },
                {
                    question: "¿Por qué conviene reparar objetos?",
                    options: ["Evita comprar y botar más", "Genera más residuos", "Aumenta contaminación", "Destruye recursos"],
                    correct: 0
                },
                {
                    question: "¿Qué material es útil para un organizador reciclado?",
                    options: ["Cartón limpio", "Aceite quemado", "Humo", "Agua contaminada"],
                    correct: 0
                }
            ]
        }
    },

    dificil: {
        name: "Difícil",
        icon: "fa-earth-americas",
        className: "dificil",
        points: 35,
        description: "Preguntas más avanzadas sobre sostenibilidad y ambiente.",
        groups: {
            A: [
                {
                    question: "¿Cuál es una consecuencia del exceso de plástico en ecosistemas?",
                    options: ["Contamina suelos y cuerpos de agua", "Aumenta la biodiversidad", "Mejora el aire", "Hace crecer árboles"],
                    correct: 0
                },
                {
                    question: "¿Qué principio resume mejor la economía circular?",
                    options: ["Reducir, reutilizar y reciclar", "Usar y tirar", "Extraer más recursos", "Comprar sin límite"],
                    correct: 0
                },
                {
                    question: "¿Por qué el compostaje ayuda al ambiente?",
                    options: ["Convierte residuos orgánicos en abono", "Produce más plástico", "Aumenta tóxicos", "Impide reciclar"],
                    correct: 0
                },
                {
                    question: "¿Qué acción reduce mejor la huella ambiental diaria?",
                    options: ["Reutilizar materiales y ahorrar energía", "Consumir sin plan", "Usar desechables", "Tirar mezclado"],
                    correct: 0
                },
                {
                    question: "¿Qué problema causa quemar basura plástica?",
                    options: ["Libera contaminantes al aire", "Purifica el ambiente", "Elimina todo riesgo", "Mejora el suelo"],
                    correct: 0
                }
            ],
            B: [
                {
                    question: "¿Qué busca la sostenibilidad?",
                    options: ["Cubrir necesidades actuales sin dañar el futuro", "Consumir todo rápido", "Agotar recursos", "Ignorar el ambiente"],
                    correct: 0
                },
                {
                    question: "¿Qué es la huella de carbono?",
                    options: ["Emisiones asociadas a actividades humanas", "Una marca en el suelo", "Tipo de abono", "Un residuo orgánico"],
                    correct: 0
                },
                {
                    question: "¿Qué acción reduce emisiones?",
                    options: ["Usar transporte público o bicicleta", "Usar carro para todo", "Quemar basura", "Desperdiciar energía"],
                    correct: 0
                },
                {
                    question: "¿Por qué afecta la deforestación?",
                    options: ["Reduce hábitats y captura de carbono", "Aumenta bosques", "Mejora ríos", "Elimina contaminación"],
                    correct: 0
                },
                {
                    question: "¿Qué mejora la gestión de residuos?",
                    options: ["Separación, reducción y reciclaje", "Mezclar todo", "Quemar residuos", "Tirar a cauces"],
                    correct: 0
                }
            ],
            C: [
                {
                    question: "¿Qué es biodiversidad?",
                    options: ["Variedad de seres vivos en un ecosistema", "Cantidad de basura", "Nivel de humo", "Uso de plástico"],
                    correct: 0
                },
                {
                    question: "¿Qué puede causar contaminación del agua?",
                    options: ["Desechar químicos y basura en ríos", "Plantar árboles", "Separar residuos", "Ahorrar agua"],
                    correct: 0
                },
                {
                    question: "¿Qué es eficiencia energética?",
                    options: ["Usar menos energía para lograr el mismo resultado", "Gastar más luz", "Dejar aparatos encendidos", "Aumentar consumo"],
                    correct: 0
                },
                {
                    question: "¿Qué relación tiene reciclar con recursos naturales?",
                    options: ["Reduce la extracción de materia prima", "Aumenta la tala", "Impide reutilizar", "No tiene relación"],
                    correct: 0
                },
                {
                    question: "¿Qué acción es más sostenible?",
                    options: ["Reducir antes que reciclar", "Comprar y botar", "Usar desechables", "Desperdiciar materiales"],
                    correct: 0
                }
            ]
        }
    }
};

let selectedCategory = null;
let selectedGroup = null;
let currentIndex = 0;
let score = 0;
let answered = false;
let answeredQuestions = [];
let triviaCompleted = false;

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

function getAllStates() {
    const states = localStorage.getItem(TRIVIA_STATE_KEY);
    return states ? JSON.parse(states) : {};
}

function saveAllStates(states) {
    localStorage.setItem(TRIVIA_STATE_KEY, JSON.stringify(states));
}

function getStateKey(categoryId, groupId) {
    return categoryId + "_" + groupId;
}

function getGroupState(categoryId, groupId) {
    const states = getAllStates();
    const key = getStateKey(categoryId, groupId);

    if (states[key]) {
        return states[key];
    }

    return {
        currentIndex: 0,
        score: 0,
        answeredQuestions: [],
        completed: false
    };
}

function saveGroupState() {
    if (!selectedCategory || !selectedGroup) {
        return;
    }

    const states = getAllStates();
    const key = getStateKey(selectedCategory, selectedGroup);

    states[key] = {
        currentIndex: currentIndex,
        score: score,
        answeredQuestions: answeredQuestions,
        completed: triviaCompleted
    };

    saveAllStates(states);
}

function resetGroupState(categoryId, groupId) {
    const states = getAllStates();
    const key = getStateKey(categoryId, groupId);

    states[key] = {
        currentIndex: 0,
        score: 0,
        answeredQuestions: [],
        completed: false
    };

    saveAllStates(states);
}

function getGroupStatus(categoryId, groupId) {
    const category = triviaData[categoryId];
    const state = getGroupState(categoryId, groupId);

    if (state.completed) {
        return {
            text: "Completado",
            className: "completed"
        };
    }

    if (
        state.currentIndex > 0 ||
        (Array.isArray(state.answeredQuestions) && state.answeredQuestions.length > 0)
    ) {
        return {
            text: "En progreso",
            className: "progress"
        };
    }

    return {
        text: "Sin iniciar",
        className: "pending"
    };
}

function showCategoryBox() {
    selectedCategory = null;
    selectedGroup = null;

    categoryBox.classList.remove("hidden");
    groupBox.classList.add("hidden");
    triviaCard.classList.add("hidden");
    resultBox.classList.add("hidden");

    renderCategories();
}

function showGroupBox(categoryId) {
    selectedCategory = categoryId;
    selectedGroup = null;

    categoryBox.classList.add("hidden");
    groupBox.classList.remove("hidden");
    triviaCard.classList.add("hidden");
    resultBox.classList.add("hidden");

    renderGroups(categoryId);
}

function renderCategories() {
    categoryBox.innerHTML = `
        <div class="instruction-card card">
            <h2>Elige una dificultad</h2>
            <p>
                Toca una categoría para entrar. Cada respuesta correcta te dará puntos que podrás usar en la Tienda Eco para comprar materiales.
            </p>
        </div>
    `;

    Object.keys(triviaData).forEach(function(categoryId) {
        const category = triviaData[categoryId];

        const card = document.createElement("article");
        card.className = "category-card card";
        card.dataset.category = categoryId;

        card.innerHTML = `
            <div class="category-icon ${category.className}">
                <i class="fa-solid ${category.icon}"></i>
            </div>

            <div>
                <h2>${category.name}</h2>
                <p>${category.description}</p>
                <span class="${category.className}">
                    +${category.points} pts por respuesta correcta
                </span>

                <div class="enter-label">
                    Entrar
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        `;

        card.addEventListener("click", function() {
            showGroupBox(this.dataset.category);
        });

        categoryBox.appendChild(card);
    });
}

function renderGroups(categoryId) {
    const category = triviaData[categoryId];

    selectedCategoryLabel.textContent =
        category.name + " · +" + category.points + " pts por pregunta";

    groupList.innerHTML = "";

    Object.keys(category.groups).forEach(function(groupId) {
        const status = getGroupStatus(categoryId, groupId);
        const state = getGroupState(categoryId, groupId);
        const totalQuestions = category.groups[groupId].length;
        const answeredCount = Array.isArray(state.answeredQuestions)
            ? state.answeredQuestions.length
            : 0;

        const card = document.createElement("article");
        card.className = "group-card card";
        card.dataset.group = groupId;

        card.innerHTML = `
            <div class="group-icon ${category.className}">
                <i class="fa-solid fa-layer-group"></i>
            </div>

            <div>
                <h2>Grupo ${groupId}</h2>
                <p>${answeredCount}/${totalQuestions} preguntas respondidas · Puntaje del grupo: ${state.score || 0}</p>
                <span class="group-status ${status.className}">
                    ${status.text}
                </span>

                <div class="enter-label">
                    ${status.className === "progress" ? "Continuar" : status.className === "completed" ? "Ver resultado" : "Iniciar"}
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        `;

        card.addEventListener("click", function() {
            loadGroup(categoryId, this.dataset.group);
        });

        groupList.appendChild(card);
    });
}

function loadGroup(categoryId, groupId) {
    selectedCategory = categoryId;
    selectedGroup = groupId;

    const state = getGroupState(categoryId, groupId);

    currentIndex = state.currentIndex || 0;
    score = state.score || 0;
    answeredQuestions = Array.isArray(state.answeredQuestions)
        ? state.answeredQuestions
        : [];
    triviaCompleted = state.completed || false;

    const questions = triviaData[selectedCategory].groups[selectedGroup];

    if (currentIndex >= questions.length) {
        triviaCompleted = true;
    }

    categoryBox.classList.add("hidden");
    groupBox.classList.add("hidden");

    if (triviaCompleted) {
        showResult();
    } else {
        resultBox.classList.add("hidden");
        triviaCard.classList.remove("hidden");
        renderQuestion();
    }
}

function goToNextAvailableQuestion() {
    const questions = triviaData[selectedCategory].groups[selectedGroup];

    while (
        currentIndex < questions.length &&
        answeredQuestions.includes(currentIndex)
    ) {
        currentIndex++;
    }

    if (currentIndex >= questions.length) {
        finishTrivia();
        return;
    }

    saveGroupState();
    renderQuestion();
}

function renderQuestion() {
    if (!selectedCategory || !selectedGroup) {
        showCategoryBox();
        return;
    }

    if (triviaCompleted) {
        showResult();
        return;
    }

    const category = triviaData[selectedCategory];
    const questions = category.groups[selectedGroup];

    if (currentIndex >= questions.length) {
        finishTrivia();
        return;
    }

    if (answeredQuestions.includes(currentIndex)) {
        goToNextAvailableQuestion();
        return;
    }

    answered = false;

    const current = questions[currentIndex];

    questionNumber.textContent =
        "Pregunta " + (currentIndex + 1) + " de " + questions.length;

    questionPoints.textContent =
        "+" + category.points + " pts";

    difficultyLabel.textContent =
        category.name + " · Grupo " + selectedGroup;

    difficultyLabel.className =
        "difficulty-label " + category.className;

    progressFill.style.width =
        (((currentIndex + 1) / questions.length) * 100) + "%";

    questionText.textContent = current.question;

    optionsBox.innerHTML = "";

    current.options.forEach(function(option, index) {
        const button = document.createElement("button");

        button.className = "option-btn";

        button.innerHTML = `
            <span>${option}</span>
            <i class="fa-solid fa-chevron-right"></i>
        `;

        button.addEventListener("click", function() {
            selectAnswer(index, button);
        });

        optionsBox.appendChild(button);
    });

    saveGroupState();
}

function selectAnswer(selectedIndex, selectedButton) {
    if (answered || !selectedCategory || !selectedGroup) {
        return;
    }

    answered = true;

    const category = triviaData[selectedCategory];
    const current = category.groups[selectedGroup][currentIndex];
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(function(button) {
        button.disabled = true;
    });

    if (!answeredQuestions.includes(currentIndex)) {
        answeredQuestions.push(currentIndex);
    }

    if (selectedIndex === current.correct) {
        selectedButton.classList.add("correct");
        selectedButton.querySelector("i").className = "fa-solid fa-check";

        score += category.points;

        user.puntos = (user.puntos || 0) + category.points;
        user.nivel = calculateLevel(user.puntos || 0);

        updateUser(user);
    } else {
        selectedButton.classList.add("wrong");
        selectedButton.querySelector("i").className = "fa-solid fa-xmark";

        buttons[current.correct].classList.add("correct");
        buttons[current.correct].querySelector("i").className = "fa-solid fa-check";
    }

    saveGroupState();

    setTimeout(function() {
        currentIndex++;

        const questions = triviaData[selectedCategory].groups[selectedGroup];

        if (currentIndex >= questions.length) {
            finishTrivia();
        } else {
            saveGroupState();
            renderQuestion();
        }
    }, 900);
}

function showResult() {
    if (!selectedCategory || !selectedGroup) {
        showCategoryBox();
        return;
    }

    const category = triviaData[selectedCategory];

    triviaCard.classList.add("hidden");
    categoryBox.classList.add("hidden");
    groupBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    resultCategory.textContent =
        category.name + " · Grupo " + selectedGroup;

    scoreText.textContent = score;
}

function finishTrivia() {
    if (!selectedCategory || !selectedGroup) {
        return;
    }

    const questions = triviaData[selectedCategory].groups[selectedGroup];

    triviaCompleted = true;
    currentIndex = questions.length;

    saveGroupState();
    showResult();
}

backToCategoriesBtn.addEventListener("click", function() {
    showCategoryBox();
});

restartBtn.addEventListener("click", function() {
    if (!selectedCategory || !selectedGroup) {
        showCategoryBox();
        return;
    }

    const categoryId = selectedCategory;
    const groupId = selectedGroup;

    resetGroupState(categoryId, groupId);
    loadGroup(categoryId, groupId);
});

changeGroupBtn.addEventListener("click", function() {
    if (!selectedCategory) {
        showCategoryBox();
        return;
    }

    showGroupBox(selectedCategory);
});

changeCategoryBtn.addEventListener("click", function() {
    showCategoryBox();
});

showCategoryBox();