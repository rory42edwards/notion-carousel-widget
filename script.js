const images = ["image1.jpg", "image2.jpg", "image3.jpg"]; // Add your images here
let index = 0;

document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % images.length;
    document.getElementById("image").src = images[index];
});

document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    document.getElementById("image").src = images[index];
});
