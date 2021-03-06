const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log( log );
  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) {
      console.log('Beep, error')
    }
  });
  next();
});

app.use((req,res,next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Homepage',
     currentYear: new Date().getFullYear(),
     welcomeMessage: 'Hoi, welkom op de site!'
   });

});

app.get('/about',(req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
     currentYear: new Date().getFullYear(),
     welcomeMessage: 'Hoi, welkom op de site!'
    });
});

app.get('/home',(req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Homepage',
     currentYear: new Date().getFullYear(),
     welcomeMessage: 'Hoi, welkom op de site!'
    });
});

app.get('/tomspage',(req,res) => {
    res.send('Pagina over Tom ')
});


app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});
