// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
// Firebase setup
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpLzSMn1vLaBXj1Fgl2a27Kgn8R9blh7c",
  authDomain: "notion-carousel-widget.firebaseapp.com",
  projectId: "notion-carousel-widget",
  storageBucket: "notion-carousel-widget.firebasestorage.app",
  messagingSenderId: "508992754049",
  appId: "1:508992754049:web:4344e425b9fbb638635880",
  measurementId: "G-YK3QK31SH1"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

let images = [];
let index = 0;

// Function to display images in the carousel
function updateCarousel() {
    if (images.length > 0) {
        document.getElementById("image").src = images[index];
    }
}

// Handle file upload
document.getElementById("uploadBtn").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;

    for (let file of files) {
        const fileRef = ref(storage, `uploads/${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        images.push(url);
    }

    // Show the first image after upload
    updateCarousel();
});

// Next & Previous buttons for carousel
document.getElementById("next").addEventListener("click", () => {
    if (images.length > 0) {
        index = (index + 1) % images.length;
        updateCarousel();
    }
});

document.getElementById("prev").addEventListener("click", () => {
    if (images.length > 0) {
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
    }
});

