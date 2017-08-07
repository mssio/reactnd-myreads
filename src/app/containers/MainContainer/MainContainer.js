import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Main } from 'app/components';

const { object } = PropTypes;

class MainContainer extends Component {
  static propTypes = {
    history: object.isRequired,
  }

  handleSearch = () => {
    this.props.history.push('/search');
  }

  render () {
    return (
      <Main onSearch={this.handleSearch}/>
    );
  }
}

export default MainContainer;
