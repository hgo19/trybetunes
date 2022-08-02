import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicsCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      musics: [],
    };
  }

  componentDidMount() {
    this.setState(async () => {
      const { match: { params: { id } } } = this.props;
      const fetchMusics = await getMusics(id);
      this.setState({ musics: fetchMusics,
        loading: false });
    });
  }

  render() {
    const { musics, loading } = this.state;
    const musicsArray = [...musics];
    musicsArray.shift();
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
          {musics.length > 0 && <MusicsCard musics={ musicsArray } />}
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
