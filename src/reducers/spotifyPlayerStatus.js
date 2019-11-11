export default (state = 'NOT_READY', action) => {
  switch (action.type) {
    case 'SPOTIFY_PLAYER_STATUS':
      return action.status
    default:
      return state;
  }
}
