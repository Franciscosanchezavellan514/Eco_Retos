redirectIfLogged();

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Complete todos los campos");
        return;
    }

    if (email === "demo@ecoretos.com" && password === "123456") {
        saveSession({
            nombre: "Estudiante Eco",
            email: "demo@ecoretos.com",
            nivel: 1,
            puntos: 0,
            retos: 0,
            racha: 0
        });

        window.location.href = "../../index.html";
        return;
    }

    const registeredUser = getRegisteredUser();

    if (!registeredUser) {
        alert("No existe una cuenta registrada. Primero debe registrarse.");
        window.location.href = "../signup/signup.html";
        return;
    }

    if (
        email !== registeredUser.email ||
        password !== registeredUser.password
    ) {
        alert("Correo o contraseña incorrectos");
        return;
    }

    saveSession({
        nombre: registeredUser.nombre,
        email: registeredUser.email,
        nivel: registeredUser.nivel || 1,
        puntos: registeredUser.puntos || 0,
        retos: registeredUser.retos || 0,
        racha: registeredUser.racha || 0
    });

    window.location.href = "../../index.html";
});