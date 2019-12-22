const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const books = [
  {
    id: 1,
    title: 'Programming in python',
    pages: 900,
    price: 1000,
    publicationHouse: 'Mehul Learners Pvt Ltd',
    ratings: 4
  },
  {
    id: 2,
    title: 'Programming in scala',
    pages: 250,
    price: 600,
    publicationHouse: 'Martin Ordesky LLP',
    ratings: 5
  },
  {
    id: 3,
    title: 'Programming in javascript',
    pages: 500,
    price: 1500,
    publicationHouse: 'Mehul Learners Pvt Ltd',
    ratings: 4
  }
]

let i = 3;

app.use(cors());
app.use(bodyParser.json());

app.get('/books', (req, res) => {
  const q = req.query;

  if (!q.title) {
    res.send({ books: books.map(book => {
      if (!q.title) {
        return {
          id: book.id,
          title: book.title,
          };
        }
      }
    )});
    return;
  }

  const re = books.filter(book => book.title.toLowerCase().includes(q.title.toLowerCase()));
  res.send({
    books: re,
  });
});

app.post('/books', (req, res) => {
  const book = req.body.book;
  const bookToPush = {
    id: i + 1,
    title: book.title,
    pages: book.pages,
    price: book.price,
    publicationHouse: book.publicationHouse,
    ratings: book.ratings,
  };
  books.push(bookToPush);
  i += 1;

  res.send(bookToPush);
});

app.get('/books/:id', (req, res) => {
  setTimeout(() => {
    const bookId = parseInt(req.params['id']);
    const foundBooks = books.filter(book => {
      return book.id === bookId;
    });

    if (foundBooks.length > 0) {
      res.send({ books: foundBooks[0] });
    } else {
      res.status(404).send('Not found');
    }
  }, 5000);
});

app.listen(port, () => console.log(`Lib app listening on port ${port}!`));
