const confirmPhoto = document.getElementById('confirm-photo');
const analyzedType = document.getElementById('analyzed-type');

function navigateTo(page) {
    window.location.href = page;
}

const imageData = localStorage.getItem('currentPhoto');
if (imageData) {
    confirmPhoto.src = imageData;
    localStorage.setItem('analyzePhoto', imageData);
}
