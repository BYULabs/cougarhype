const axios = require('axios');

// Dedicated Axios instance configured for College Football Data API
const cfbdClient = axios.create({
  baseURL: 'https://api.collegefootballdata.com',
  timeout: 4000,
  headers: {
    Authorization: `Bearer ${process.env.CFBD_API_KEY}`,
  },
});

class CFBDService {
  /**
   * Fetches and normalizes team schedule from CFBD API
   * @param {number} year 
   * @param {string} team 
   */
  static async getSchedule(year = 2025, team = 'BYU') {
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
      // Re-throw or handle network/API errors cleanly for the controller
      console.error(`[CFBD Service Error]: Failed to fetch schedule for ${team}`, error.message);
      throw new Error('Unable to retrieve schedule from College Football Data API.');
    }
  }
}

module.exports = CFBDService;