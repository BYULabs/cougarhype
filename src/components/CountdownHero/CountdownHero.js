import './CountdownHero.css';

export function renderCountdownHero() {
  return `
    <div class="countdown-module">
      <div class="hero-left">
        <span class="badge live"><span class="live-dot"></span> Game Week 1</span>
        <h2>Next Kickoff Tracker</h2>
        <div class="matchup-strip">
          <div class="team">
            <img src="https://ssl.gstatic.com/onebox/media/sports/logos/optimized/hxz7taoji58jiIwg5XOu9A_120x120.png" alt="BYU Logo">
            <h3>BYU</h3>
          </div>
          <span class="vs-divider">VS</span>
          <div class="team">
            <div class="opp-badge-hero">UT</div>
            <h3>Utah Tech</h3>
          </div>
        </div>
        <p class="stadium-text">🏟️ LaVell Edwards Stadium | Provo, UT</p>
      </div>

      <div class="hero-right">
        <div class="countdown-clock" id="countdown-clock">
          <div><span class="num" id="cd-days">--</span><span class="lbl">Days</span></div>
          <div><span class="num" id="cd-hours">--</span><span class="lbl">Hours</span></div>
          <div><span class="num" id="cd-mins">--</span><span class="lbl">Mins</span></div>
          <div><span class="num" id="cd-secs">--</span><span class="lbl">Secs</span></div>
        </div>
        <div class="broadcast-tag">📺 <strong>ESPN / BYUtv</strong> · Sat, Aug 29, 2026 · 6:00 PM MT</div>
      </div>
    </div>
  `;
}

// Interactivity initializer called after component mounts to DOM
export function initCountdownTimer() {
  const kickoff = new Date('2026-08-29T18:00:00-06:00').getTime();
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl) return; // Guard clause if view isn't mounted

  function update() {
    const now = Date.now();
    const diff = kickoff - now;
    if (diff <= 0) {
      daysEl.textContent = '0'; hoursEl.textContent = '0'; 
      minsEl.textContent = '0'; secsEl.textContent = '0';
      return;
    }
    daysEl.textContent = Math.floor(diff / 86400000);
    hoursEl.textContent = Math.floor((diff % 86400000) / 3600000);
    minsEl.textContent = Math.floor((diff % 3600000) / 60000);
    secsEl.textContent = Math.floor((diff % 60000) / 1000);
  }

  update();
  return setInterval(update, 1000);
}