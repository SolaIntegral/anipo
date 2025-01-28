const museumGallery = document.getElementById('museum-gallery');

// デフォルト画像リスト
const defaultImages = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
];

// IndexedDBまたはlocalStorageから画像を取得
async function fetchAllAnipo() {
    const allAnipo = JSON.parse(localStorage.getItem('allAnipo')) || [];
    return allAnipo.concat(defaultImages); // デフォルト画像を結合
}

// ギャラリーを描画
function displayMuseumGallery(images) {
    museumGallery.innerHTML = ''; // 既存の内容をクリア
    images.forEach(image => {
        const frame = document.createElement('div');
        frame.classList.add('gallery-item');
        const img = document.createElement('img');
        img.src = image;
        frame.appendChild(img);
        museumGallery.appendChild(frame);
    });
}

// 初期化処理
async function initializeMuseum() {
    const allAnipoImages = await fetchAllAnipo();
    displayMuseumGallery(allAnipoImages);
}

initializeMuseum();

function navigateTo(page) {
    window.location.href = page;
}
