import "./style.css";
import { renderHomeView, mountHomeView } from "./views/HomeView.js";

// Select the root container
const app = document.querySelector("#app");

async function init() {
  try {
    // 1. Optional: Show a lightweight loading state while fetching API data
    app.innerHTML = `
      <div class="loading-state" style="text-align: center; padding: 4rem; font-family: sans-serif;">
        <h2>Loading CougarStats...</h2>
      </div>
    `;

    // 2. Await the async HTML string from renderHomeView
    app.innerHTML = await renderHomeView();

    // 3. Mount interactive components after DOM elements exist
    mountHomeView();
  } catch (error) {
    console.error("Error loading home view:", error);
    app.innerHTML = `
      <div class="error-state" style="text-align: center; padding: 4rem; color: #d9534f;">
        <h2>Failed to load live data.</h2>
        <p>Please check your connection or refresh the page.</p>
      </div>
    `;
  }
}

// Run app initialization
init();