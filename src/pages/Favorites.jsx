import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicsCard from '../components/MusicCard';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      loadingCard: false,
      favSongs: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const favSongs = await getFavoriteSongs();
      if (favSongs.length > 0) {
        this.setState({ loading: false, favSongs });
      } else {
        this.setState({ loading: false, favSongs: [] });
      }
    });
  }

  handleFavorites = (param) => {
    this.setState({ loadingCard: true }, async () => {
      await removeSong(param);
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
    const { loading, loadingCard, favSongs } = this.state;
    if (loading) {
      return (
        <div data-testid="page-favorites">
          <Header />
          Favorites
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        <MusicsCard
          musics={ favSongs }
          favSongs={ favSongs }
          loading={ loadingCard }
          onChange={ this.handleFavorites }
        />

      </div>
    );
  }
}
