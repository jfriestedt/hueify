import React, { Component } from 'react';
import { connect } from 'react-redux';

import registerTokens from './actions/tokens'

import LoginPrompt from './components/login'
import Player from './components/player'

class App extends Component {
  constructor () {
    super();
    this.appStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute'
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      this.props.dispatch({ type: 'SPOTIFY_PLAYER_STATUS', status: 'READY' });
    };
  }

  componentDidMount () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('access_token') && urlParams.has('refresh_token')) {

      this.props.dispatch(registerTokens({
        accessToken: urlParams.get('access_token'),
        refreshToken: urlParams.get('refresh_token')
      }))
    }
  }


  render () {
    return (
      <div className="App" style={this.appStyle}>
        <LoginPrompt />
        <Player />
      </div>
    );
  }
}

export default connect()(App);
