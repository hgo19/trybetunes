// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const userObj = await getUser();
      this.setState({ userName: userObj.name,
        image: userObj.image,
        loading: false });
    });
  }

  render() {
    const { userName, loading, image } = this.state;
    return (
      <header data-testid="header-component" className="header-container">
        <sidebar className="sidebar-container">
          <h1>
            <span>Trybe</span>
            Tunes
          </h1>
          <ul>
            <Link to="/search">
              <li data-testid="link-to-search">
                Search
              </li>
            </Link>
            <Link to="/favorites">
              <li data-testid="link-to-favorites">Musicas Favoritas</li>
            </Link>
            <Link to="/profile">
              <li data-testid="link-to-profile">Perfil</li>
            </Link>
          </ul>
        </sidebar>
        <div className="user">
          <Link to="/profile">
            <img src={ image } alt={ userName } />
            {loading ? <Loading /> : (
              <span data-testid="header-user-name">{userName}</span>
            )}
          </Link>
        </div>
      </header>
    );
  }
}
