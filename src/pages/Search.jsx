import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    if (value.length >= 2) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="search"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
          >
            Procurar

          </button>
        </form>
      </div>
    );
  }
}
