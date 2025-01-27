const createdGalleryContainer = document.getElementById('created-gallery');
const gottenGalleryContainer = document.getElementById('gotten-gallery');

// ローカルストレージから画像リストを取得
const createdGallery = JSON.parse(localStorage.getItem('animalImages')) || [];
const gottenGallery = JSON.parse(localStorage.getItem('gallery')) || [];

// ギャラリーを描画
function displayGallery(images, container) {
    container.innerHTML = ''; // 既存の内容をクリア
    images.forEach(image => {
        const frame = document.createElement('div');
        frame.classList.add('frame');
        const img = document.createElement('img');
        img.src = image;
        frame.appendChild(img);
        container.appendChild(frame);
    });
}

// 初期表示
displayGallery(createdGallery, createdGalleryContainer);
displayGallery(gottenGallery, gottenGalleryContainer);

// ページ遷移
function navigateTo(page) {
    window.location.href = page;
}
