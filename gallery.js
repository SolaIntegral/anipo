const gallery = document.getElementById('photo-gallery');
const storedData = JSON.parse(localStorage.getItem('garbageData')) || [];

storedData.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('photo-item');
    div.innerHTML = `
        <img src="${item.image}" alt="写真">
        <p>場所: ${item.location}</p>
        <p>種類: ${item.type}</p>
        <p>日付: ${item.date}</p>
    `;
    gallery.appendChild(div);
});
