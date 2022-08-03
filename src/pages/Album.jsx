import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicsCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loadingCard: false,
      musics: [],
      favSongs: [],
    };
  }

  componentDidMount() {
    this.setState(async () => {
      const { match: { params: { id } } } = this.props;
      const fetchMusics = await getMusics(id);
      const favSongs = await getFavoriteSongs();
      if (favSongs.length > 0) {
        this.setState({ favSongs });
      }
      this.setState({ musics: fetchMusics,
        loading: false });
    });
  }

  handleFavorites = (param, { target }) => {
    const { checked } = target;
    this.setState({ loadingCard: true }, async () => {
      if (checked) {
        await addSong(param);
      } else {
        await removeSong(param);
      }
      const favSongs = await getFavoriteSongs();
      if (favSongs.length > 0) {
        this.setState({ favSongs });
      } else {
        this.setState({ favSongs: [] });
      }
      this.setState({ loadingCard: false });
    });
  }

  render() {
    const { musics, loading, favSongs, loadingCard } = this.state;
    const musicsArray = [...musics];
    musicsArray.shift();
    return (
      <>
        <Header />
        <div data-testid="page-album" className="musics-container">
          {loading && <Loading />}
          {musics.length > 0 && (
            <div className="album-title">
              <img src={ musics[0].artworkUrl100 } alt={ musics[0].collectionName } />
              <div>
                <h1 data-testid="album-name">{musics[0].collectionName}</h1>
                <h3 data-testid="artist-name">{musics[0].artistName}</h3>
              </div>
            </div>
          )}
          {musics.length > 0
          && (
            <>
              <h1>Lista de Musicas:</h1>
              <MusicsCard
                musics={ musicsArray }
                favSongs={ favSongs }
                loading={ loadingCard }
                onChange={ this.handleFavorites }
              />
            </>
          )}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
