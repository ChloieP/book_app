
DROP TABLE IF EXISTS books_app;

CREATE TABLE books_app (
  id SERIAL PRIMARY KEY,
  author VARCHAR(100),
  title VARCHAR(100),
  isbn NUMERIC(13),
  image_url TEXT,
  description TEXT,
  bookshelf VARCHAR(100)
);

INSERT INTO books_app (author, title, isbn, image_url, description, bookshelf)
VALUES('John Steinbeck', 'Working Days: The Journals of The Grapes of Wrath', '9780140144574', 'http://books.google.com/books?id=qLCCepTTW-4C&printsec=frontcover&dq=inauthor:Steinbeck&hl=&cd=1&source=gbs_api', 'John Steinbeck wrote The Grapes of Wrath during an astonishing burst of activity between June and October of 1938. Throughout the time he was creating his greatest work, Steinbeck faithfully kept a journal revealing his arduous journey toward its completion. The journal, like the novel it chronicles, tells a tale of dramatic proportions—of dogged determination and inspiration, yet also of paranoia, self-doubt, and obstacles. It records in intimate detail the conception and genesis of The Grapes of Wrath and its huge though controversial success. It is a unique and penetrating portrait of an emblematic American writer creating an essential American masterpiece.', 'Test Passes' );

INSERT INTO books_app (author, title, isbn, image_url, description, bookshelf)
VALUES('John Steinbeck', 'Conversations with John Steinbeck', '9780878053605', 'http://books.google.com/books?id=mY98rl2LiuEC&printsec=frontcover&dq=inauthor:Steinbeck&hl=&cd=3&source=gbs_api', 'A New York Times Bestselling Author. Winner of the 1962 Nobel Prize for Literature. In this short book illuminated by a deep understanding and love of humanity, John Steinbeck retells an old Mexican folk tale. For the diver Kino, finding a magnificent pearl means the promise of a better life for his impoverished family. His dream blinds him to the greed and suspicions the pearl arouses in him and his neighbors, and even his loving wife cannot stem the events leading to tragedy.', 'Test Passes' );
