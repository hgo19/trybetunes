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
      const { userName } = this.state;
      const { history } = this.props;
      await createUser({ name: userName });
      history.push('/search');
    });
  }

  render() {
    const { disableLogin, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            name="name"
            onChange={ (e) => this.handleLogin(e) }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ disableLogin }
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
