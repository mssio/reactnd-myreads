import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Book } from 'app/components';

const { func, array, string } = PropTypes;

class Search extends Component {
  static propTypes = {
    onBack: func.isRequired,
    onSearch: func.isRequired,
    bookSearchResults: array.isRequired,
    searchQuery: string.isRequired,
  }

  componentWillMount () {
    this.setState({
      query: this.props.searchQuery,
    })
  }

  handleChange = (e) => {
    this.setState({
      query: e.target.value
    }, () => {
      this.props.onSearch(this.state.query)
    });
  }

  render () {
    const showBooks = [];
    this.props.bookSearchResults.forEach(bookSearchResult => {
      showBooks.push(
        <li key={bookSearchResult.id}>
          <Book
            book={bookSearchResult}
            onMoveBook={this.props.onMoveBook} />
        </li>
      );
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={this.props.onBack}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" onChange={this.handleChange} value={this.state.query} placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showBooks}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
