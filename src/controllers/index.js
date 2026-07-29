import CFBDService from '../services/cfbdService.js';
import SportsDBService from '../services/sportsDbService.js';

/**
 * Renders the primary portal home page with game countdown and schedule metrics.
 */
const getHomePage = async (req, res) => {
  try {
    // 1. Allow query string year override, fallback to env variable, or default to 2026
    const year = req.query.year || process.env.SEASON_YEAR || 2026;
    
    // 2. Fetch raw schedule from CFBD API
    const rawSchedule = await CFBDService.getSchedule(year, 'BYU');

    // 3. Fetch BYU logo once to reuse across games
    const byuLogo = await SportsDBService.getTeamLogo('BYU Cougars');

    // 4. Enrich full schedule with logos and explicitly mapped dates
    const schedule = await Promise.all(
      rawSchedule.map(async (game) => {
        const opponentLogo = await SportsDBService.getTeamLogo(game.opponent);
        
        // Pull date from start_date or startDate returned by CFBD
        const gameDate = game.startDate || game.start_date || null;

        return {
          ...game,
          startDate: gameDate,
          opponentLogo: opponentLogo || 'https://via.placeholder.com/60?text=Logo',
          byuLogo: byuLogo || 'https://via.placeholder.com/60?text=BYU'
        };
      })
    );

    // 5. Determine upcoming / next game by checking completion and comparing start dates
    const now = new Date();
    let nextGame = schedule.find(g => !g.completed && g.startDate && new Date(g.startDate) > now);

    // Fallback: If no future game is found, take the first uncompleted game or the last game on schedule
    if (!nextGame && schedule.length > 0) {
      nextGame = schedule.find(g => !g.completed) || schedule[schedule.length - 1];
    }

    // 6. Render EJS view with API payload
    res.render('index', {
      title: `CougarStats | ${year} Fan Hub`,
      year,
      nextGame,
      schedule,
      page: 'home'
    });

  } catch (error) {
    console.error('Error rendering Home Page:', error.message);
    
    // Fallback data so view renders even during API errors
    res.render('index', {
      title: 'CougarStats | 2026 Fan Hub',
      year: 2026,
      nextGame: null,
      schedule: [],
      page: 'home'
    });
  }
};

export {
  getHomePage
};