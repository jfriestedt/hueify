import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { CSSTransition } from 'react-transition-group';
import registerTokens from '../actions/tokens';
import '../App.scss'

class PlayerInterface extends Component {
  constructor () {
    super();
    this.state = { mounting: false }
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.props.dispatch({ type: 'SPOTIFY_PLAYER_MOUNT_READY' });
    };
  }

  mountPlayer (initialAccessToken) {
    this.setState({ mounting: true })

    const player = new window.Spotify.Player({
      name: '_*_HUEIFY_*_',
      getOAuthToken: async (cb) => {
        const accessToken = initialAccessToken ?
          initialAccessToken :
          await fetch(
            '/refresh_token?refresh_token= ' + this.props.refreshToken
          ).access_token

        return cb(accessToken);
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
      this.props.dispatch({ type: 'SPOTIFY_PLAYER_STATE_CHANGED', state });
    });

    // Ready
    console.log('player exists: ' + !!player)
    console.log('adding ready listener')
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      this.props.dispatch({ type: 'SPOTIFY_PLAYER_MOUNTED' })
      this.setState({ mounting: false })
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
      this.props.dispatch(registerTokens({ accessToken, refreshToken }))
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      this.props.accessToken &&
      this.props.spotifyPlayerMountReady &&
      !this.state.mounting
    ) {
      console.log('mounting player')
      this.mountPlayer(this.props.accessToken);
    }
  }

  renderDeviceInfoLoading () {
    const loading = (
      this.props.accessToken &&
      this.props.spotifyPlayerMountReady &&
      !this.props.spotifyPlayerMounted
    )
    return <CSSTransition in={loading}
                          exit={false}
                          timeout={200}
                          classNames='device-info'
                          unmountOnExit >
      <div>
        <h4>Connecting to Spotify</h4>
        <h6>This could take a minute...</h6>
      </div>
    </CSSTransition>
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
    return <CSSTransition in={this.props.spotifyPlayerMounted}
                          timeout={200}
                          classNames='device-info'
                          unmountOnExit >
        <div>
          {this.renderConnectPrompt()}
        </div>
      </CSSTransition>
  }

  render () {
    return <div>
      <Helmet>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
      </Helmet>
      {this.renderDeviceInfoLoading()}
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
