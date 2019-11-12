import { combineReducers } from 'redux';
import tokens from './tokens';
import spotifyPlayerMountStatus from './spotify_player_mount_status'
import spotifyPlayerState from './spotify_player_state'

export default combineReducers({
  tokens,
  spotifyPlayerMountStatus,
  spotifyPlayerState
});
