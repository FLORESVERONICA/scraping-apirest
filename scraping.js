const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://elpais.com/ultimas-noticias/';

async function scraping() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);


    let noticias = [];

    
    $('article').each((i, element) => {
     
      const titulo = $(element).find('header a').text();
      const descripcion = $(element).find('p').text();
      const imagen = $(element).find('figure img').attr('src') || '';
      const enlace = $(element).find('header a').attr('href')

     
      const noticia = {
        titulo: titulo,
        imagen: imagen,
        descripcion: descripcion,
        enlace: enlace
      };

      noticias.push(noticia);
    });

    await fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
    console.log(noticias);
      } catch (error) {
console.error('Error al realizar el scraping:', error.message);
  }
}

//scraping()
module.exports = scraping