const confirmPhoto = document.getElementById('confirm-photo');
const analyzedType = document.getElementById('analyzed-type');

const imageData = localStorage.getItem('currentPhoto');
if (imageData) {
    confirmPhoto.src = imageData;
    localStorage.setItem('analyzePhoto', imageData);
}
