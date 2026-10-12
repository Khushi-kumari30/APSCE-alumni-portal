let mediaData = [];

const fileInput = document.getElementById("file");
const preview = document.getElementById("preview");
const gallery = document.getElementById("gallery");

fileInput.addEventListener("change", () => {
    preview.innerHTML = "";
    const file = fileInput.files[0];
    if (!file) return;

    if (file.type.startsWith("image")) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        preview.appendChild(img);
    } else {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.controls = true;
        preview.appendChild(video);
    }
});

function addMedia() {
    const type = document.getElementById("type").value;
    const year = document.getElementById("year").value;
    const file = fileInput.files[0];

    if (!file || !year) {
        alert("Please select file and year");
        return;
    }

    mediaData.push({
        type,
        year,
        url: URL.createObjectURL(file)
    });

    renderGallery(mediaData);
    preview.innerHTML = "";
    fileInput.value = "";
}

function renderGallery(data) {
    gallery.innerHTML = "";
    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.type = item.type;
        card.dataset.year = item.year;

        card.innerHTML = `
            ${item.type === "photo"
                ? `<img src="${item.url}">`
                : `<video src="${item.url}" controls></video>`}
            <p>${item.type.toUpperCase()} | ${item.year}</p>
        `;

        gallery.appendChild(card);
    });
}

function filterMedia(type) {
    document.querySelectorAll(".card").forEach(card => {
        card.style.display =
            type === "all" || card.dataset.type === type ? "block" : "none";
    });
}

function filterYear(year) {
    document.querySelectorAll(".card").forEach(card => {
        card.style.display =
            year === "all" || card.dataset.year === year ? "block" : "none";
    });
}