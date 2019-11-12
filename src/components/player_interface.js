import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayerInterface extends Component {
  constructor () {
    super();
    this.state = { deviceId: null } // TODO JF: cut deviceId POC stuff
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
    player.addListener('player_state_changed', (state) => {
      console.log(this.props.dispatch({
        type: 'SPOTIFY_PLAYER_STATE_CHANGED',
        state
      }));
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      this.setState({ deviceId: device_id });
      console.log('Ready with Device ID', device_id);
      this.props.dispatch({ type: 'SPOTIFY_PLAYER_MOUNTED' })
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();
  }

  componentDidUpdate () {
    if (
      this.props.accessToken &&
      this.props.spotifyPlayerMountReady
    ) {
      this.mountPlayer();
    }
  }

  render () {
    return this.props.spotifyPlayerMounted ?
      <div>Device ID: {this.state.deviceId}</div> :
      null
  }
}

const mapStateToProps = ({
  tokens: { accessToken },
  spotifyPlayerMountStatus,
  spotifyPlayerState
 }) => {
  return {
    accessToken,
    spotifyPlayerMountReady: spotifyPlayerMountStatus === 'SPOTIFY_PLAYER_MOUNT_READY',
    spotifyPlayerMounted: spotifyPlayerMountStatus === 'SPOTIFY_PLAYER_MOUNTED',
  }
}

export default connect(mapStateToProps)(PlayerInterface);
