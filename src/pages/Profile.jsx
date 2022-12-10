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
          <div className="login-loading "><Loading /></div>
        </div>
      );
    }
    return (
      <div data-testid="page-profile">
        <Header />
        Profile
        <div className="profile-container">
          <div className="profile-box">
            <img
              data-testid="profile-image"
              src={ image }
              alt={ name }
            />
            <p>
              <strong>Nome:</strong>
              {' '}
              {name}
            </p>
            <p>
              <strong>Email:</strong>
              {' '}
              {email}
            </p>
            <p>
              <strong>Descrição:</strong>
              {' '}
              {description}
            </p>
            <Link to="/trybetunes/profile/edit">
              Editar perfil
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
