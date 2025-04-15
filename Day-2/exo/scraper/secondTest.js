const cheerio = require('cheerio');
const https = require('https');

const url = 'https://www.footmercato.net/club/real-madrid/classement';

// Fonction pour récupérer le HTML depuis l'URL
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Erreur HTTP, statut : ${response.statusCode}`));
        return;
      }

      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrapeStandings() {
  try {
    console.log(`Récupération des données depuis ${url}...`);
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    // Trouver le tableau de classement
    let tableSelector = '';
    $('table').each((i, table) => {
      if ($(table).find('tr').length > 5) { // Tableau avec plusieurs lignes
        tableSelector = `table:eq(${i}) tbody tr`;
        return false; // Sortir de la boucle
      }
    });

    const rows = $(tableSelector);
    console.log(`${rows.length} lignes trouvées dans le tableau.`);

    const standings = [];

    rows.each((index, row) => {
      const columns = $(row).find('td');

     // Création d'objet simple avec tableau.push
      standings.push({
        position: $(columns[0]).text().trim(),
        team: $(columns[1]).find('a').text().trim() || $(columns[1]).text().trim(),
        points: $(columns[2]).text().trim(),
        matchesPlayed: $(columns[3]).text().trim(),
        wins: $(columns[4]).text().trim(),
        draws: $(columns[5]).text().trim(),
        losses: $(columns[6]).text().trim(),
        goalsFor: $(columns[7]).text().trim(),
        goalsAgainst: $(columns[8]).text().trim()
      });
    });

    // Afficher les résultats dans la console
    console.log('Résultats du classement:');
    console.log(standings);
  } catch (error) {
    console.error('Une erreur s\'est produite:', error.message);
  }
}

// Exécuter la fonction
scrapeStandings();
