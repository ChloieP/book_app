'use strict';

//------------------------------
// Application Dependencies
//------------------------------
const express = require('express');
const superagent = require('superagent');

//------------------------------
// Application Setup
//------------------------------

const app = express();
const PORT = process.env.PORT || 3000;

//------------------------------
// Application Middleware
//------------------------------

app.use(express.urlencoded({extended:true}));
// app.use(express.static('public'));   ??? May USE LATER

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
  this.author = info.author || 'No author by that name';
}

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

// app.get('/error', (request, response) => {
//   response.render('pages/error', {arrayOfItems: list});
// });



app.listen(PORT, () => console.log(`Listening on ${PORT}`));
