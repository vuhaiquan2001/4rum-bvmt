import {
    GET_POSTS,
    SET_USER,
} from './constains';

const initstate = {
    posts: [],
    users: localStorage.getItem('userinfo') === null ? {} : JSON.parse(localStorage.getItem('userinfo')),
    topics: [],
    reply: [],
};

function reducer(state, action) {
    let newstate = [];
    switch (action.type) {
        case GET_POSTS:
            newstate = { ...state, posts: action.payload };
            break;
        case SET_USER:
            newstate = { ...state, users: action.payload };
            break;
        default:
            throw new Error('invalid action');
    }
    return newstate;
}

export { initstate };
export default reducer;
