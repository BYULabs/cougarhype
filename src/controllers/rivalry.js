import CFBDService from '../services/cfbdService.js';
import SportsDBService from '../services/sportsDbService.js';
import { fromSlug } from '../utils/slugify.js';

export const getRivalryPage = async (req, res, next) => {
  try {
    const rawParam = req.params.opponentId;
    const opponentName = fromSlug(rawParam);

    // 1. Fetch matchup stats from CFBD & Logos from SportsDB
    const matchupData = await CFBDService.getMatchup(opponentName, 'BYU');
    const opponentLogo = await SportsDBService.getTeamLogo(opponentName);
    const byuLogo = await SportsDBService.getTeamLogo('BYU Cougars');

    // Extract game list safely
    const games = matchupData.games || [];

    // Calculate dynamic metrics from API data
    const byuWins = matchupData.team1Wins || 0; // team1 is BYU
    const opponentWins = matchupData.team2Wins || 0;
    const ties = matchupData.ties || 0;
    const totalGames = games.length || (byuWins + opponentWins + ties);

    // Calculate total & average scores across history
    let byuTotalPts = 0;
    let oppTotalPts = 0;

    games.forEach((g) => {
      const isHomeBYU = g.homeTeam === 'BYU';
      byuTotalPts += isHomeBYU ? (g.homeScore || 0) : (g.awayScore || 0);
      oppTotalPts += isHomeBYU ? (g.awayScore || 0) : (g.homeScore || 0);
    });

    const byuAvgPts = totalGames > 0 ? (byuTotalPts / totalGames).toFixed(1) : '0.0';
    const oppAvgPts = totalGames > 0 ? (oppTotalPts / totalGames).toFixed(1) : '0.0';

    // Calculate Conic Gradient Percentages for CSS Donut
    const byuWinPct = totalGames > 0 ? Math.round((byuWins / totalGames) * 100) : 0;
    const oppWinPct = totalGames > 0 ? Math.round((opponentWins / totalGames) * 100) : 0;
    const tiePct = 100 - (byuWinPct + oppWinPct);

    // Slice last 8 meetings for the Recent Meetings table
    const recentGames = games.slice(-8).reverse().map((g) => {
      const isHomeBYU = g.homeTeam === 'BYU';
      const byuScore = isHomeBYU ? g.homeScore : g.awayScore;
      const oppScore = isHomeBYU ? g.awayScore : g.homeScore;
      const byuWon = byuScore > oppScore;

      return {
        date: `${g.season} Season`,
        location: g.venue || (isHomeBYU ? 'Provo, UT' : 'Away'),
        byuScore,
        oppScore,
        winner: byuWon ? 'byu' : 'opponent'
      };
    });

    // 2. Render dynamic view
    res.render('rivalry', {
      title: `BYU vs ${opponentName} | Rivalry Central`,
      page: 'rivalry',
      opponent: opponentName,
      opponentLogo: opponentLogo || 'https://via.placeholder.com/60?text=Logo',
      byuLogo: byuLogo || 'https://via.placeholder.com/60?text=BYU',
      stats: {
        byuWins,
        opponentWins,
        ties,
        totalGames,
        byuTotalPts,
        oppTotalPts,
        byuAvgPts,
        oppAvgPts,
        byuWinPct,
        oppWinPct,
        tiePct,
      },
      recentGames,
    });
  } catch (error) {
    next(error);
  }
};