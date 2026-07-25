const axios = require('axios');

// Configure Axios instance for TheSportsDB
const sportsDbClient = axios.create({
  baseURL: 'https://www.thesportsdb.com/api/v1/json/3',
  timeout: 4000,
});

// In-memory cache for logos
const logoCache = new Map();

class SportsDBService {
  /**
   * Fetches and caches a team logo URL from TheSportsDB
   * @param {string} teamName 
   * @returns {Promise<string|null>}
   */
  static async getTeamLogo(teamName) {
    if (!teamName) return null;

    // Standardize key to avoid case-sensitivity misses
    const cacheKey = teamName.trim().toLowerCase();

    // 1. Return cached logo if present
    if (logoCache.has(cacheKey)) {
      return logoCache.get(cacheKey);
    }

    try {
      // 2. Fetch from TheSportsDB API
      const response = await sportsDbClient.get('/searchteams.php', {
        params: { t: teamName },
      });

      const teams = response.data?.teams;
      
      if (teams && teams.length > 0) {
        // Grab badge or logo URL
        const logoUrl = teams[0].strBadge || teams[0].strLogo || null;

        if (logoUrl) {
          logoCache.set(cacheKey, logoUrl);
        }
        return logoUrl;
      }

      return null;
    } catch (error) {
      console.error(`[SportsDB Service Error]: Failed to fetch logo for "${teamName}"`, error.message);
      return null; // Return null so the UI can safely render a default placeholder logo
    }
  }
}

module.exports = SportsDBService;