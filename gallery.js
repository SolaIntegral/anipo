const galleryContainer = document.getElementById('gallery');
const savedGallery = JSON.parse(localStorage.getItem('gallery')) || [];
savedGallery.forEach(image => {
    const frame = document.createElement('div');
    frame.classList.add('frame');
    const img = document.createElement('img');
    img.src = image;
    frame.appendChild(img);
    galleryContainer.appendChild(frame);
});


function navigateTo(page) {
    window.location.href = page;
}