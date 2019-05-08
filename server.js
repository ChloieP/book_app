'use strict';

//------------------------------
// Application Dependencies
//------------------------------
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
// const cors = require('cors');

//------------------------------
// Environment Variable
//------------------------------

require('dotenv').config();



//------------------------------
// Application Setup
//------------------------------

const app = express();
const PORT = process.env.PORT || 3000;

//------------------------------
// Application Middleware
//------------------------------

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

//------------------------------
// Database Setup
//------------------------------

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//------------------------------
// Server-Side Templating
//------------------------------

// For CSS
app.use(express.static(__dirname + '/public'));
// For rendering
app.set('view engine', 'ejs');

//------------------------------
// Routes
//------------------------------

app.post('/searches/show', performSearch);

//------------------------------
// Catch-All Maybe for later
//------------------------------
// app.get('*', (request, response) => response.status(404).send('This route does not exist'));


//------------------------------
// Constructor Functions
//------------------------------

function Book(info) {
  console.log(info);
  this.image_url = info.imageLinks.thumbnail || 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = info.title || 'No title available';
  this.author = info.authors || 'No author by that name';
}

// errorHandler {
//   if(error === undefined) {
//     app.get('/error', (request, response) => {
//       response.render('pages/error');
//     });
//   }
// });

//------------------------------
// Callbacks
//------------------------------

function performSearch(request, response) {
  console.log(request.body);
  let url = `https://www.googleapis.com/books/v1/volumes?q=+in${request.body.search[1]}:${request.body.search[0]}`;

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(books => response.render('pages/searches/show', {searchResult: books}))
    .catch(console.error);
}


app.get('/', (request, response) => {
  response.render('pages/index');
});

app.get('/error', (request, response) => {
  response.render('pages/error');
});

// app.get('/error', (request, response) => {
//   response.render('pages/error');
// });
// THIS IS TO BE FOR THE LIST VIEW


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
