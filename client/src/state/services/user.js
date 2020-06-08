import store from "../store";
import axios from "axios";
import {
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_POST,
  ADD_POST,
} from "../actions/types";

const signUp = async (values) => {
  localStorage.removeItem("token");
  store.dispatch({
    type: LOGIN_USER,
  });
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { status, data } = await axios.post(
    `http://localhost:3001/register`,
    values,
    config
  );
  if (status === 201) {
    return data;
  } else {
    return null;
  }
};

const login = async (values) => {
  store.dispatch({
    type: LOGIN_USER,
  });
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { status, data } = await axios.post(
    `http://localhost:3001/login`,
    values,
    config
  );
  if (status === 200) {
    return data;
  } else {
    return null;
  }
};

const getPosts = async () => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  };
  const { status, data } = await axios.get(
    `http://localhost:3001/post`,
    config
  );
  if (status === 200) {
    return data;
  } else {
    return null;
  }
};

const getSinglePost = async (id) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  };
  const { status, data } = await axios.get(
    `http://localhost:3001/post/${id}`,
    config
  );
  if (status === 200) {
    return data;
  } else {
    return null;
  }
};

const postComment = async (id, values) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  };
  const { status, data } = await axios.post(
    `http://localhost:3001/post/comment/${id}`,
    values,
    config
  );
  if (status === 201) {
    return data;
  } else {
    return null;
  }
};

const postLike = async (id) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  };
  const { status, data } = await axios.post(
    `http://localhost:3001/post/like/${id}`,
    {},
    config
  );
  if (status === 201) {
    return data;
  } else {
    return null;
  }
};

const addPost = async (values) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  };
  const { status, data } = await axios.post(
    `http://localhost:3001/post`,
    values,
    config
  );
  if (status === 201) {
    return data;
  } else {
    return null;
  }
};

const removePost = async (id) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  };
  const { status, data } = await axios.delete(
    `http://localhost:3001/post/${id}`,
    config
  );
  if (status === 200) {
    return data;
  } else {
    return null;
  }
};

export default {
  signUp,
  login,
  getPosts,
  addPost,
  postComment,
  getSinglePost,
  postLike,
  removePost,
};
