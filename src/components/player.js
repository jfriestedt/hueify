import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  constructor () {
    super();
    this.state = { deviceId: null }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.spotifyPlayerReady !== this.props.spotifyPlayerReady ||
      nextProps.accessToken !== this.props.accessToken ||
      nextState.deviceId !== this.state.deviceId
    )
  }

  mountPlayer () {
    const Spotify = window.Spotify;
    const player = new Spotify.Player({
      name: '_*_HUEIFY_*_',
      getOAuthToken: cb => {
        cb(this.props.accessToken);
      }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => {
      console.error(message);
    });
    player.addListener('authentication_error', ({ message }) => {
      console.error(message);
    });
    player.addListener('account_error', ({ message }) => {
      console.error(message);
    });
    player.addListener('playback_error', ({ message }) => {
      console.error(message);
    });

    // Playback status updates
    player.addListener('player_state_changed', state => {
      console.log(state);
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      this.setState({ deviceId: device_id });
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();
    this.props.dispatch({ type: 'SPOTIFY_PLAYER_STATUS', status: 'MOUNTED' })
  }

  componentDidUpdate () {
    if (
      this.props.accessToken &&
      this.props.spotifyPlayerReady &&
      !this.props.spotifyPlayerMounted
    ) {
      this.mountPlayer();
    }
  }

  render () {
    debugger
    return this.props.spotifyPlayerMounted ?
      <div>Device ID: {this.state.deviceId}</div> :
      null
  }
}

const mapStateToProps = ({ tokens: { accessToken }, spotifyPlayerStatus }) => {
  return {
    accessToken,
    spotifyPlayerReady: spotifyPlayerStatus === 'READY',
    spotifyPlayerMounted: spotifyPlayerStatus === 'MOUNTED'
  }
}

export default connect(mapStateToProps)(Player);
