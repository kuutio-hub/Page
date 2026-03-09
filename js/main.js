document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  // Close mobile menu when clicking a link
  const mobileLinks = menu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
    });
  });

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("shadow-md");
      navbar.classList.remove("py-2");
    } else {
      navbar.classList.remove("shadow-md");
      navbar.classList.add("py-2");
    }
  });

  // Initialize language
  const savedLang = localStorage.getItem("emapot_lang") || "hu";
  changeLanguage(savedLang);
});

function changeLanguage(lang) {
  if (!translations[lang]) return;

  // Update localStorage
  localStorage.setItem("emapot_lang", lang);

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update all elements with data-i18n attribute
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      // Keep icons if they exist inside the element (like in the "Részletek" button)
      const icon = el.querySelector("i");
      if (icon) {
        el.innerHTML = translations[lang][key] + " " + icon.outerHTML;
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  // Update active state of language buttons
  const langBtns = document.querySelectorAll(".lang-btn");
  langBtns.forEach((btn) => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.remove("text-gray-400");
      btn.classList.add("text-primary");
    } else {
      btn.classList.remove("text-primary");
      btn.classList.add("text-gray-400");
    }
  });
}
