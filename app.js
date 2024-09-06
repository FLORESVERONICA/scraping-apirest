const scraping = require('./scraping.js')
const express = require('express')
const app = express()
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let noticias = []

function leerDatos() {
    try {
      const data = fs.readFileSync('noticias.json', 'utf-8');
      noticias = JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo noticias.json:', error.message);
    }
  }  

  function guardarDatos() {
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
  }

app.get('/', async (req, res) => {
    try {
        leerDatos()
        res.json(noticias)
    } catch(err) {
        console.log(`Este es el error ${err}`)
      }
    })

app.post('/noticias', (req, res) => {
  const nuevaNoticia = req.body
  leerDatos()
  noticias.push(nuevaNoticia)
  guardarDatos()
  res.status(200).json(noticias)
})

app.get('/scraping', async (req, res) => {
  await scraping()
  res.send('Scraping completado')
})

const PORT = 3000
    app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto http://localhost:${PORT}`)
    })

    leerDatos()
    console.log(noticias)