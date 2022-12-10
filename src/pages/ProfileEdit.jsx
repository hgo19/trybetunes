import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
      isDisabled: true,
    };
  }

  async componentDidMount() {
    const userObj = await getUser();
    this.setState({ loading: false,
      name: '',
      email: userObj.email,
      image: '',
      description: userObj.description }, () => this.validateButton());
  }

  validateButton = () => {
    const { name, email, image, description } = this.state;
    const boolLength = name.length > 0
      && email.length > 0 && image.length > 0 && description.length > 0;
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const checkEmail = email.match(pattern);
    const finalCheck = boolLength && checkEmail;
    this.setState({ isDisabled: !finalCheck });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validateButton();
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ loading: true }, async () => {
      const { name, email, image, description } = this.state;
      const userObj = {
        name,
        email,
        image,
        description,
      };
      await updateUser(userObj);
      const { history } = this.props;
      history.push('/profile');
    });
  }

  render() {
    const { loading, name, email, image, description, isDisabled } = this.state;
    if (loading) {
      return (
        <div data-testid="page-profile-edit">
          <Header />
          ProfileEdit
          <div className="login-loading "><Loading /></div>

        </div>
      );
    }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        ProfileEdit
        <div className="profile-edit">
          <div className="img-box">
            <img className="img-profile" src={ image } alt={ name } />
          </div>
          <form onSubmit={ this.handleClick }>
            <label htmlFor="input-name">
              <span>
                Nome:
              </span>
              <input
                id="input-name"
                data-testid="edit-input-name"
                name="name"
                value={ name }
                type="text"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-email">
              <span>
                Email:
              </span>
              <input
                id="input-email"
                data-testid="edit-input-email"
                name="email"
                value={ email }
                type="email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-description">
              <span>
                Description:
              </span>
              <textarea
                id="input-description"
                data-testid="edit-input-description"
                name="description"
                value={ description }
                type="text"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-image">
              <span>Imagem:</span>
              <input
                id="input-image"
                data-testid="edit-input-image"
                name="image"
                value={ image }
                type="text"
                onChange={ this.handleChange }
              />
            </label>
            <button
              className="save-edit"
              data-testid="edit-button-save"
              type="submit"
              disabled={ isDisabled }
            >
              Enviar

            </button>
          </form>
        </div>

      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
