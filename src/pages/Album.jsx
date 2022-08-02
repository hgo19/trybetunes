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

  // handleFavorites = () => {
  //   this.setState(async () => {
  //     const favSongs = await getFavoriteSongs();
  //     this.setState({ favSongs });
  //   });
  // }

  render() {
    const { musics, loading, favSongs, loadingCard } = this.state;
    const musicsArray = [...musics];
    musicsArray.shift();
    // console.log(checked);
    return (
      <>
        <Header />
        <div data-testid="page-album">
          {loading && <Loading />}
          {musics.length > 0 && (
            <div>
              <img src={ musics[0].artworkUrl100 } alt={ musics[0].collectionName } />
              <h1 data-testid="album-name">{musics[0].collectionName}</h1>
              <h3 data-testid="artist-name">{musics[0].artistName}</h3>
            </div>
          )}
          {musics.length > 0 && <MusicsCard
            musics={ musicsArray }
            favSongs={ favSongs }
            loading={ loadingCard }
            onChange={ this.handleFavorites }
          />}
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
