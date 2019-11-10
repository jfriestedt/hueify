import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginPrompt from './components/login'

class App extends Component {
  state = {users: []}

  componentDidMount() {

    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render () {
    return (
      <div className="App">
        <LoginPrompt />
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default connect()(App);
