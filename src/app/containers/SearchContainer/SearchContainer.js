import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce'
import { getAll, search, update } from 'app/services/BooksAPI'
import { Search, Loading } from 'app/components';

const { object } = PropTypes;

class SearchContainer extends Component {
  static propTypes = {
    history: object.isRequired,
  }

  state = {
    isLoading: true,
    bookSearchResults: [],
    myBooks: new Map(),
    searchQuery: '',
  }

  componentDidMount () {
    getAll()
      .then(this._setMyBooks)
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  handleMoveBook = (book, toShelf) => {
    this.setState({isLoading: true}, () => {
      update(book, toShelf)
        .then((res) => {
          const findBook = this.state.myBooks.get(book.id)
          const movedBook = typeof(findBook) === 'undefined'
            ? book
            : findBook
          const books = this.state.myBooks;
          movedBook.shelf = toShelf;
          books.delete(book.id);
          books.set(movedBook.id, movedBook);
          this.setState({
            isLoading: false,
            myBooks: books
          });
        });
    });
  }

  handleSearch = debounce((query) => {
    if (query !== '') {
      this.setState({
        isLoading: true,
        searchQuery: query,
      }, () => {
        search(query, 20)
          .then((res) => {
            if (Array.isArray(res)) {
              const bookSearchResults = res.map(book => {
                if (this.state.myBooks.has(book.id)) {
                  book.shelf = this.state.myBooks.get(book.id).shelf;
                }
                return book;
              })
              this.setState({
                isLoading: false,
                bookSearchResults: bookSearchResults,
              });
            } else {
              this.setState({
                isLoading: false,
              });
            }
          })
        .catch(err => {
          console.warn('Error when processing search results');
        })
      })
    } else {
      this.setState({
        bookSearchResults: [],
      });
    }
  }, 1000)

  _setMyBooks = (booksFromAPI) => {
    const books = new Map(booksFromAPI.map((book) => {
      return [
        book.id,
        book
      ]
    }))
    this.setState({
      isLoading: false,
      myBooks: books
    })
  }

  render () {
    return this.state.isLoading
      ? <Loading />
      : (
        <Search
          onBack={this.handleBack}
          onSearch={this.handleSearch}
          onMoveBook={this.handleMoveBook}
          myBooks={this.state.myBooks}
          bookSearchResults={this.state.bookSearchResults}
          searchQuery={this.state.searchQuery} />
      );
  }
}

export default SearchContainer;
