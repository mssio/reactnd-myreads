import React from 'react';
import PropTypes from 'prop-types';
import { Book } from 'app/components';
import './styles.css';

const { func, array } = PropTypes;

Main.propTypes = {
  onSearch: func.isRequired,
  currentlyReadingBooks: array.isRequired,
  wantToReadBooks: array.isRequired,
  readBooks: array.isRequired,
  onMoveBook: func.isRequired,
};

export default function Main (props) {
  const showCurrentlyReadingBooks = props.currentlyReadingBooks.map((book, key) => (
    <li key={key}>
      <Book
        id={book.id}
        shelf={book.shelf}
        title={book.title}
        authors={book.authors}
        imageUrl={book.imageUrl}
        onMoveBook={props.onMoveBook} />
    </li>
  ));
  const showWantToReadBooks = props.wantToReadBooks.map((book, key) => (
    <li key={key}>
      <Book
        id={book.id}
        shelf={book.shelf}
        title={book.title}
        authors={book.authors}
        imageUrl={book.imageUrl}
        onMoveBook={props.onMoveBook} />
    </li>
  ))
  const showReadBooks = props.readBooks.map((book, key) => (
    <li key={key}>
      <Book
        id={book.id}
        shelf={book.shelf}
        title={book.title}
        authors={book.authors}
        imageUrl={book.imageUrl}
        onMoveBook={props.onMoveBook} />
    </li>
  ))

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {showCurrentlyReadingBooks}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {showWantToReadBooks}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {showReadBooks}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <a onClick={props.onSearch}>Add a book</a>
      </div>
    </div>
  );
}
