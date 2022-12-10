// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';
import { AiFillStar, AiFillProfile } from 'react-icons/ai';
import { BsHouseDoorFill } from 'react-icons/bs';
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
          <hr />
          <ul>
            <li>
              <BsHouseDoorFill />
              <Link to="/">
                Home
              </Link>
            </li>
            <li data-testid="link-to-search">
              <FaSearch />
              <Link to="/search">
                Search
              </Link>
            </li>
            <li data-testid="link-to-favorites">
              <AiFillStar />
              <Link to="/favorites">
                Musicas Favoritas
              </Link>
            </li>
            <li data-testid="link-to-profile">
              <FaUser />
              <Link to="/profile">
                Perfil
              </Link>
            </li>
            <li>
              <AiFillProfile />
              <Link to="/profile/edit">
                Editar Perfil
              </Link>
            </li>
          </ul>
          <hr />
          <div className="user">
            <Link to="/profile">
              <img src={ image } alt={ userName } />
              {loading ? <Loading /> : (
                <span data-testid="header-user-name">{userName}</span>
              )}
            </Link>
          </div>
        </sidebar>
      </header>
    );
  }
}
