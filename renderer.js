const fs = require('fs');
const path = require('path');

// مسار حفظ الملفات
const SAVE_PATH = 'D:\\AI\\PNG JSON\\AI\\Image\\PNG';

// التحقق من وجود المسار وإنشاؤه إذا لم يكن موجودًا
if (!fs.existsSync(SAVE_PATH)) {
    fs.mkdirSync(SAVE_PATH, { recursive: true });
}

// عرض البطاقات
const gallery = document.getElementById('card-gallery');
let cardsData = [];

// إنشاء بطاقة جديدة
document.getElementById('add-card-btn').addEventListener('click', () => {
    const newIndex = cardsData.length;
    cardsData.push({ text: '', image: '' });
    createCard('', '', newIndex);
});

// حفظ البيانات
document.getElementById('save-data-btn').addEventListener('click', () => {
    cardsData.forEach((card, index) => {
        if (card.image) {
            const base64Data = card.image.split(';base64,').pop();
            const imagePath = path.join(SAVE_PATH, `image_${index}.png`);
            fs.writeFileSync(imagePath, base64Data, { encoding: 'base64' });
        }
    });

    const jsonData = JSON.stringify(cardsData, null, 2);
    const jsonPath = path.join(SAVE_PATH, 'cards_data.json');
    fs.writeFileSync(jsonPath, jsonData);

    alert('تم حفظ البيانات بنجاح!');
});

// إنشاء بطاقة جديدة
function createCard(text = '', image = '', index = null) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;

    card.innerHTML = `
        <textarea class="prompt-input">${text}</textarea>
        <input type="file" class="image-upload" accept="image/*">
        <img class="image-preview" src="${image}" alt="معاينة الصورة" style="${image ? '' : 'display: none;'}">
        <button class="delete-btn">🗑️ حذف البطاقة</button>
    `;
    gallery.appendChild(card);

    // معالجة رفع الصور
    const fileInput = card.querySelector('.image-upload');
    const imagePreview = card.querySelector('.image-preview');

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                cardsData[index].image = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // تحديث النص
    const promptInput = card.querySelector('.prompt-input');
    promptInput.addEventListener('input', () => {
        cardsData[index].text = promptInput.value;
    });

    // حذف البطاقة
    card.querySelector('.delete-btn').addEventListener('click', () => {
        cardsData.splice(index, 1);
        renderCards();
    });
}

// إعادة عرض البطاقات
function renderCards() {
    gallery.innerHTML = '';
    cardsData.forEach((card, index) => {
        createCard(card.text, card.image, index);
    });
}