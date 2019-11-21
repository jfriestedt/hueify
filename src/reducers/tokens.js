import { assign } from 'lodash';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'REGISTER_TOKENS':
      return assign({}, state, { refreshToken: payload });
    default:
      return state;
  }
}
