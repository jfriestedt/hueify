import { combineReducers } from 'redux';
import tokens from './tokens';
import spotifyPlayerMountStatus from './spotify_player_mount_status'
import spotifyPlayerState from './spotify_player_state'
import hueBridgeIps from './hue_bridge_ips'

export default combineReducers({
  tokens,
  spotifyPlayerMountStatus,
  spotifyPlayerState,
  hueBridgeIps
});
