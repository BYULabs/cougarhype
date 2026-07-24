import './HomeView.css';
import { renderHeader, initHeaderListeners } from '../components/Header/Header.js';
import { renderCountdownHero, initCountdownTimer } from '../components/CountdownHero/CountdownHero.js';
import { renderSeasonPulse } from '../components/SeasonPulse/SeasonPulse.js';
import { renderPlayerSpotlights } from '../components/PlayerSpotlights/PlayerSpotlights.js';
import { renderFanPoll, initFanPoll } from '../components/FanPoll/FanPoll.js';
import { renderFooter } from '../components/Footer/Footer.js';

export async function renderHomeView() {
  // Fetch dynamic sections in parallel
  const [seasonPulseHTML, spotlightsHTML] = await Promise.all([
    renderSeasonPulse(),
    renderPlayerSpotlights()
  ]);

  return `
    <div class="app-layout">
      ${renderHeader()}
      
      <main class="home-container">
        <section class="hero-section">${renderCountdownHero()}</section>
        <section class="bento-grid">${seasonPulseHTML}</section>
        <section class="spotlight-section">
          <h2>2026 Key Catalysts</h2>
          ${spotlightsHTML}
        </section>
        <section class="community-zone">${renderFanPoll()}</section>
      </main>

      ${renderFooter()}
    </div>
  `;
}

export function mountHomeView() {
  initHeaderListeners();
  initCountdownTimer();
  initFanPoll();
}