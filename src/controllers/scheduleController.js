const CFBDService = require('../services/cfbdService');
const SportsDBService = require('../services/sportsDbService');

exports.renderDashboard = async (req, res) => {
  try {
    const year = req.query.year || 2026;

    // 1. Fetch raw schedule from CFBD
    const rawSchedule = await CFBDService.getSchedule(year, 'BYU');

    // 2. Fetch BYU logo once
    const byuLogo = await SportsDBService.getTeamLogo('BYU Cougars');

    // 3. Enrich schedule items with opponent logos concurrently
    const scheduleWithLogos = await Promise.all(
      rawSchedule.map(async (game) => {
        const opponentLogo = await SportsDBService.getTeamLogo(game.opponent);
        return {
          ...game,
          opponentLogo: opponentLogo || 'https://via.placeholder.com/60?text=Logo',
          byuLogo: byuLogo || 'https://via.placeholder.com/60?text=BYU',
        };
      })
    );

    // 4. Find the next uncompleted game for the hero countdown
    const nextGame = scheduleWithLogos.find((game) => !game.completed) || scheduleWithLogos[0] || null;

    // 5. Render index.ejs with all required data
    res.render('index', {
      title: `CougarStats | ${year} Fan Hub`,
      schedule: scheduleWithLogos,
      nextGame,
      year
    });
  } catch (error) {
    console.error('Controller Error:', error.message);

    // Render index with empty fallbacks so the app doesn't crash visually
    res.render('index', {
      title: 'CougarStats | 2026 Fan Hub',
      schedule: [],
      nextGame: null,
      year: 2026
    });
  }
};