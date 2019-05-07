'use strict';

//-----------------------------
// Configs for server
//------------------------------
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// For CSS
app.use(express.static(__dirname + '/public'));
// For rendering
app.set('view engine', 'ejs');

//-----------------------------
// Practice
//------------------------------

let list = ['apples', 'celery', 'butter'];

app.get('/', (request, response) => {
  response.render('pages/index');
});

app.get('/error', (request, response) => {
  response.render('pages/error', {arrayOfItems: list});
});



app.listen(PORT, () => console.log(`Listening on ${PORT}`));
