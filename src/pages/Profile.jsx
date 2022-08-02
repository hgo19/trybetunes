import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userObj: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.setState(async () => {
      const userObj = await getUser();
      this.setState({ userObj,
        loading: false });
    });
  }

  render() {
    const { userObj, loading } = this.state;
    const { name, email, image, description } = userObj;
    if (loading) {
      return (
        <div data-testid="page-profile">
          <Header />
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-profile">
        <Header />
        Profile
        <p>{name}</p>
        <p>{email}</p>
        <img
          data-testid="profile-image"
          src={ image }
          alt={ name }
        />
        <p>{description}</p>
        <Link to="/profile/edit">
          <button
            type="button"
          >
            Editar perfil

          </button>
        </Link>
      </div>
    );
  }
}
