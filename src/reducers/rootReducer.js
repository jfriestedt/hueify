import { combineReducers } from 'redux';
import tokens from './tokens';
import spotifyPlayerStatus from './spotifyPlayerStatus'

export default combineReducers({
  tokens,
  spotifyPlayerStatus
});
