// ===========================
// LOADER
// ===========================

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.opacity = "0";

        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 700);

    }, 1200);

});

// ===========================
// ENVELOPE
// ===========================

const envelope = document.getElementById("envelope");
const envelopeSection = document.getElementById("envelope-section");
const content = document.getElementById("content");
const music = document.getElementById("music");

const openButton = document.getElementById("openButton");

openButton.addEventListener("click", () => {

    openButton.style.pointerEvents = "none";

    envelope.classList.add("open");

    if(music){
        music.play().catch(()=>{});
    }

    setTimeout(()=>{

        envelopeSection.style.opacity="0";

        setTimeout(()=>{

            envelopeSection.style.display="none";

            content.style.display="block";

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

        },900);

    },1500);

});

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

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60))
        / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60))
        / 1000);

    document.getElementById("days").innerHTML =
        String(days).padStart(2, "0");

    document.getElementById("hours").innerHTML =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerHTML =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerHTML =
        String(seconds).padStart(2, "0");

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
    threshold: 0.2
});

document.querySelectorAll(
".countdown-section,.timeline,.gallery,.quote,footer"
).forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(60px)";
    section.style.transition = "1s";

    observer.observe(section);

});

// ===========================
// PHOTO PLACEHOLDER
// ===========================

document.querySelectorAll(".photo img").forEach(img => {

    img.onerror = function () {

        this.src =
            "https://placehold.co/700x900/f8f1e7/b88a32?text=Ваше+фото";

    };

});

// ===========================
// OPTIONAL MUSIC BUTTON
// ===========================

if (music) {

    music.volume = 0.4;

}
