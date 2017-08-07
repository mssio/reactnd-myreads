import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'app/components';

const { object } = PropTypes;

class SearchContainer extends Component {
  static propTypes = {
    history: object.isRequired,
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  render () {
    return (
      <Search onBack={this.handleBack}/>
    );
  }
}

export default SearchContainer;
