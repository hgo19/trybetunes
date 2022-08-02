import PropTypes, { object } from 'prop-types';
import React, { Component } from 'react';
// import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicsList extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     loading: false,
  //   };
  // }

  // handleFavorites = (param, { target }) => {
  //   const { name, checked } = target;
  //   this.setState({ loading: true,
  //     [name]: checked }, async () => {
  //     await addSong(param);
  //     this.setState({ loading: false, [name]: !checked });
  //   });
  // }

  // handleFavorites = (param) => {
  //   const { updateFavs } = this.props;
  //   this.setState({ loading: true }, async () => {
  //     await addSong(param);
  //     this.setState({ loading: false });
  //     updateFavs;
  //   });
  // }

  render() {
    const { musics, favSongs, loading, onChange } = this.props;
    // const { loading } = this.state;
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
            <label htmlFor={ `id-${e.trackName}` }>
              <input
                id={ `id-${e.trackName}` }
                data-testid={ `checkbox-music-${e.trackId}` }
                type="checkbox"
                checked={ favSongs.some((fav) => fav.trackName === e.trackName) }
                onChange={ () => onChange({ ...e }) }
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
  favSongs: PropTypes.arrayOf(object.isRequired).isRequired,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
