'use strict';

// Application Dependencies
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const methodOverride = require('method-override');

// Environment Variable
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

// Uncomment when ready
// app.use(methodOverride(function (req, res) {
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     // look in urlencoded POST bodies and delete it
//     console.log(req.body._method);
//     var method = req.body._method
//     delete req.body._method
//     return method
//   }
// }));


// Database Setup - Does not work for FD
// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();
// client.on('error', err => console.error(err));

//------------------------------
// Server-Side Templating
//------------------------------

// For CSS
app.use(express.static(__dirname + '/public'));
// For rendering
app.set('view engine', 'ejs');

// Routes

app.post('/searches/show', performSearch);


// Catch-All Maybe for later
// app.get('*', (request, response) => response.status(404).send('This route does not exist'));



// Constructor Functions
function Book(info) {
  console.log(info);
  this.image_url = info.imageLinks.thumbnail || 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = info.title || 'No title available';
  this.author = info.authors || 'No author by that name';
  this.description = info.description;
  this.isbn = info.industryIdentifiers[0].identifier;
}


// errorHandler {
//   if(error === undefined) {
//     app.get('/error', (request, response) => {
//       response.render('pages/error');
//     });
//   }
// });

// Callbacks

function performSearch(request, response) {
  let url = `https://www.googleapis.com/books/v1/volumes?q=+in${request.body.search[1]}:${request.body.search[0]}`;

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(books => response.render('pages/searches/show', {searchResult: books}))
    .catch(console.error);
}


app.get('/', (request, response) => {
  response.render('pages/index');
});

app.get('/searches/new', (request, response) => {
  response.render('pages/searches/new');
});


app.get('/error', (request, response) => {
  response.render('pages/error');
});


// app.get('/error', (request, response) => {
//   response.render('pages/error');
// });
// THIS IS TO BE FOR THE LIST VIEW


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
