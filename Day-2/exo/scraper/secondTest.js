import * as cheerio from 'cheerio';
// Récupérer le HTML de la page
const $ = cheerio.load('https://www.footmercato.net/espagne/liga/classement');
const html = response.data;

//Charger le HTML dans Cheerio
 const $ = cheerio.load(html);

//Sélectionner le tableau
const table = $('.rankingTable_tableScroll table');
const rows = table.find('tbody tr');

// Extraire les données
const standings = [];
rows.each((index, row) => {
const columns = $(row).find('td');
