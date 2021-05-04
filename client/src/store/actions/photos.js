import axios from "axios";
import { GET_PHOTOS } from './constants';
export const getPhotosData = (page) => (dispatch, getState) => {
    const state = getState();
    state.loading = true;
    axios.get(`/api/photos?page=${state.page}`).then((res) => {
        state.photos = [...state.photos, ...res.data];
        state.loading = false;
    }).then(photos => dispatch({ type: GET_PHOTOS, payload: photos }));
}