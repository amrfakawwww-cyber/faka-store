
/* ==========================================================================
   Faka Store — script.js
   ------------------------------------------------------------------------
   Table of contents:
     1. Smooth scrolling for nav links
     2. Highlight active nav link while scrolling
     3. Contact form validation
   ========================================================================== */
 
   document.addEventListener("DOMContentLoaded", function () {
 
    /* ======================================================================
       1. Smooth scrolling for nav links
       ====================================================================== */
    const navLinks = document.querySelectorAll(".header .nav a");
 
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);
 
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
 
 
    /* ======================================================================
       2. Highlight active nav link while scrolling
       ====================================================================== */
    const sections = document.querySelectorAll("section[id]");
 
    function setActiveLink() {
        let currentSectionId = "";
 
        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 80; // header height offset
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });
 
        navLinks.forEach(function (link) {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + currentSectionId) {
                link.classList.add("active");
            }
        });
    }
 
    window.addEventListener("scroll", setActiveLink);
    setActiveLink(); // run once on load
 
 
    /* ======================================================================
       3. Contact form validation
       ====================================================================== */
    const contactForm = document.querySelector(".contact-form");
 
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
 
            const name = contactForm.querySelector('[name="name"]');
            const email = contactForm.querySelector('[name="email"]');
            const message = contactForm.querySelector('[name="message"]');
 
            let isValid = true;
            let errorMessage = "";
 
            if (name.value.trim() === "") {
                isValid = false;
                errorMessage = "من فضلك اكتب اسمك";
            } else if (!isValidEmail(email.value.trim())) {
                isValid = false;
                errorMessage = "من فضلك اكتب بريد إلكتروني صحيح";
            } else if (message.value.trim() === "") {
                isValid = false;
                errorMessage = "من فضلك اكتب رسالتك";
            }
 
            showFormFeedback(isValid ? "تم إرسال رسالتك بنجاح!" : errorMessage, isValid);
 
            if (isValid) {
                contactForm.reset();
            }
        });
    }
 
    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
 
    function showFormFeedback(text, success) {
        let feedback = contactForm.querySelector(".form-feedback");
 
        if (!feedback) {
            feedback = document.createElement("p");
            feedback.className = "form-feedback";
            contactForm.appendChild(feedback);
        }
 
        feedback.textContent = text;
        feedback.style.color = success ? "#6195ff" : "#ff6b6b";
    }
 
});
 