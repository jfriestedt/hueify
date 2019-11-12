export default (state = {}, { type, state: playerState }) => {
  switch (type) {
    case 'SPOTIFY_PLAYER_STATE_CHANGED':
      return playerState;
    default:
      return state;
  }
}
