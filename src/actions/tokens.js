import { assign } from 'lodash'

export default function (tokens) {
  return assign(tokens, { type: 'REGISTER_TOKENS' })
}
