import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableLogin: true,
      userName: '',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOWVmNQHzLGv64c_-D343Ea8ZGURbdgJcvhg&usqp=CAU',
      loading: false,
    };
  }

  handleLogin = ({ target }) => {
    const { value } = target;
    this.setState({ userName: value }, () => {
      const { userName } = this.state;
      const MIN_LOGIN_CHARACTERES = 3;
      if (userName.length >= MIN_LOGIN_CHARACTERES) {
        this.setState({ disableLogin: false });
      } else {
        this.setState({ disableLogin: true });
      }
    });
  }

  handleClick = () => {
    this.setState({ loading: true }, async () => {
      const { userName, image } = this.state;
      const { history } = this.props;
      await createUser({ name: userName, image });
      history.push('/search');
    });
  }

  render() {
    const { disableLogin, loading } = this.state;
    if (loading) {
      return (
        <div className="login-loading">
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-login" className="login-container">
        <div className="login-box">
          <h1>
            <span>Trybe</span>
            {' '}
            Tunes
          </h1>
          <h4>
            Welcome, enter your name and enjoy
          </h4>
          <form className="login-form" onSubmit={ this.handleClick }>
            <input
              data-testid="login-name-input"
              type="text"
              name="name"
              onChange={ (e) => this.handleLogin(e) }
            />
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ disableLogin }
            >
              Entrar

            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
