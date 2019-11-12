import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import registerTokens from '../actions/tokens';

class PlayerInterface extends Component {
  constructor () {
    super();
    this.state = { deviceId: null } // TODO JF: cut deviceId POC stuff
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.props.dispatch({ type: 'SPOTIFY_PLAYER_MOUNT_READY' });
    };
  }

  mountPlayer () {
    const Spotify = window.Spotify;
    const player = new Spotify.Player({
      name: '_*_HUEIFY_*_',
      getOAuthToken: (cb) => { cb(this.props.accessToken); }
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

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search),
          accessToken = urlParams.get('access_token'),
          refreshToken = urlParams.get('refresh_token');
    if (accessToken && refreshToken) {
      this.props.dispatch(registerTokens({
        accessToken,
        refreshToken
      }))
    }
  }

  componentDidUpdate () {
    if (
      this.props.accessToken &&
      this.props.spotifyPlayerMountReady
    ) {
      this.mountPlayer();
    }
  }

  renderConnectPrompt () {
    return isEmpty(this.props.spotifyPlayerState) ?
      <div>
        <h4>Connect to device:</h4>
        <h4><strong>_*_HUEIFY_*_</strong></h4>
      </div> :
      null
  }

  renderDeviceInfo () {
    return this.props.spotifyPlayerMounted ?
      <div>
        {this.renderConnectPrompt()}
        <p>{this.state.deviceId}</p>
      </div> :
      null
  }

  render () {
    return <div>
      <Helmet>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
      </Helmet>
      {this.renderDeviceInfo()}
    </div>
  }
}

const mapStateToProps = ({
  tokens: { accessToken },
  spotifyPlayerMountStatus,
  spotifyPlayerState
 }) => {
  return {
    accessToken,
    spotifyPlayerState,
    spotifyPlayerMountReady: spotifyPlayerMountStatus === 'SPOTIFY_PLAYER_MOUNT_READY',
    spotifyPlayerMounted: spotifyPlayerMountStatus === 'SPOTIFY_PLAYER_MOUNTED',
  }
}

export default connect(mapStateToProps)(PlayerInterface);
