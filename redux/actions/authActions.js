import Router from "next/router";
import axios from "axios";
import { AUTHENTICATE, DEAUTHENTICATE, USER } from "../types";
import { API } from "../../config";

// register user
const register = ({ first_name, last_name, email, phone, password }, type) => {
  if (type !== "register") {
    throw new Error("Wrong API call!");
  }
  return (dispatch) => {
    axios
      .post(`${API}/${type}`, {
        first_name,
        last_name,
        email,
        phone,
        password,
      })
      .then((response) => {
        Router.push("/signin");
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };
};

// gets token from the api and stores it in the redux store and in cookie
const authenticate = ({ email, password }, type) => {
  if (type !== "login") {
    throw new Error("Wrong API call!");
  }

  return (dispatch) => {
    axios
      .post(`${API}/${type}`, { email, password })
      .then((response) => {
        console.log(response.data);

        getUser(dispatch, response.data);

        localStorage.setItem("token", response.data.id);

        Router.push("/");

        dispatch({
          type: AUTHENTICATE,
          payload: response.data.id,
        });
      })
      .catch((err) => console.log(err));
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, payload: token });
  };
};

// removing the token
const deauthenticate = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    Router.push("/");
    dispatch({ type: DEAUTHENTICATE });
  };
};

const getUser = (dispatch, data) => {
  dispatch({ type: USER, payload: data });
};

export default {
  register,
  authenticate,
  reauthenticate,
  deauthenticate,
  getUser,
};
