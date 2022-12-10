import PropTypes, { object } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AlbumsCard extends Component {
  render() {
    const { albums } = this.props;
    if (albums.length > 0) {
      return (
        <div className="albums-container">
          {albums.map((e, index) => (
            <Link key={ index } to={ `/trybetunes/album/${e.collectionId}` }>
              <div className="album-card">
                <div className="album-img-and-title">
                  <img src={ e.artworkUrl100 } alt={ e.collectionName } />
                  <p>{`Album: ${e.collectionName}`}</p>
                </div>
                <div className="artist-album-name">
                  {`Artista: ${e.artistName}`}
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
    }
    return (
      <div>
        <p>Nenhum álbum foi encontrado</p>
      </div>
    );
  }
}

AlbumsCard.propTypes = {
  albums: PropTypes.arrayOf(object.isRequired).isRequired,
};
