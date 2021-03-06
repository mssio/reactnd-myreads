import React from 'react';
import PropTypes from 'prop-types';

const { string, array, shape, func } = PropTypes;

Book.propTypes = {
  book: shape({
    id: string.isRequired,
    shelf: string,
    title: string.isRequired,
    authors: array,
    imageLinks: shape({
      smallThumbnail: string,
      thumbnail: string,
    }),
  }).isRequired,
  onMoveBook: func.isRequired,
};

export default function Book (props) {
  const { book } = props;

  // Set default book props here
  if (! ('shelf' in book)) {
    book.shelf = 'none';
  }
  if (! ('authors' in book)) {
    book.authors = [];
  }
  if (! ('imageLinks' in book)) {
    book.imageLinks = {};
  }

  return (
    <div className='book'>
      <div className='book-top'>
        <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }} />
        <div className='book-shelf-changer'>
          <select value={book.shelf} onChange={(e) => {
              props.onMoveBook(book, e.target.value)
            }}>
            <option value='none' disabled>Move to...</option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{book.title}</div>
      {
        book.authors.map((author, key) => (
          <div key={key} className='book-authors'>{author}</div>
        ))
      }
    </div>
  );
}
