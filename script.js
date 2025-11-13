

// Кнопка "Наверх"
const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Аккордеон
const accItems = document.querySelectorAll('.accordion-item');

accItems.forEach(item => {
  const title = item.querySelector('.accordion-title');
  title.addEventListener('click', () => {
    // Закрыть все остальные
    accItems.forEach(i => {
      if (i !== item) i.querySelector('.accordion-content').style.display = 'none';
    });
    // Переключить текущий
    const content = item.querySelector('.accordion-content');
    content.style.display = (content.style.display === 'block') ? 'none' : 'block';
  });
});
// Контейнер для динамических изображений
const imagesContainer = document.getElementById('images');

// Галерея с фильтром (чтобы не мешать динамическим картинкам)
const filterBtns = document.querySelectorAll('.filters button');
const galleryItems = document.querySelectorAll('#gallery .gallery img');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    galleryItems.forEach(img => {
      if(category === 'all' || img.dataset.category === category) {
        img.style.display = 'inline-block';
      } else {
        img.style.display = 'none';
      }
    });
  });
});

// Модальное окно для фильтр-галереи
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.close');

galleryItems.forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if(e.target === modal) modal.style.display = 'none';
});

// Переключатель темы с сохранением в localStorage
const themeToggleBtn = document.getElementById('themeToggleBtn');
const currentTheme = localStorage.getItem('theme');

// При загрузке страницы применяем сохранённую тему
if (currentTheme === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggleBtn.textContent = '☀️ Светлая тема';
}

// Обработчик на кнопку
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');

  // Сохраняем выбор пользователя
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Меняем текст кнопки
  themeToggleBtn.textContent = isDark ? '☀️ Светлая тема' : '🌙 Темная тема';
});
// ====== Отзывы с API ======
document.addEventListener('DOMContentLoaded', () => {
  const reviewTextEl = document.getElementById('reviewText');
  const prevBtn = document.getElementById('prevReview');
  const nextBtn = document.getElementById('nextReview');

  let reviews = [];
  let currentIndex = 0;

  async function fetchQuote() {
    try {
      const res = await fetch('https://api.quotable.io/random');
      if (!res.ok) throw new Error("Ошибка сервера: " + res.status);
      const data = await res.json();
      return `"${data.content}" — ${data.author}`;
    } catch (err) {
      console.error("fetchQuote error:", err);
      return "Отзыв недоступен. Попробуйте обновить страницу.";
    }
  }

  async function loadReviews(count = 5) {
    reviewTextEl.textContent = "Загрузка отзывов...";
    reviews = [];

    const promises = Array.from({length: count}, () => fetchQuote());
    const results = await Promise.allSettled(promises);

    results.forEach(r => {
      if (r.status === 'fulfilled') reviews.push(r.value);
      else reviews.push("Отзыв недоступен.");
    });

    currentIndex = 0;
    displayReview(currentIndex);
  }

  function displayReview(index) {
    if (reviews.length === 0) {
      reviewTextEl.textContent = "Отзывы недоступны.";
      prevBtn.disabled = true;
      nextBtn.disabled = true;
    } else {
      reviewTextEl.textContent = reviews[index];
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }
  }

  prevBtn.addEventListener('click', () => {
    if (reviews.length === 0) return;
    currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    displayReview(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    if (reviews.length === 0) return;
    currentIndex = (currentIndex + 1) % reviews.length;
    displayReview(currentIndex);
  });

  loadReviews(5);
});



// Функция для подгрузки случайных изображений
async function loadRandomImages(count = 6) {
  imagesContainer.innerHTML = "Загрузка изображений..."; // показываем статус
  const promises = [];

  for (let i = 0; i < count; i++) {
    // Picsum.photos возвращает случайное изображение по url
    const url = `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`;
    // Превращаем url в HTML-элемент img
    promises.push(new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.alt = `Случайное изображение ${i+1}`;
      img.classList.add('gallery-img');
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    }));
  }

  // Ждем все изображения
  const loadedImages = await Promise.all(promises);

  // Очищаем контейнер и вставляем изображения
  imagesContainer.innerHTML = "";
  loadedImages.forEach(img => {
    if (img) imagesContainer.appendChild(img);
  });

  // Если ни одно изображение не загрузилось
  if (loadedImages.every(img => img === null)) {
    imagesContainer.textContent = "Изображения недоступны. Попробуйте обновить страницу.";
  }
}

// Загружаем при старте
loadRandomImages(6);
