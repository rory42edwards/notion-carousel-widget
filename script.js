// Firebase setup
const firebaseConfig = { 
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
