export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'NEW_PALETTE':
      return payload;
    case 'NO_PALETTE':
      return {}
    default:
      return state;
  }
}
