import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAll, update } from 'app/services/BooksAPI'
import { Main, Loading } from 'app/components';

const { object } = PropTypes;

class MainContainer extends Component {
  static propTypes = {
    history: object.isRequired,
  }

  state = {
    isLoading: true,
    books: new Map(),
  }

  componentDidMount () {
    getAll()
      .then(this._setBooks)
  }

  handleMoveBook = (book, toShelf) => {
    this.setState({isLoading: true}, () => {
      update(book, toShelf)
        .then((res) => {
          const movedBook = this.state.books.get(book.id)
          const books = this.state.books
          movedBook.shelf = toShelf
          books.delete(book.id)
          books.set(movedBook.id, movedBook)
          this.setState({
            isLoading: false,
            books: books
          })
        });
    });
  }

  handleSearch = () => {
    this.props.history.push('/search');
  }

  _setBooks = (booksFromAPI) => {
    const books = new Map(booksFromAPI.map((book) => {
      return [
        book.id,
        book
      ]
    }))
    this.setState({
      isLoading: false,
      books: books
    })
  }

  render () {
    const currentlyReadingBooks = [];
    const wantToReadBooks = [];
    const readBooks = [];

    this.state.books.forEach(book => {
      switch (book.shelf) {
        case 'currentlyReading':
          currentlyReadingBooks.push(book)
          break;
        case 'wantToRead':
          wantToReadBooks.push(book)
          break;
        case 'read':
          readBooks.push(book)
          break;
        default:
          break;
      }
    });

    return this.state.isLoading
      ? <Loading />
      : (
        <Main
          onSearch={this.handleSearch}
          currentlyReadingBooks={currentlyReadingBooks}
          wantToReadBooks={wantToReadBooks}
          readBooks={readBooks}
          onMoveBook={this.handleMoveBook} />
      );
  }
}

export default MainContainer;
