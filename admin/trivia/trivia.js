protectPage();

let user = getCurrentUser();

const questionNumber = document.getElementById("questionNumber");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("optionsBox");
const resultBox = document.getElementById("resultBox");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");

const TRIVIA_STATE_KEY = "ecoRetosTriviaState";
const POINTS_PER_QUESTION = 20;

const questions = [
    {
        question: "¿Cuál de estos materiales tarda más tiempo en degradarse?",
        options: ["Papel", "Plástico", "Cáscara de fruta", "Cartón"],
        correct: 1
    },
    {
        question: "¿Qué acción ayuda a reducir el consumo de agua?",
        options: ["Dejar el grifo abierto", "Cerrar el grifo al cepillarse", "Lavar con manguera", "Usar más agua caliente"],
        correct: 1
    },
    {
        question: "¿Cuál es una práctica correcta de reciclaje?",
        options: ["Mezclar toda la basura", "Quemar residuos", "Separar plástico, papel y orgánico", "Tirar botellas al suelo"],
        correct: 2
    },
    {
        question: "¿Qué medio de transporte contamina menos?",
        options: ["Bicicleta", "Motocicleta", "Carro particular", "Camioneta"],
        correct: 0
    },
    {
        question: "¿Qué representa el jardín virtual en Eco-Retos?",
        options: ["Un adorno visual", "El progreso ambiental del usuario", "Un juego sin relación", "Una imagen fija"],
        correct: 1
    }
];

let currentIndex = 0;
let score = 0;
let answered = false;
let answeredQuestions = [];
let triviaCompleted = false;

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

function getTriviaState() {
    const state = localStorage.getItem(TRIVIA_STATE_KEY);

    if (state) {
        return JSON.parse(state);
    }

    return {
        currentIndex: 0,
        score: 0,
        answeredQuestions: [],
        completed: false
    };
}

function saveTriviaState() {
    const state = {
        currentIndex: currentIndex,
        score: score,
        answeredQuestions: answeredQuestions,
        completed: triviaCompleted
    };

    localStorage.setItem(TRIVIA_STATE_KEY, JSON.stringify(state));
}

function loadTriviaState() {
    const state = getTriviaState();

    currentIndex = state.currentIndex || 0;
    score = state.score || 0;
    answeredQuestions = Array.isArray(state.answeredQuestions)
        ? state.answeredQuestions
        : [];
    triviaCompleted = state.completed || false;

    if (currentIndex >= questions.length) {
        triviaCompleted = true;
    }
}

function resetTriviaState() {
    currentIndex = 0;
    score = 0;
    answered = false;
    answeredQuestions = [];
    triviaCompleted = false;

    localStorage.setItem(
        TRIVIA_STATE_KEY,
        JSON.stringify({
            currentIndex: 0,
            score: 0,
            answeredQuestions: [],
            completed: false
        })
    );
}

function goToNextAvailableQuestion() {
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

    saveTriviaState();
    renderQuestion();
}

function renderQuestion() {
    if (triviaCompleted) {
        showResult();
        return;
    }

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

    saveTriviaState();
}

function selectAnswer(selectedIndex, selectedButton) {
    if (answered) {
        return;
    }

    answered = true;

    const current = questions[currentIndex];
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

        score += POINTS_PER_QUESTION;

        user.puntos = (user.puntos || 0) + POINTS_PER_QUESTION;
        user.nivel = calculateLevel(user.puntos || 0);

        updateUser(user);
    } else {
        selectedButton.classList.add("wrong");
        selectedButton.querySelector("i").className = "fa-solid fa-xmark";

        buttons[current.correct].classList.add("correct");
        buttons[current.correct].querySelector("i").className = "fa-solid fa-check";
    }

    saveTriviaState();

    setTimeout(function() {
        currentIndex++;

        if (currentIndex >= questions.length) {
            finishTrivia();
        } else {
            saveTriviaState();
            renderQuestion();
        }
    }, 900);
}

function showResult() {
    document.querySelector(".trivia-card").classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreText.textContent = score;
}

function finishTrivia() {
    triviaCompleted = true;
    currentIndex = questions.length;

    saveTriviaState();
    showResult();
}

restartBtn.addEventListener("click", function() {
    resetTriviaState();

    resultBox.classList.add("hidden");
    document.querySelector(".trivia-card").classList.remove("hidden");

    renderQuestion();
});

loadTriviaState();

if (triviaCompleted) {
    showResult();
} else {
    renderQuestion();
}