import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/trybetunes/" component={ Login } />
          <Route exact path="/trybetunes/search" component={ Search } />
          <Route
            exact
            path="/trybetunes/album/:id"
            render={ (props) => <Album { ...props } /> }
          />
          <Route exact path="/trybetunes/favorites" component={ Favorites } />
          <Route exact path="/trybetunes/profile" component={ Profile } />
          <Route exact path="/trybetunes/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
