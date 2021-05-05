import { GET_PHOTOS } from '../actions/constants'
import { START_GET_PHOTOS_REQUEST } from '../actions/constants';

const photoReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case START_GET_PHOTOS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_PHOTOS:
      return {
        ...state,
        photos: state.photos ? [...state.photos, ...payload] : [...payload],
        loading: false
      }
    default:
      return state
  }
}

export default photoReducer;
