// ==========================================
// 1. GLOBAL FUNCTIONS (Custom Alerts & Popups)
// ==========================================

/**
 * Intha function thaan GitHub & Live Demo buttons-ai handle pannum.
 * Link '#' nu iruntha, page jump aagatha thaduthu pop-up kaattum.
 */
window.handleProjectClick = function(event, element) {
    const href = element.getAttribute('href');
    if (href === "#" || href === "" || href === "null" || !href) {
        event.preventDefault(); // Stop jump to Home
        const modal = document.getElementById("customAlert");
        if (modal) {
            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    }
};

// Coming Soon Pop-up-ai close panna
window.closeCustomAlert = function() {
    const modal = document.getElementById("customAlert");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Scroll on pannum
    }
};

// ==========================================
// 2. DOM CONTENT LOADED (Animations & UI)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    
    // --- BACKGROUND PARTICLES ANIMATION ---
    const canvas = document.createElement("canvas");
    canvas.id = "canvas-bg";
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");

    let particles = [];
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.onresize = resize;
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();

    // --- TYPING EFFECT ---
    const textElement = document.getElementById("typing-text");
    const careers = ["Python Full Stack Developer", "Web Developer", "UI/UX Enthusiast"];
    let charIndex = 0, careerIndex = 0, isDeleting = false;

    function type() {
        if (!textElement) return;
        const current = careers[careerIndex];
        if (isDeleting) {
            textElement.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 150;
        if (!isDeleting && charIndex === current.length) { 
            isDeleting = true; 
            speed = 2000; 
        } else if (isDeleting && charIndex === 0) { 
            isDeleting = false; 
            careerIndex = (careerIndex + 1) % careers.length; 
            speed = 500; 
        }
        setTimeout(type, speed);
    }
    if (textElement) type();

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith("#") && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// ==========================================
// 3. HIRE ME & SUCCESS POPUP LOGIC
// ==========================================

window.openHirePopup = function() {
    const modal = document.getElementById("hirePopup");
    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
};

window.closePopup = function() {
    const modal = document.getElementById("hirePopup");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
};

window.closeSuccess = function() {
    const modal = document.getElementById("successPopup");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
};

// Form Submission logic
const hireForm = document.getElementById('hireMeForm');
if(hireForm) {
    hireForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(hireForm);

        fetch(hireForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('hirePopup').style.display = 'none';
                document.getElementById('successPopup').style.display = 'flex';
                hireForm.reset();
            } else {
                alert("Sorry! Error encountered. Please try again.");
            }
        })
        .catch(error => console.log("Error:", error));
    });
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const hireModal = document.getElementById("hirePopup");
    const alertModal = document.getElementById("customAlert");
    const successModal = document.getElementById("successPopup");
    if (event.target === hireModal) closePopup();
    if (event.target === alertModal) closeCustomAlert();
    if (event.target === successModal) closeSuccess();
});
// Contact Form Submit Handling
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                // Success popup-ai kaatum
                document.getElementById('successPopup').style.display = 'flex';
                document.body.style.overflow = "hidden";
                contactForm.reset();
            } else {
                alert("Oops! Something went wrong. Please try again.");
            }
        })
        .catch(error => console.log("Error:", error));
    });
}