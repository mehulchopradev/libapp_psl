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
    ratings: 4,
    reviews: [
      {
        id: 1,
        description: 'This has been the best book evert written',
        name: 'Guido van rossum'
      },
      {
        id: 2,
        description: 'This is python at its best',
        name: 'Mehul Chopra'
      }
    ]
  },
  {
    id: 2,
    title: 'Programming in scala',
    pages: 250,
    price: 600,
    publicationHouse: 'Martin Ordesky LLP',
    ratings: 5,
    reviews: [
      {
        id: 3,
        description: 'Superb book on how to achieve functional programming using Scala',
        name: 'James Gosling'
      }
    ]
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

  res.status(201).send({
    book: bookToPush
  });
});

app.get('/books/:id', (req, res) => {
  setTimeout(() => {
    const bookId = parseInt(req.params['id']);
    const foundBooks = books.filter(book => {
      return book.id === bookId;
    });

    if (foundBooks.length > 0) {
      const bookToSend = { ...foundBooks[0] };
      const reviews = bookToSend.reviews;
      delete bookToSend.reviews;

      if (reviews) {
        bookToSend.reviews = reviews.map(review => review.id);
      }

      res.send({ books: bookToSend, reviews, });
    } else {
      res.status(404).send('Not found');
    }
  }, 5000);
});

app.listen(port, () => console.log(`Lib app listening on port ${port}!`));
