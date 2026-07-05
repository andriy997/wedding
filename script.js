// ===========================
// LOADER
// ===========================

window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 700);
        }
    }, 1200);
});

// ===========================
// ENVELOPE (Анімація повільного роз'їзду на 5.5с)
// ===========================

const openBtn = document.getElementById("openBtn");
const envelopeSection = document.getElementById("envelope-section");
const content = document.getElementById("content");
const music = document.getElementById("music");

if (openBtn && envelopeSection && content) {
    openBtn.addEventListener("click", () => {
        
        // 1. Показуємо контент сайту миттєво під конвертом
        content.style.display = "block";

        // 2. Активуємо анімацію розсування паперових клапанів
        envelopeSection.classList.add("hidden");

        // Запуск музики
        if (music) {
            music.play().catch((err) => {
                console.log("Музику заблоковано браузером до взаємодії", err);
            });
        }

        // 3. Повністю прибираємо верхній шар після того, як листи роз'їдуться (5.5 секунд)
        setTimeout(() => {
    envelopeSection.style.display = "none";
}, 5500); // Таймер синхронізовано на 5.5 секунд
    });
}
// ===========================
// COUNTDOWN
// ===========================

const weddingDate = new Date("2026-08-15T12:45:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Додаємо перевірку на існування елементів, щоб уникнути помилок у консолі
    if (document.getElementById("days")) {
        document.getElementById("days").innerHTML = String(days).padStart(2, "0");
        document.getElementById("hours").innerHTML = String(hours).padStart(2, "0");
        document.getElementById("minutes").innerHTML = String(minutes).padStart(2, "0");
        document.getElementById("seconds").innerHTML = String(seconds).padStart(2, "0");
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===========================
// SCROLL ANIMATION
// ===========================

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(".countdown-section, .timeline, .gallery, .quote, footer").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "opacity 1.2s ease, transform 1.2s ease";
    observer.observe(section);
});

// ===========================
// PHOTO PLACEHOLDER
// ===========================

document.querySelectorAll(".photo img").forEach(img => {
    img.onerror = function () {
        this.src = "https://placehold.co/700x900/f8f1e7/b88a32?text=Ваше+фото";
    };
});

// ===========================
// MUSIC CONFIG
// ===========================

if (music) {
    music.volume = 0.4;
}
window.addEventListener('scroll', positionHeart);
window.addEventListener('resize', positionHeart);
document.addEventListener('DOMContentLoaded', positionHeart);

function positionHeart() {
    const wrapper = document.querySelector('.timeline-wrapper');
    const path = document.getElementById('wave-path');
    const heart = document.getElementById('moving-heart');
    
    if (!wrapper || !path || !heart) return;

    const rect = wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const startTrigger = windowHeight / 2;
    const currentScroll = startTrigger - rect.top;
    let scrollPercent = currentScroll / wrapper.offsetHeight;

    if (scrollPercent < 0) scrollPercent = 0;
    if (scrollPercent > 1) scrollPercent = 1;

    const pathLength = path.getTotalLength();
    const point = path.getPointAtLength(pathLength * scrollPercent);

    const svgRect = path.ownerSVGElement.getBoundingClientRect();
    
    // Масштабування під нову висоту 380
    const scaleX = svgRect.width / 400;
    const scaleY = svgRect.height / 380;

    heart.style.left = `${point.x * scaleX}px`;
    heart.style.top = `${point.y * scaleY}px`;
}
function initFooterCountdown() {
    // Встановлюємо дату: 15 серпня 2026 року, 12:45:00
    const targetDate = new Date("August 15, 2026 12:45:00").getTime();

    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        // Якщо дата вже настала
        if (difference < 0) {
            clearInterval(timerInterval);
            document.getElementById("footer-countdown").innerHTML = "<h3 style='font-family: \"Cormorant Garamond\", serif; font-size: 32px;'>Цей омріяний день настав!</h3>";
            return;
        }

        // Розрахунок днів, годин, хвилин та секунд
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Виведення результату в HTML (з додаванням нуля попереду, якщо цифра менша 10)
        document.getElementById("f-days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("f-hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("f-minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("f-seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }, 1000);
}

// Запускаємо таймер після завантаження сторінки
document.addEventListener("DOMContentLoaded", initFooterCountdown);