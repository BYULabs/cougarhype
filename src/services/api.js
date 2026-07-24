const CFBD_BASE_URL = 'https://api.collegefootballdata.com';
const SPORTSDB_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

const CFBD_KEY = import.meta.env.VITE_CFBD_API_KEY;

// Helper to forward browser errors directly to the Vite terminal
function logToTerminal(message, details) {
  fetch('/api/log-error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, details })
  }).catch(() => {
    // Silently ignore if terminal logging middleware is inactive
  });
}

// CollegeFootballData Fetch Helper
async function fetchCFBD(endpoint) {
  try {
    const res = await fetch(`${CFBD_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${CFBD_KEY}`,
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error(`Failed to fetch from CFBD [${endpoint}]:`, err);
    logToTerminal(`CFBD Fetch Error [${endpoint}]`, err.message);
    return null;
  }
}

// TheSportsDB Fetch Helper
async function fetchSportsDB(endpoint) {
  try {
    const res = await fetch(`${SPORTSDB_BASE_URL}${endpoint}`);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error(`Failed to fetch from SportsDB [${endpoint}]:`, err);
    logToTerminal(`SportsDB Fetch Error [${endpoint}]`, err.message);
    return null;
  }
}

// Service Methods for App Components
export async function getBig12Standings(year = 2025) {
  return await fetchCFBD(`/standings?year=${year}&conference=B12`);
}

export async function getBYURoster(year = 2025) {
  return await fetchCFBD(`/roster?team=BYU&year=${year}`);
}

export async function getBYULastGameResults(year = 2025) {
  return await fetchCFBD(`/games?year=${year}&team=BYU`);
}

export async function getBYUTeamDetails() {
  return await fetchSportsDB('/searchteams.php?t=BYU_Cougars');
}