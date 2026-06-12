redirectIfLogged();

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const terms = document.getElementById("terms").checked;

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        alert("Complete todos los campos");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    if (!terms) {
        alert("Debe aceptar los términos y la política de privacidad");
        return;
    }

    const registeredUser = {
        nombre: name,
        email: email,
        password: password,
        nivel: 1,
        puntos: 0,
        retos: 0,
        racha: 0
    };

    saveRegisteredUser(registeredUser);

    saveSession({
        nombre: name,
        email: email,
        nivel: 1,
        puntos: 0,
        retos: 0,
        racha: 0
    });

    window.location.href = "../index.html";
});