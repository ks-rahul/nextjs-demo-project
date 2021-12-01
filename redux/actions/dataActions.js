import axios from "axios";
import { USER,BLOGS } from "../types";
import { API } from "../../config";

const getUserData = (id) => {
  return (dispatch) => {
    axios
      .get(`${API}/${id}`)
      .then((res) => {
        dispatch({ type: USER, payload: res.data.data });
      })
      .catch((err) => console.log(err));
  };
};

const getBlogList = (id) => {
  return (dispatch) => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        dispatch({ type: BLOGS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export default {
  getUserData,
  getBlogList,
};
