import './PlayerSpotlights.css';

const PLAYERS = [
  { id: 'bb', name: 'Bear Bachmeier', pos: 'QB · Freshman · #12', val1: 'DUAL', lbl1: 'Style', val2: '★★★★', lbl2: 'Recruit' },
  { id: 'lj', name: 'LJ Martin', pos: 'RB · Sophomore · #4', val1: '6.2', lbl1: 'Yds/Carry', val2: '950', lbl2: 'Proj. Yds' },
  { id: 'cr', name: 'Chase Roberts', pos: 'WR · Senior · #2', val1: '15.1', lbl1: 'Yds/Catch', val2: '8', lbl2: 'Proj. TDs' },
  { id: 'cu', name: 'Cade Uluave', pos: 'LB · Transfer · #10', val1: '110', lbl1: 'Proj. Tackles', val2: '8.5', lbl2: 'Proj. TFL' },
];

export function renderPlayerSpotlights() {
  return `
    <div class="spotlight-cards-wrapper">
      ${PLAYERS.map(player => `
        <div class="player-card" data-player-id="${player.id}">
          <div class="player-banner">
            <div class="player-avatar">${player.name.split(' ').map(n => n[0]).join('')}</div>
          </div>
          <div class="player-body">
            <h4>${player.name}</h4>
            <p class="player-pos">${player.pos}</p>
            <div class="player-stats">
              <div class="stat-block">
                <div class="stat-val">${player.val1}</div>
                <div class="stat-lbl">${player.lbl1}</div>
              </div>
              <div class="stat-block">
                <div class="stat-val">${player.val2}</div>
                <div class="stat-lbl">${player.lbl2}</div>
              </div>
            </div>
            <button class="pin-btn" onclick="this.textContent = '📌 Pinned!'">📌 Pin to Board</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}