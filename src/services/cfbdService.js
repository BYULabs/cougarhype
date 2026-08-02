import axios from 'axios';

// Dedicated Axios instance configured for College Football Data API
const cfbdClient = axios.create({
  baseURL: 'https://api.collegefootballdata.com',
  timeout: 4000,
});

// Use interceptor or dynamic header setup so it captures process.env correctly
cfbdClient.interceptors.request.use((config) => {
  const apiKey = process.env.CFBD_API_KEY;
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`;
  } else {
    console.warn('[CFBD Service Warning]: CFBD_API_KEY is not defined in environment variables.');
  }
  return config;
});

class CFBDService {
  /**
   * Fetches and normalizes team schedule from CFBD API
   * @param {number} year 
   * @param {string} team 
   */
  static async getSchedule(year = 2026, team = 'BYU') {
    try {
      const response = await cfbdClient.get('/games', { params: { year, team } });

      return response.data.map((game) => {
        const homeTeam = game.home_team || game.homeTeam || '';
        const awayTeam = game.away_team || game.awayTeam || '';

        const isHome = homeTeam.toUpperCase() === team.toUpperCase();
        const opponent = isHome ? awayTeam : homeTeam;

        return {
          id: game.id,
          week: game.week,
          startDate: game.start_date || game.startDate,
          opponent: opponent || 'Unknown Opponent',
          isHome: isHome,
          venue: game.venue || 'TBD',
          completed: game.completed || false,
        };
      });
    } catch (error) {
      console.error(`[CFBD Service Error]: Failed to fetch schedule for ${team}`, error.message);
      throw new Error('Unable to retrieve schedule from College Football Data API.');
    }
  }

  /**
   * Fetches head-to-head matchup metrics between BYU and an opponent
   * @param {string} opponent 
   * @param {string} team 
   */
  static async getMatchup(opponent, team = 'BYU') {
    try {
      const response = await cfbdClient.get('/teams/matchup', {
        params: { team1: team, team2: opponent }
      });
      return response.data;
    } catch (error) {
      console.error(`[CFBD Service Error]: Failed to fetch matchup for ${team} vs ${opponent}`, error.message);
      throw new Error('Unable to retrieve matchup data from College Football Data API.');
    }
  }
}



export default CFBDService;