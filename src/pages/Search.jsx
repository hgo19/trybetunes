import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumsCard from '../components/AlbumsCard';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      loading: false,
      search: '',
      albums: [],
      isSearching: false,
      oldSearch: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    if (value.length >= 2) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { search } = this.state;
    this.setState({ loading: true,
      isSearching: true,
      oldSearch: search }, async () => {
      const fetchAlbum = await searchAlbumsAPIs(search);
      this.setState({ albums: fetchAlbum,
        search: '',
        loading: false });
    });
  }

  render() {
    const { isDisabled, search, albums, loading, isSearching, oldSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
        <form className="albums-search">
          <input
            data-testid="search-artist-input"
            type="text"
            name="search"
            value={ search }
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Procurar

          </button>
        </form>
        <div className="albums-container">
          {loading && <Loading />}
          {isSearching && <AlbumsCard albums={ albums } serachValue={ oldSearch } />}
        </div>
      </div>
    );
  }
}
