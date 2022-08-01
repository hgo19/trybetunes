// import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
      <div data-testid="header-component">
        <h1>Header</h1>
        {loading ? <Loading /> : <span data-testid="header-user-name">{userName}</span>}
      </div>
    );
  }
}
