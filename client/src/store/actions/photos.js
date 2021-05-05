import axios from "axios";
import { GET_PHOTOS } from './constants';
import { START_GET_PHOTOS_REQUEST } from './constants';
export const getPhotosData = (page) => async (dispatch, getState) => {
    dispatch({ type: START_GET_PHOTOS_REQUEST, payload: {} });
    const { data } = await axios.get(`/api/photos?page=${page}`)
    dispatch({ type: GET_PHOTOS, payload: data });
}
