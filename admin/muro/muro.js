protectPage();

const DEFAULT_AVATAR = "../../assets/images/avatar_202606112038.jpeg";

const user = getCurrentUser();

const postText = document.getElementById("postText");
const publishBtn = document.getElementById("publishBtn");
const postsList = document.getElementById("postsList");

const DEFAULT_POSTS = [
    {
        id: 1,
        author: "Melissa Briones",
        authorPhoto: "",
        text: "Hoy participé en una actividad de limpieza dentro del centro educativo.",
        likes: 12,
        comments: 3,
        liked: false,
        date: "Hace 2 horas"
    },
    {
        id: 2,
        author: "Andrés Calderón",
        authorPhoto: "",
        text: "Clasifiqué residuos en casa separando plástico, papel y orgánicos.",
        likes: 8,
        comments: 1,
        liked: false,
        date: "Hace 5 horas"
    },
    {
        id: 3,
        author: "Francisco Sánchez",
        authorPhoto: "",
        text: "Completé el reto de ahorro de agua durante la mañana.",
        likes: 15,
        comments: 4,
        liked: false,
        date: "Ayer"
    }
];

function getPosts() {
    const posts = localStorage.getItem("ecoRetosPosts");

    if (posts) {
        return JSON.parse(posts);
    }

    localStorage.setItem(
        "ecoRetosPosts",
        JSON.stringify(DEFAULT_POSTS)
    );

    return DEFAULT_POSTS;
}

function savePosts(posts) {
    localStorage.setItem(
        "ecoRetosPosts",
        JSON.stringify(posts)
    );
}

function getPostAvatar(post) {
    if (post.authorPhoto) {
        return post.authorPhoto;
    }

    if (post.author === user?.nombre && user?.fotoPerfil) {
        return user.fotoPerfil;
    }

    return DEFAULT_AVATAR;
}

function renderPosts() {
    const posts = getPosts();

    postsList.innerHTML = "";

    if (posts.length === 0) {
        postsList.innerHTML =
            '<p class="empty-posts">Todavía no hay publicaciones.</p>';
        return;
    }

    posts.forEach(function(post) {
        const card = document.createElement("article");
        card.className = "post-card";

        card.innerHTML = `
            <div class="post-header">

                <div class="post-avatar">
                    <img src="${getPostAvatar(post)}" alt="Avatar de ${post.author}">
                </div>

                <div class="post-user">
                    <h3>${post.author}</h3>
                    <span>${post.date}</span>
                </div>

            </div>

            <p class="post-text">
                ${post.text}
            </p>

            <div class="post-actions">

                <button class="post-action ${post.liked ? "active" : ""}" data-id="${post.id}">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <span>${post.likes}</span>
                </button>

                <button class="post-action">
                    <i class="fa-solid fa-comment"></i>
                    <span>${post.comments}</span>
                </button>

                <button class="post-action">
                    <i class="fa-solid fa-share-nodes"></i>
                    Compartir
                </button>

            </div>
        `;

        postsList.appendChild(card);
    });

    const likeButtons = document.querySelectorAll(".post-action[data-id]");

    likeButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            likePost(Number(this.dataset.id));
        });
    });
}

function likePost(postId) {
    const posts = getPosts();

    const post = posts.find(function(item) {
        return item.id === postId;
    });

    if (!post) {
        return;
    }

    if (post.liked) {
        post.likes--;
        post.liked = false;
    } else {
        post.likes++;
        post.liked = true;
    }

    savePosts(posts);
    renderPosts();
}

publishBtn.addEventListener("click", function() {
    const text = postText.value.trim();

    if (text === "") {
        alert("Escriba una descripción antes de publicar.");
        return;
    }

    const posts = getPosts();

    const newPost = {
        id: Date.now(),
        author: user?.nombre || "Estudiante Eco",
        authorPhoto: user?.fotoPerfil || "",
        text: text,
        likes: 0,
        comments: 0,
        liked: false,
        date: "Ahora"
    };

    posts.unshift(newPost);

    savePosts(posts);

    postText.value = "";

    renderPosts();
});

renderPosts();