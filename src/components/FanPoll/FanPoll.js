import './FanPoll.css';

export function renderFanPoll() {
  return `
    <div class="poll-section">
      <h3 class="poll-question">🏆 What's BYU's ceiling in 2026?</h3>
      <div class="poll-options" id="poll-options">
        <div class="poll-option" data-votes="184">
          <div class="poll-fill"></div>
          <div class="poll-content">
            <span class="poll-text">Big 12 Champions & College Football Playoff</span>
            <span class="poll-percent">--</span>
          </div>
        </div>
        <div class="poll-option" data-votes="132">
          <div class="poll-fill"></div>
          <div class="poll-content">
            <span class="poll-text">10+ win season and a New Year's Six bowl</span>
            <span class="poll-percent">--</span>
          </div>
        </div>
        <div class="poll-option" data-votes="78">
          <div class="poll-fill"></div>
          <div class="poll-content">
            <span class="poll-text">Solid 8-9 wins and a strong bowl appearance</span>
            <span class="poll-percent">--</span>
          </div>
        </div>
      </div>
      <p class="poll-thanks" id="poll-thanks">✅ Vote counted! Go Cougs — rise and shout!</p>
    </div>
  `;
}

// Event handlers for voting logic
export function initFanPoll() {
  const options = document.querySelectorAll('.poll-option');
  const thanks = document.getElementById('poll-thanks');
  let voted = false;

  function renderPercentages() {
    const total = Array.from(options).reduce((sum, opt) => sum + parseInt(opt.dataset.votes), 0);
    options.forEach(opt => {
      const pct = total > 0 ? (parseInt(opt.dataset.votes) / total * 100) : 0;
      opt.querySelector('.poll-fill').style.width = `${pct}%`;
      opt.querySelector('.poll-percent').textContent = `${pct.toFixed(1)}%`;
    });
  }

  renderPercentages();

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      if (voted) return;
      voted = true;
      opt.dataset.votes = parseInt(opt.dataset.votes) + 1;
      options.forEach(o => o.classList.add('voted'));
      renderPercentages();
      if (thanks) thanks.classList.add('show');
    });
  });
}