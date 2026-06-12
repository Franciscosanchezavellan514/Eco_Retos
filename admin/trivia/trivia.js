protectPage();

let user = getCurrentUser();

const questionNumber = document.getElementById("questionNumber");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("optionsBox");
const resultBox = document.getElementById("resultBox");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");

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

function renderQuestion() {
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

    if (selectedIndex === current.correct) {
        selectedButton.classList.add("correct");
        selectedButton.querySelector("i").className = "fa-solid fa-check";
        score += 20;
    } else {
        selectedButton.classList.add("wrong");
        selectedButton.querySelector("i").className = "fa-solid fa-xmark";

        buttons[current.correct].classList.add("correct");
        buttons[current.correct].querySelector("i").className = "fa-solid fa-check";
    }

    setTimeout(function() {
        currentIndex++;

        if (currentIndex >= questions.length) {
            finishTrivia();
        } else {
            renderQuestion();
        }
    }, 900);
}

function finishTrivia() {
    document.querySelector(".trivia-card").classList.add("hidden");
    resultBox.classList.remove("hidden");

    scoreText.textContent = score;

    user.puntos = (user.puntos || 0) + score;

    if (user.puntos >= 800) {
        user.nivel = 5;
    } else if (user.puntos >= 500) {
        user.nivel = 4;
    } else if (user.puntos >= 250) {
        user.nivel = 3;
    } else if (user.puntos >= 100) {
        user.nivel = 2;
    } else {
        user.nivel = 1;
    }

    saveSession(user);

    const registeredUser = getRegisteredUser();

    if (registeredUser) {
        registeredUser.puntos = user.puntos;
        registeredUser.nivel = user.nivel;
        saveRegisteredUser(registeredUser);
    }
}

restartBtn.addEventListener("click", function() {
    currentIndex = 0;
    score = 0;

    resultBox.classList.add("hidden");
    document.querySelector(".trivia-card").classList.remove("hidden");

    renderQuestion();
});

renderQuestion();