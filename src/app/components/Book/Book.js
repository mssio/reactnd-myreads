import React from 'react';
import PropTypes from 'prop-types';

const { string, array, func } = PropTypes;

Book.propTypes = {
  shelf: string.isRequired,
  title: string.isRequired,
  authors: array.isRequired,
  imageUrl: string.isRequired,
  onMoveBook: func.isRequired,
};

export default function Book (props) {
  const { id, shelf, title, authors, imageUrl } = props;

  return (
    <div className='book'>
      <div className='book-top'>
        <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url("${imageUrl}")` }} />
        <div className='book-shelf-changer'>
          <select value={shelf} onChange={(e) => {
              props.onMoveBook(id, e.target.value)
            }}>
            <option value='none' disabled>Move to...</option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{title}</div>
      {
        authors.map((author, key) => (
          <div key={key} className='book-authors'>{author}</div>
        ))
      }
    </div>
  );
}
