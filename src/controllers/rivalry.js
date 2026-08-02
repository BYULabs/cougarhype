import CFBDService from '../services/cfbdService.js';
import SportsDBService from '../services/sportsDbService.js';

export const getRivalryPage = async (req, res, next) => {
  try {
    const opponentId = req.params.opponentId; // e.g., 'Utah'

    // 1. Fetch head-to-head matchup stats from CFBD
    const matchupData = await CFBDService.getMatchup(opponentId, 'BYU');

    // 2. Fetch team logos using SportsDB
    const opponentLogo = await SportsDBService.getTeamLogo(opponentId);
    const byuLogo = await SportsDBService.getTeamLogo('BYU Cougars');

    // 3. Render the rivalry view with processed data
    res.render('rivalry', {
      title: `BYU vs ${opponentId} | Rivalry Breakdown`,
      page: 'rivalry',
      opponent: opponentId,
      opponentLogo: opponentLogo || 'https://via.placeholder.com/60?text=Logo',
      byuLogo: byuLogo || 'https://via.placeholder.com/60?text=BYU',
      matchup: matchupData, // contains historical wins, losses, ties, and games array
    });
  } catch (error) {
    next(error); // Passes error to app.js centralized error handler
  }
};