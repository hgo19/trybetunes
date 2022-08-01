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
        loading: false });
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        <nav>
          <ul>
            <Link to="/search">
              <li data-testid="link-to-search">Search</li>
            </Link>
            <Link to="/favorites">
              <li data-testid="link-to-favorites">Musicas Favoritas</li>
            </Link>
            <Link to="/profile">
              <li data-testid="link-to-profile">Perfil</li>
            </Link>
          </ul>
        </nav>
        {loading ? <Loading /> : <span data-testid="header-user-name">{userName}</span>}
      </header>
    );
  }
}
