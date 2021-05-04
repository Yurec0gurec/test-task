import { GET_PHOTOS } from '../actions/constants'

const photoReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_PHOTOS:
      return payload
    default:
      return state
  }
}

export default photoReducer;
