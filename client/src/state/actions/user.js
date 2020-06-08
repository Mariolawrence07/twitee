import {
  LOGIN_USER,
  SET_CURRENT_USER,
  FETCH_POST,
  SINGLE_POST,
  ADD_COMMENT,
  ADD_POST,
  ADD_LIKE,
  REMOVE_POST,
} from "./types";
import services from "../services/user";

export const fetchPosts = () => (dispatch) => {
  services.getPosts().then(
    (res) => {
      dispatch({
        type: FETCH_POST,
        payload: res.data,
      });
    },
    (err) => {}
  );
};

export const fetchSinglePost = (id) => (dispatch) => {
  services.getSinglePost(id).then(
    (res) => {
      console.log(res);
      dispatch({
        type: SINGLE_POST,
        payload: res.data,
      });
    },
    (err) => {}
  );
};

export const addComment = (id, value) => (dispatch) => {
  services.postComment(id, value).then(
    (res) => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    },
    (err) => {}
  );
};

export const addLike = (id) => (dispatch) => {
  services.postLike(id).then(
    (res) => {
      dispatch({
        type: ADD_LIKE,
        payload: res.data,
        id: id,
      });
    },
    (err) => {}
  );
};

export const addPost = (value) => (dispatch) => {
  services.addPost(value).then(
    (res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    },
    (err) => {}
  );
};

export const deletePost = (id) => (dispatch) => {
  services.removePost(id).then(
    (res) => {
      console.log(res.data);
      dispatch({
        type: REMOVE_POST,
        payload: res.data,
        id: id,
      });
    },
    (err) => {}
  );
};
