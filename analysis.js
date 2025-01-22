const analyzedPhoto = document.getElementById('analyzed-photo');
const garbageType = document.getElementById('garbage-type');
const environmentalImpact = document.getElementById('environmental-impact');

const analyzePhoto = localStorage.getItem('analyzePhoto');
if (analyzePhoto) {
    analyzedPhoto.src = analyzePhoto;

    // Google Vision API を利用した解析例
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
            const detectedType = labels[0]?.description || "不明";
            garbageType.textContent = `ごみの種類: ${detectedType}`;

            // 環境影響の評価例 (仮のロジック)
            const impact = detectedType === "ペットボトル" ? "高い" : "中程度";
            environmentalImpact.textContent = `環境への影響: ${impact}`;
        })
        .catch(err => {
            garbageType.textContent = "解析に失敗しました";
            environmentalImpact.textContent = "影響を計算できませんでした";
            console.error(err);
        });
}