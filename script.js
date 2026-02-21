document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll(".section");
    const hireBtn = document.getElementById("hireBtn");
    const hirePopup = document.getElementById("hirePopup");
    const thankYouPopup = document.getElementById("thankYouPopup");
    const hireForm = document.getElementById("hireForm");

    // ===============================
    // SECTION SLIDE SYSTEM
    // ===============================

    let currentSection = document.querySelector(".section.active");

    if (!currentSection && sections.length > 0) {
        currentSection = sections[0];
        currentSection.classList.add("active");
        currentSection.style.left = "0";
    }

    sections.forEach(section => {
        if (section !== currentSection) {
            section.style.left = "100%";
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {

            const href = this.getAttribute("href");
            if (!href.startsWith("#")) return;

            e.preventDefault();

            const targetId = href.replace("#", "");
            const targetSection = document.getElementById(targetId);
            if (!targetSection || targetSection === currentSection) return;

            currentSection.classList.remove("active");
            currentSection.classList.add("exit-left");

            targetSection.classList.remove("exit-left");
            targetSection.style.left = "100%";

            setTimeout(() => {
                targetSection.classList.add("active");
                targetSection.style.left = "0";
            }, 50);

            setTimeout(() => {
                currentSection.classList.remove("exit-left");
            }, 600);

            currentSection = targetSection;
        });
    });

    // ===============================
    // HIRE POPUP OPEN
    // ===============================

    hireBtn.addEventListener("click", function () {
        hirePopup.style.display = "flex";
        document.body.style.overflow = "hidden";
    });

    // Close when clicking outside
    hirePopup.addEventListener("click", function (e) {
        if (e.target === hirePopup) {
            closePopup();
        }
    });

    // ===============================
    // AJAX FORM SUBMIT (FIXED)
    // ===============================

    hireForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(hireForm);

        fetch(hireForm.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {

            if (response.ok) {

                // Close Hire Popup
                hirePopup.style.display = "none";

                // Show Thank You Popup
                thankYouPopup.style.display = "flex";

                // Reset Form
                hireForm.reset();

                document.body.style.overflow = "hidden";

            } else {
                alert("Submission failed. Please try again.");
            }
        })
        .catch(() => {
            alert("Something went wrong. Please try again.");
        });
    });

});

// ===============================
// GLOBAL FUNCTIONS
// ===============================

function closePopup() {
    document.getElementById("hirePopup").style.display = "none";
    document.body.style.overflow = "auto";
}

function closeThankYou() {
    document.getElementById("thankYouPopup").style.display = "none";
    document.body.style.overflow = "auto";
}