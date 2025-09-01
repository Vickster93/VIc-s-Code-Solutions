const app = document.getElementById("app");

// Load reusable components (header/footer)
async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (el) {
    try {
      const res = await fetch(file);
      el.innerHTML = await res.text();
    } catch (e) {
      console.error(`Failed to load component ${file}:`, e);
      el.innerHTML = `<div class="text-red-600">Failed to load component</div>`;
    }
  }
}

// Load page based on hash (#home, #about, #contact)
async function loadRoute() {
  const hash = window.location.hash.substring(1) || "home"; // default = home
  try {
    const res = await fetch(`pages/${hash}.html`);
    if (!res.ok) throw new Error("Page not found");
    app.innerHTML = await res.text();

    // Adjust layout: full width for contact, centered for others
    if (hash === "contact") {
      app.classList.remove("max-w-6xl", "mx-auto");
    } else {
      app.classList.add("max-w-6xl", "mx-auto");
    }

  } catch (e) {
    console.error(e);
    app.innerHTML = "<h2 class='text-red-600'>404 - Page not found</h2>";
  }
}

// Initialize SPA
async function init() {
  await loadComponent("header", "components/header.html");
  await loadComponent("footer", "components/footer.html");
  loadRoute();
}

window.addEventListener("hashchange", loadRoute);
window.addEventListener("load", init);
