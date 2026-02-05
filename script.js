window.addEventListener("load", () => {

    const btn = document.getElementById("musicBtn");
    const music = document.getElementById("bgMusic");

    if (!btn || !music) return;

    btn.addEventListener("click", () => {

        music.volume = 0;
        music.play().catch(()=>{});

        let fade = setInterval(() => {
            if (music.volume < 0.5) music.volume += 0.05;
            else clearInterval(fade);
        }, 200);

        // Hide button after play
        btn.style.display = "none";

    });

});
// Floating hearts everywhere
setInterval(() => {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = Math.random() * 100 + "vh";
    heart.style.fontSize = (Math.random() * 20 + 20) + "px";
    heart.style.pointerEvents = "none";
    heart.style.transition = "all 4s linear";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.transform = "translateY(-80px)";
        heart.style.opacity = "0";
    }, 50);

    setTimeout(() => heart.remove(), 4000);
}, 600);


const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');

    // Show next message
    noButton.textContent = messages[messageIndex];

    // If last message → activate runaway mode
    if (messageIndex === messages.length - 1) {
        activateRunawayNoButton(noButton);
    }

    messageIndex = (messageIndex + 1) % messages.length;

    // Grow Yes button
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function heartsExplosion() {
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = "💖";
        heart.style.position = "fixed";
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.fontSize = (Math.random() * 20 + 20) + "px";
        heart.style.pointerEvents = "none";
        heart.style.transform = "translate(-50%, -50%)";
        heart.style.transition = "all 1s ease-out";

        document.body.appendChild(heart);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 200 + 100;

        setTimeout(() => {
            heart.style.left = `calc(50% + ${Math.cos(angle) * distance}px)`;
            heart.style.top = `calc(50% + ${Math.sin(angle) * distance}px)`;
            heart.style.opacity = "0";
        }, 10);

        setTimeout(() => heart.remove(), 1000);
    }
}

function handleYesClick() {

    // First confetti burst
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });

    // Hearts explosion
    heartsExplosion();

    // Extra confetti bursts
    setTimeout(() => {
        confetti({ particleCount: 80, spread: 120 });
    }, 300);

    setTimeout(() => {
        confetti({ particleCount: 60, spread: 160 });
    }, 600);

    // Redirect after animation
    setTimeout(() => {
        window.location.href = "./yes_page.html";
    }, 1400);
}
function activateRunawayNoButton(button) {

    document.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const dx = rect.left + rect.width/2 - e.clientX;
        const dy = rect.top + rect.height/2 - e.clientY;

        const distance = Math.sqrt(dx*dx + dy*dy);

        // If mouse is close → move button
        if (distance < 150) {
            button.style.position = "fixed";
            button.style.left = Math.random() * (window.innerWidth - 100) + "px";
            button.style.top = Math.random() * (window.innerHeight - 50) + "px";
        }

    });
}

function heartsExplosionAt(x, y) {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = "💖";
        heart.style.position = "fixed";
        heart.style.left = x + "px";
        heart.style.top = y + "px";
        heart.style.fontSize = (Math.random() * 15 + 15) + "px";
        heart.style.pointerEvents = "none";
        heart.style.transition = "all 0.8s ease-out";

        document.body.appendChild(heart);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 120 + 50;

        setTimeout(() => {
            heart.style.left = x + Math.cos(angle) * distance + "px";
            heart.style.top = y + Math.sin(angle) * distance + "px";
            heart.style.opacity = "0";
        }, 10);

        setTimeout(() => heart.remove(), 900);
    }
}
window.addEventListener("load", () => {
    document.querySelector(".yes-button").addEventListener("mouseenter", (e) => {
        heartsExplosionAt(e.clientX, e.clientY);
    });
});