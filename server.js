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


// Database Setup 
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Server-Side Templating
//--------------------------
// For CSS
app.use(express.static(__dirname + '/public'));
// For rendering
app.set('view engine', 'ejs');

// Routes
//-----------------------------
app.post('/searches/show', performSearch);
app.post('/books/detail', addBook);

// Catch-All Maybe for later
// app.get('*', (request, response) => response.status(404).send('This route does not exist'));



// Constructor Functions
function Book(info) {
  this.image_url = info.imageLinks.thumbnail || 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = info.title || 'No title available';
  this.author = info.authors || 'No author by that name';
  this.description = info.description;
  this.isbn = info.industryIdentifiers[1].identifier;
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

function addBook(request, response) {
  let {author, title, isbn, image_url, description, bookshelf} = request.body;
  console.log('book');
  let SQL = 'INSERT INTO books_app(author, title, isbn, image_url, description, bookshelf) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
  let values = [author, title, isbn, image_url, description, bookshelf];

  return client.query(SQL, values)
    .then(result => {
      response.redirect('/');
    })
    .catch(error => handleError(error, response));
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

function handleError(error, response){
  response.render('pages/error', {error: 'Books error'});
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
