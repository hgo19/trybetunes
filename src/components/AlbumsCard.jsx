import PropTypes, { object } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AlbumsCard extends Component {
  render() {
    const { albums, serachValue } = this.props;
    if (albums.length > 0) {
      return (
        <div>
          <h4>{`Resultado de álbuns de: ${serachValue}`}</h4>
          {albums.map((e, index) => (
            <div key={ index }>
              <img src={ e.artworkUrl100 } alt={ e.collectionName } />
              <p>{e.artistName}</p>
              <p>{e.collectionName}</p>
              <p>{e.releaseDate}</p>
              <Link to={ `/album/${e.collectionId}` }>
                <button
                  data-testid={ `link-to-album-${e.collectionId}` }
                  type="button"
                >
                  Ver Album

                </button>
              </Link>
            </div>))}
        </div>
      );
    }
    return (
      <div>
        <h4>{`Resultado de álbuns de: ${serachValue}`}</h4>
        <p>Nenhum álbum foi encontrado</p>
      </div>
    );
  }
}

AlbumsCard.propTypes = {
  albums: PropTypes.arrayOf(object.isRequired).isRequired,
  serachValue: PropTypes.string.isRequired,
};
