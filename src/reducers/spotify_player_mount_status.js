export default (state = 'NOT_READY', { type }) => {
  switch (type) {
    case 'SPOTIFY_PLAYER_MOUNT_READY':
    case 'SPOTIFY_PLAYER_MOUNTED':
      return type
    default:
      return state;
  }
}
