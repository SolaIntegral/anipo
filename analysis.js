const analyzedPhoto = document.getElementById('animal-photo');
const garbageType = document.getElementById('garbage-type');
const garbageDescription = document.getElementById('garbage-description');
const environmentalImpact = document.getElementById('environmental-impact');

const analyzePhoto = localStorage.getItem('analyzePhoto');
const gallery = JSON.parse(localStorage.getItem('gallery')) || [];

const animalImages = [
    "fall-whale.png",
    "sp-penguin.png",
    "sum-tirtle.png",
    "winter-otto.png"
];

if (analyzePhoto) {
    const apiKey = "AIzaSyCEjKKgfz9bXYnBAsw6lzBACxH7r8iIdOU";
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

            const randomAnimal = animalImages[Math.floor(Math.random() * animalImages.length)];
            analyzedPhoto.src = randomAnimal;

            gallery.push(randomAnimal);
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