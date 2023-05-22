import {
    GET_POSTS,
    SET_USER
} from './constains';

export const setPosts = (payload) => ({
    type: GET_POSTS,
    payload,
});
export const setUser = (payload) => ({
    type: SET_USER,
    payload,
});
