const video = document.getElementById('camera');
const canvas = document.getElementById('snapshot');
const fileInput = document.getElementById('file-input');
const useCameraButton = document.getElementById('use-camera');
const useGalleryButton = document.getElementById('use-gallery');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => console.error(err));

useCameraButton.addEventListener('click', () => {
    video.style.display = 'block';
    fileInput.style.display = 'none';
});

useGalleryButton.addEventListener('click', () => {
    fileInput.style.display = 'block';
    video.style.display = 'none';
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const imageData = reader.result;
            localStorage.setItem('currentPhoto', imageData);
            window.location.href = 'confirmation.html';
        };
        reader.readAsDataURL(file);
    }
});

const captureButton = document.getElementById('capture');
captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL();
    localStorage.setItem('currentPhoto', imageData);
    window.location.href = 'confirmation.html';
});