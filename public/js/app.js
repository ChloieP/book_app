'use strict';

$('.selectBook').on('click', function(event) {
  event.preventDefault();
  console.log('hello');
  $('.bookForm').removeClass('hideMe');
});
