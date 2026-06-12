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

function closeSession() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = getLoginPath();
}

function getLoginPath() {
    const path = window.location.pathname;

    if (path.includes("/admin/")) {
        return "../../auth/login.html";
    }

    if (path.includes("/auth/")) {
        return "./login.html";
    }

    return "./auth/login.html";
}

function getHomePath() {
    const path = window.location.pathname;

    if (path.includes("/auth/")) {
        return "../index.html";
    }

    if (path.includes("/admin/")) {
        return "../../index.html";
    }

    return "./index.html";
}

function protectPage() {
    if (!getAuthStatus()) {
        window.location.href = getLoginPath();
    }
}

function protectRootPage() {
    if (!getAuthStatus()) {
        window.location.href = "./auth/login.html";
    }
}

function redirectIfLogged() {
    if (getAuthStatus()) {
        window.location.href = getHomePath();
    }
}