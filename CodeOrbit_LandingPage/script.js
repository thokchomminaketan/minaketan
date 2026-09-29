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

// Close the menu after tapping a link, or pressing Escape
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") setMenu(false);
});

// ── FOOTER YEAR ──
document.getElementById("year").textContent = new Date().getFullYear();
