export default (state = [], { type, payload }) => {
  switch (type) {
    case 'HUE_BRIDGES_DISCOVERED':
      return payload
    default:
      return state;
  }
}
