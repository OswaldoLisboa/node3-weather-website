const path = require('path')
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Oswaldo Lisboa'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Oswaldo Lisboa'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Frequently asked questions',
    name: 'Oswaldo Lisboa'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.adress) {
    return res.send({ error: 'You must provide an adress' });
  }

  geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }

      return res.send({
        forecast: data,
        location: location,
        adress: req.query.adress
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Oswaldo Lisboa'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Oswaldo Lisboa'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port $(port).`);
});
