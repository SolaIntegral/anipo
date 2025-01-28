const analyzedPhoto = document.getElementById('animal-photo');
const garbageType = document.getElementById('garbage-type');
const garbageDescription = document.getElementById('garbage-description');
const environmentalImpact = document.getElementById('environmental-impact');

const analyzePhoto = localStorage.getItem('analyzePhoto');
const gallery = JSON.parse(localStorage.getItem('gallery')) || [];

// 公開されているAnipo画像を取得
const allAnipo = JSON.parse(localStorage.getItem('allAnipo')) || [];

if (analyzePhoto) {
    const apiKey = "AIzaSyCEjKKgfz9bXYnBAsw6lzBACxH7r8iIdOU"; // APIキーを設定
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const requestBody = {
        requests: [
            {
                image: { content: analyzePhoto.split(",")[1] },
                features: [{ type: "LABEL_DETECTION", maxResults: 5 }]
            }
        ]
    };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            const labels = data.responses[0].labelAnnotations;
            const translations = {
                "PET Bottle": "ペットボトル",
                "Plastic Bag": "ビニール袋",
                "Aluminum Can": "空き缶",
                "Unknown": "不明"
            };

            const detectedType = translations[labels[0]?.description] || "不明";
            garbageType.textContent = `ごみの種類: ${detectedType}`;
            garbageDescription.textContent = `説明: ${detectedType}はリサイクルできます。`;
            environmentalImpact.textContent = "環境を守ろう！";

            // デフォルト画像のリスト
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

            // デフォルト画像と公開画像を結合
            const combinedImages = allAnipo.concat(defaultImages);

            // 解析結果表示用
            if (combinedImages.length > 0) {
                const randomAnipo = combinedImages[Math.floor(Math.random() * combinedImages.length)];
                analyzedPhoto.src = randomAnipo;
            } else {
                analyzedPhoto.src = "unknown_animal.jpg"; // 公開画像がない場合のデフォルト
            }
            // 保存したランダムAnipoをギャラリーに追加
            gallery.push(analyzedPhoto.src);
            localStorage.setItem('gallery', JSON.stringify(gallery));
        })
        .catch(err => {
            garbageType.textContent = "解析に失敗しました";
            garbageDescription.textContent = "説明がありません";
            environmentalImpact.textContent = "不明";
            analyzedPhoto.src = "unknown_animal.jpg";
        });
}

function navigateTo(page) {
    window.location.href = page;
}


