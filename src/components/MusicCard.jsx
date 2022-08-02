import PropTypes, { object } from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicsList extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      // favSongs: [],
    };
  }

  // handleFavorites = (param) => {
  //   this.setState({ loading: true }, async () => {
  //     await addSong(param);
  //     const favSongs = await getFavoriteSongs();
  //     this.setState({ loading: false,
  //       favSongs });
  //   });
  // }

  handleFavorites = (param, { target }) => {
    const { name, checked } = target;
    this.setState({ loading: true,
      [name]: checked }, async () => {
      await addSong(param);
      this.setState({ loading: false });
    });
  }

  render() {
    const { musics } = this.props;
    const { loading } = this.state;
    // const checked = musics.some((e) => favSongs
    //   .some((fav) => e.trackName === fav.trackName));
    // console.log(checked);
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <h1>MusicsList</h1>
        {musics.map((e, index) => (
          <div key={ index }>
            {e.trackName}
            <audio data-testid="audio-component" src={ e.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="fav">
              <input
                id="fav"
                data-testid={ `checkbox-music-${e.trackId}` }
                type="checkbox"
                name={ e.trackName }
                checked={ !e.trackName ? false : e.trackName }
                onChange={ (event) => this.handleFavorites({ ...e }, event) }
              />
              Favorita
            </label>
          </div>))}
      </div>
    );
  }
}

MusicsList.propTypes = {
  musics: PropTypes.arrayOf(object.isRequired).isRequired,
};
