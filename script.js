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
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

let images = [];
let index = 0;

document.getElementById("uploadBtn").addEventListener("click", async () => {
    const files = document.getElementById("fileInput").files;
    for (let file of files) {
        const ref = storage.ref().child(`uploads/${file.name}`);
        await ref.put(file);
        const url = await ref.getDownloadURL();
        images.push(url);
    }
    document.getElementById("image").src = images[0];
});

document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % images.length;
    document.getElementById("image").src = images[index];
});

document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    document.getElementById("image").src = images[index];
});
