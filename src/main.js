import "./style.css";
import { renderHomeView, mountHomeView } from "./views/HomeView.js";

// Select the root container
const app = document.querySelector("#app");

// Render the home page structure
app.innerHTML = renderHomeView();

// Mount interactive components (countdown timer, fan poll listeners)
mountHomeView();