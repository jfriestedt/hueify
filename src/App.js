import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import registerTokens from './actions/tokens'

import LoginPrompt from './components/login'
import PlayerInterface from './components/player_interface'
import AlbumArt from './components/album_art'

class App extends Component {
  constructor () {
    super();
    this.appStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute'
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      this.props.dispatch({ type: 'SPOTIFY_PLAYER_MOUNT_READY' });
    };
  }

  componentDidMount () {
    const urlParams = new URLSearchParams(window.location.search),
          accessToken = urlParams.get('access_token'),
          refreshToken = urlParams.get('refresh_token');
    if (accessToken && refreshToken) {
      this.props.dispatch(registerTokens({ accessToken, refreshToken }))
    }
  }


  render () {
    return (
      <div className="App" style={this.appStyle}>
        <Helmet>
          <script src="https://sdk.scdn.co/spotify-player.js"></script>
        </Helmet>

        <LoginPrompt />
        <PlayerInterface />
        <AlbumArt />
      </div>
    );
  }
}

export default connect()(App);
