import './PlayerSpotlights.css';
import { getBYURoster } from '../../services/api.js';

export async function renderPlayerSpotlights() {
  const roster = await getBYURoster(2025) || [];
  
  // Pick key players (e.g., top 4 roster entries)
  const spotlightPlayers = roster.slice(0, 4);

  return `
    <div class="spotlight-cards-wrapper">
      ${spotlightPlayers.map(player => `
        <div class="player-card" data-player-id="${player.id}">
          <div class="player-banner">
            <div class="player-avatar">${player.first_name[0]}${player.last_name[0]}</div>
          </div>
          <div class="player-body">
            <h4>${player.first_name} ${player.last_name}</h4>
            <p class="player-pos">${player.position} · ${player.year ? 'Yr ' + player.year : 'N/A'} · #${player.jersey || '0'}</p>
            <div class="player-stats">
              <div class="stat-block">
                <div class="stat-val">${player.height ? `${player.height}"` : 'N/A'}</div>
                <div class="stat-lbl">Height</div>
              </div>
              <div class="stat-block">
                <div class="stat-val">${player.weight ? `${player.weight} lbs` : 'N/A'}</div>
                <div class="stat-lbl">Weight</div>
              </div>
            </div>
            <button class="pin-btn" onclick="this.textContent = '📌 Pinned!'">📌 Pin to Board</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}