const AUTH_KEY = "ecoRetosAuth";
const USER_KEY = "ecoRetosUser";
const REGISTER_KEY = "ecoRetosRegisteredUser";

function getAuthStatus() {
    return localStorage.getItem(AUTH_KEY) === "true";
}

function getCurrentUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
}

function getRegisteredUser() {
    const user = localStorage.getItem(REGISTER_KEY);
    return user ? JSON.parse(user) : null;
}

function saveRegisteredUser(user) {
    localStorage.setItem(REGISTER_KEY, JSON.stringify(user));
}

function saveSession(user) {
    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function updateCurrentUser(updatedUser) {
    saveSession(updatedUser);

    const registeredUser = getRegisteredUser();

    if (registeredUser && registeredUser.email === updatedUser.email) {
        saveRegisteredUser(updatedUser);
    }
}

function closeSession() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = getLoginPath();
}

function getLoginPath() {
    const path = window.location.pathname;

    if (path.includes("/admin/")) {
        return "../../auth/login/login.html";
    }

    if (path.includes("/auth/")) {
        return "./login.html";
    }

    return "./auth/login/login.html";
}

function getHomePath() {
    const path = window.location.pathname;

    if (path.includes("/auth/login/") || path.includes("/auth/signup/")) {
        return "../../index.html";
    }

    if (path.includes("/admin/")) {
        return "../../index.html";
    }

    return "./index.html";
}

function registrarRachaLogin() {
    const user = getCurrentUser();

    if (!user) {
        return;
    }

    const hoy = new Date();
    const hoyStr = hoy.toISOString().slice(0, 10);

    if (user.ultimoLogin === hoyStr) {
        return;
    }

    let nuevaRacha = 1;

    if (user.ultimoLogin) {
        const anteriorTime = new Date(user.ultimoLogin).setHours(0, 0, 0, 0);
        const hoyTime = new Date().setHours(0, 0, 0, 0);
        const diffDias = Math.round((hoyTime - anteriorTime) / 86400000);

        if (diffDias === 1) {
            nuevaRacha = (user.racha || 0) + 1;
        } else {
            nuevaRacha = 1;
        }
    }

    user.racha = nuevaRacha;
    user.mejorRacha = Math.max(user.mejorRacha || 0, nuevaRacha);
    user.diasActivos = (user.diasActivos || 0) + 1;
    user.ultimoLogin = hoyStr;

    updateCurrentUser(user);
}

function protectPage() {
    if (!getAuthStatus()) {
        window.location.href = getLoginPath();
        return;
    }

    registrarRachaLogin();
}

function protectRootPage() {
    if (!getAuthStatus()) {
        window.location.href = "./auth/login/login.html";
        return;
    }

    registrarRachaLogin();
}

function redirectIfLogged() {
    if (getAuthStatus()) {
        window.location.href = getHomePath();
    }
}