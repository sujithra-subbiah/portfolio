document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll(".section");
    const hireBtn = document.getElementById("hireBtn");
    const hirePopup = document.getElementById("hirePopup");
    const thankYouPopup = document.getElementById("thankYouPopup");
    const hireForm = document.getElementById("hireForm");
    const textElement = document.querySelector(".hero-content p");
    const introVid = document.getElementById("introVideo");
    const themeIcon = document.getElementById('theme-icon');
    const downloadBtn = document.getElementById('downloadBtn');

    // ===============================
    // 1. SIMPLE SMOOTH SCROLL SYSTEM
    // ===============================
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    navLinks.forEach(l => l.classList.remove("active-nav"));
                    this.classList.add("active-nav");

                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // ===============================
    // 2. VIDEO SYSTEM (Hover Controls)
    // ===============================
    if (introVid) {
        introVid.muted = true;
        introVid.play().catch(err => console.log("Autoplay waiting"));

        introVid.addEventListener("mouseenter", () => { introVid.controls = true; });
        introVid.addEventListener("mouseleave", () => { introVid.controls = false; });
    }

    // ===============================
    // 3. DARK / LIGHT MODE TOGGLE
    // ===============================
    if (themeIcon) {
        themeIcon.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        });
    }

    // ===============================
    // 4. RESUME DOWNLOAD ANIMATION
    // ===============================
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const btnText = document.getElementById('btnText');
            const btnIcon = document.getElementById('btnIcon');
            
            btnText.innerText = "Preparing...";
            btnIcon.className = "fas fa-spinner fa-spin"; 
            
            setTimeout(() => {
                btnIcon.className = "fas fa-check";
                btnText.innerText = "Starting Download";
                
                const link = document.createElement('a');
                link.href = 'resume.pdf'; 
                link.download = 'Sujithra_Resume.pdf';
                link.click();
                
                setTimeout(() => {
                    btnText.innerText = "Download Resume";
                    btnIcon.className = "fas fa-download";
                }, 2000);
            }, 1500);
        });
    }

    // ===============================
    // 5. TYPING EFFECT
    // ===============================
    const careers = ["Python Full Stack Developer", "Web Developer"];
    let charIndex = 0;
    let careerIndex = 0;

    function typeEffect() {
        if (!textElement) return;
        if (charIndex < careers[careerIndex].length) {
            textElement.textContent += careers[careerIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            setTimeout(eraseEffect, 2000);
        }
    }

    function eraseEffect() {
        if (charIndex > 0) {
            textElement.textContent = careers[careerIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseEffect, 50);
        } else {
            careerIndex = (careerIndex + 1) % careers.length;
            setTimeout(typeEffect, 500);
        }
    }

    if (textElement) {
        textElement.textContent = ""; 
        typeEffect();
    }

    // ===============================
    // 6. HIRE POPUP & AJAX FORM
    // ===============================
    if (hireBtn) {
        hireBtn.addEventListener("click", () => {
            hirePopup.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
    }

    if (hireForm) {
        hireForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(hireForm);
            fetch(hireForm.action, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    hirePopup.style.display = "none";
                    thankYouPopup.style.display = "flex";
                    hireForm.reset();
                } else {
                    alert("Submission failed.");
                }
            })
            .catch(() => alert("Something went wrong."));
        });
    }
});

// ===============================
// GLOBAL FUNCTIONS (Outside DOMContentLoaded)
// ===============================
function closePopup() {
    document.getElementById("hirePopup").style.display = "none";
    document.body.style.overflow = "auto";
}

function closeThankYou() {
    document.getElementById("thankYouPopup").style.display = "none";
    document.body.style.overflow = "auto";
}

function openDemo(url) {
    const demoPopup = document.getElementById("demoPopup");
    const demoFrame = document.getElementById("demoFrame");
    const demoContent = document.getElementById("demoContent");
    const noDemoContent = document.getElementById("noDemoContent");

    if (!demoPopup) return;
    demoPopup.style.display = "flex";
    document.body.style.overflow = "hidden";

    if (url && url !== "#") {
        if(demoContent) demoContent.style.display = "block";
        if(noDemoContent) noDemoContent.style.display = "none";
        if(demoFrame) demoFrame.src = url;
    } else {
        if(demoContent) demoContent.style.display = "none";
        if(noDemoContent) noDemoContent.style.display = "block";
    }
}

function closeDemo() {
    const demoPopup = document.getElementById("demoPopup");
    const demoFrame = document.getElementById("demoFrame");
    if (demoPopup) {
        demoPopup.style.display = "none";
        if (demoFrame) demoFrame.src = ""; 
        document.body.style.overflow = "auto";
    }
}