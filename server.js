const express = require('express');
const hbs = require('hbs'); // handlebars
const fs = require('fs'); // log

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

// middleware use (serve static pages)
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// middleware it can't pass without next(except static pages)
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    // logging
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});  

//asdfdfa

// Make stop on maintance page
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

// it can be called as function in hbs file
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });    
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to hand request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});