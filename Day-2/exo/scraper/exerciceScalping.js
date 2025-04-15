const cheerio = require('cheerio');

async function scrapeStandings() {
  try {
    const $ = await cheerio.fromURL('https://www.footmercato.net/club/real-madrid/classement');

    const table = $('#teamStandings .rankingTable table');

    if (table.length === 0) {
      throw new Error('Tableau de classement non trouvé');
    }

    const rows = table.find('tbody tr');
    console.log(`${rows.length} lignes trouvées dans le tableau.`);

    const standings = [];

    rows.each((index, row) => {
      const $row = $(row);
      const cells = $row.find('td');

      if (cells.length >= 9) {
        standings.push({
          position: $(cells[0]).text().trim(),
          team: $(cells[1]).text().trim(),
          points: $(cells[2]).text().trim(),
          matchesPlayed: $(cells[3]).text().trim(),
          wins: $(cells[4]).text().trim(),
          draws: $(cells[5]).text().trim(),
          losses: $(cells[6]).text().trim(),
          goalsFor: $(cells[7]).text().trim(),
          goalsAgainst: $(cells[8]).text().trim()
        });
      }
    });

    console.log('\nRésultats du classement:');
    console.log(standings);

    return standings;

  } catch (error) {
    console.error('Erreur lors du scraping:', error.message);
    throw error;
  }
}

scrapeStandings();
