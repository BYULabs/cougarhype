import './SeasonPulse.css';

export function renderSeasonPulse() {
  return `
    <div class="bento-wrapper">
      <!-- Standings Widget -->
      <div class="dashboard-panel standings-widget">
        <h3>Big 12 Standings Grid</h3>
        <table class="standings-table">
          <thead>
            <tr><th>Rank</th><th>School</th><th>Conf</th><th>Overall</th><th>Streak</th></tr>
          </thead>
          <tbody>
            <tr class="byu-row"><td>1</td><td><strong>BYU Cougars</strong></td><td>0-0</td><td>0-0</td><td>W1 (Bowl)</td></tr>
            <tr><td>2</td><td>Utah Utes</td><td>0-0</td><td>0-0</td><td>L1</td></tr>
            <tr><td>3</td><td>Arizona Wildcats</td><td>0-0</td><td>0-0</td><td>W2</td></tr>
            <tr><td>4</td><td>Kansas State</td><td>0-0</td><td>0-0</td><td>L1</td></tr>
            <tr><td>5</td><td>Iowa State</td><td>0-0</td><td>0-0</td><td>W1</td></tr>
          </tbody>
        </table>
      </div>

      <!-- Result Highlight Widget -->
      <div class="dashboard-panel results-widget">
        <h3>Latest Game Breakdown</h3>
        <div class="result-hero-card win">
          <div class="bowl-tag">🍧 Pop-Tarts Bowl Champions</div>
          <div class="score-display">
            <span class="team-name">BYU</span>
            <span class="final-score">25 - 21</span>
            <span class="team-name">GA Tech</span>
          </div>
          <p class="game-meta">Dec 27, 2025 | Camping World Stadium, Orlando, FL</p>
          <div class="key-juice-stat">
            💡 <strong>Game Juice:</strong> Rushing duo Enoch Nawahine and Jovesa Damuni locked down 140+ yards to seal the postseason victory.
          </div>
        </div>
      </div>
    </div>
  `;
}