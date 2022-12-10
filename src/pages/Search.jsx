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

  handleSubmit = (event) => {
    event.preventDefault();
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
        <main className="search-container">
          <h2>Pesquise sua Música:</h2>
          <form className="albums-search" onSubmit={ this.handleSubmit }>
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
            >
              Procurar

            </button>
          </form>
          <div className="search-result-container">
            {isSearching && (
              <>
                <h4>{`Resultado de álbuns de: ${oldSearch}`}</h4>
                <AlbumsCard albums={ albums } />
              </>
            )}
            {loading && <div className="login-loading "><Loading /></div>}
          </div>
        </main>
      </div>
    );
  }
}
