export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'NEW_PALETTE':
      return payload;
    default:
      return state;
  }
}
