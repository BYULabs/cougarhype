import CFBDService from '../services/cfbdService.js';
import SportsDBService from '../services/sportsDbService.js';
import { fromSlug } from '../utils/slugify.js';

export const getRivalryPage = async (req, res, next) => {
  try {
    const rawParam = req.params.opponentId; // e.g., "utah-tech"
    
    // Convert slug back to team name: "utah-tech" -> "Utah Tech"
    const opponentName = fromSlug(rawParam);

    // 1. Fetch head-to-head matchup stats from CFBD
    const matchupData = await CFBDService.getMatchup(opponentName, 'BYU');

    // 2. Fetch team logos using SportsDB
    const opponentLogo = await SportsDBService.getTeamLogo(opponentName);
    const byuLogo = await SportsDBService.getTeamLogo('BYU Cougars');

    // 3. Render the rivalry view with processed data
    res.render('rivalry', {
      title: `BYU vs ${opponentName} | Rivalry Breakdown`,
      page: 'rivalry',
      opponent: opponentName,
      opponentLogo: opponentLogo || 'https://via.placeholder.com/60?text=Logo',
      byuLogo: byuLogo || 'https://via.placeholder.com/60?text=BYU',
      matchup: matchupData,
    });
  } catch (error) {
    next(error);
  }
};