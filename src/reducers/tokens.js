import { assign, pick } from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case 'REGISTER_TOKENS':
      return assign({}, state, pick(action, ['accessToken', 'refreshToken']));
    default:
      return state;
  }
}
