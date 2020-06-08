import {
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_POST,
  ADD_POST,
  SINGLE_POST,
  ADD_COMMENT,
  ADD_LIKE,
  REMOVE_POST,
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  reaction: [],
  isLoggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    case FETCH_POST:
      return {
        ...state,
        posts: action.payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case SINGLE_POST:
      return {
        ...state,
        post: action.payload,
        reaction: action.payload.Reactions,
      };
    case ADD_COMMENT:
      return {
        ...state,
        reaction: [...state.reaction, action.payload],
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((res) => res.id !== action.id),
      };
    case ADD_LIKE:
      return {
        ...state,
        posts: state.posts.map((res) =>
          res.id === action.id
            ? {
                ...res,
                Reactions: [...res.Reactions, action.payload],
              }
            : res
        ),
      };
    default:
      return state;
  }
};
