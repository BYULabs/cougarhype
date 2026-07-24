import './SeasonPulse.css';
import { getBig12Standings, getBYULastGameResults } from '../../services/api.js';

export async function renderSeasonPulse() {
  const standings = await getBig12Standings(2025) || [];
  const games = await getBYULastGameResults(2025) || [];
  
  // Get latest completed game
  const lastGame = games.filter(g => g.home_points !== null).pop() || {};

  // Build Standings Rows
  const standingsRows = standings.slice(0, 5).map((team, idx) => `
    <tr class="${team.team === 'BYU' ? 'byu-row' : ''}">
      <td>${idx + 1}</td>
      <td><strong>${team.team}</strong></td>
      <td>${team.conferenceWins}-${team.conferenceLosses}</td>
      <td>${team.totalWins}-${team.totalLosses}</td>
      <td>${team.team === 'BYU' ? 'W1' : '-'}</td>
    </tr>
  `).join('');

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
            ${standingsRows || '<tr><td colspan="5">Unable to load standings.</td></tr>'}
          </tbody>
        </table>
      </div>

      <!-- Result Highlight Widget -->
      <div class="dashboard-panel results-widget">
        <h3>Latest Game Breakdown</h3>
        <div class="result-hero-card win">
          <div class="bowl-tag"> postseason </div>
          <div class="score-display">
            <span class="team-name">${lastGame.home_team || 'BYU'}</span>
            <span class="final-score">${lastGame.home_points ?? 0} - ${lastGame.away_points ?? 0}</span>
            <span class="team-name">${lastGame.away_team || 'Opponent'}</span>
          </div>
          <p class="game-meta">${lastGame.start_date ? new Date(lastGame.start_date).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </div>
  `;
}