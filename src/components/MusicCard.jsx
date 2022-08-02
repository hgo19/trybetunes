import PropTypes, { object } from 'prop-types';
import React, { Component } from 'react';

export default class MusicsList extends Component {
  render() {
    const { musics } = this.props;
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
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>))}
      </div>
    );
  }
}

MusicsList.propTypes = {
  musics: PropTypes.arrayOf(object.isRequired).isRequired,
};
