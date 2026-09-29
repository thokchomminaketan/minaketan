// ── SETTINGS ──
const EMAILJS_PUBLIC_KEY = "TI6LzgvzgM77muXDS";
const EMAILJS_SERVICE_ID = "service_rz7pwtg";
const EMAILJS_TEMPLATE_ID = "template_y7k8y6i";

if (typeof emailjs !== "undefined") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ── NAVBAR: add background after scrolling ──
const navbar = document.getElementById("navbar");
function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
}
window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();

// ── MOBILE MENU ──
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

// ── HIGHLIGHT CURRENT SECTION IN NAV ──
const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.querySelectorAll("a").forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
      });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(section => sectionObserver.observe(section));

// ── REVEAL ELEMENTS ON SCROLL ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ── FOOTER YEAR ──
document.getElementById("year").textContent = new Date().getFullYear();

// ── CONTACT FORM ──
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const sendBtn = document.getElementById("send-btn");

function showStatus(text, type) {
  status.textContent = text;
  status.className = type || "";
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    showStatus("Please fill in all fields.", "error");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showStatus("Please enter a valid email address.", "error");
    return;
  }
  if (typeof emailjs === "undefined") {
    showStatus("Email service could not load. Check your internet connection and try again.", "error");
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";
  showStatus("", "");

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name: name,
    from_email: email,
    message: message
  })
    .then(() => {
      showStatus("Message sent successfully!", "success");
      form.reset();
    })
    .catch(() => {
      showStatus("Message could not be sent. Please try again.", "error");
    })
    .finally(() => {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send Message";
    });
});
