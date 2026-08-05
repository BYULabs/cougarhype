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

    // 6. Build dynamic ticker items from API schedule data
    const tickerItems = [];

    if (nextGame) {
      const formattedDate = nextGame.startDate 
        ? new Date(nextGame.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : 'TBD';
      tickerItems.push(`🏈 NEXT MATCHUP: BYU vs ${nextGame.opponent} (${formattedDate} at ${nextGame.venue})`);
    }

    const completedGames = schedule.filter(g => g.completed);
    if (completedGames.length > 0) {
      const lastGame = completedGames[completedGames.length - 1];
      tickerItems.push(`🏆 RECENT GAME: BYU vs ${lastGame.opponent} (Week ${lastGame.week})`);
    }

    tickerItems.push(`📊 ${year} SEASON SCHEDULE: ${schedule.length} Total Games Scheduled`);
    tickerItems.push(`⚡ LIVE COVERAGE: Stay tuned for active fan hype posts & score predictions`);

    // 7. Render EJS view with API payload
    res.render('index', {
      title: `CougarStats | ${year} Fan Hub`,
      year,
      nextGame,
      schedule,
      tickerItems,
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
      tickerItems: ['⚡ BYU Football Fan Hub — Live Game Coverage'],
      page: 'home'
    });
  }
};

export {
  getHomePage
};