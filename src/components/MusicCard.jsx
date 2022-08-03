import PropTypes, { object } from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';

export default class MusicsList extends Component {
  render() {
    const { musics, favSongs, loading, onChange } = this.props;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <h1>MusicsList</h1>
        {musics.map((e, index) => (
          <div key={ index } className="music">
            <p>{e.trackName}</p>
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
                onChange={ (event) => onChange({ ...e }, event) }
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
