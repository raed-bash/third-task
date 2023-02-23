import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userService } from "./users_slice";
import jwt_decode from "jwt-decode";
const loginService = axios.create({
  baseURL: "http://localhost:8080/login",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginSlice = createSlice({
  name: "login",
  initialState: () => {
    const jwt = sessionStorage.getItem("JWT");
    const stateLogged = jwt !== null;

    const decoded = jwt ? jwt_decode(jwt) : null;
    const roles = decoded ? decoded.roles : [];
    if (stateLogged) {
      userService.defaults.headers = {
        ...userService.defaults.headers,
        Authorization: `Bearer ${jwt}`,
      };
    }
    return { jwt: jwt, loggedIn: stateLogged, roles: roles };
  },
  reducers: {
    login: (state, action) => {
      state.jwt = action.payload;
      state.loggedIn = true;
      var decoded = jwt_decode(action.payload);
      state.roles = decoded.roles;
      sessionStorage.setItem("JWT", action.payload);
      userService.defaults.headers = {
        ...userService.defaults.headers,
        Authorization: `Bearer ${action.payload}`,
      };
    },
    logout: (state) => {
      state.jwt = null;
      state.loggedIn = false;
      state.roles = [];
      sessionStorage.removeItem("JWT");
      userService.defaults.headers = {
        ...userService.defaults.headers,
        Authorization: undefined,
      };
    },
  },
});

export const loginAsync = (cre, success, fail) => (dispatch) => {
  loginService
    .post("/", undefined, {
      auth: cre,
    })
    .then((res) => {
      dispatch(login(res.data.jwt));
      success();
    })
    .catch((error) => {
      fail(error);
    });
};
export const logoutAsync = (n, success) => (dispatch) => {
  dispatch(logout());
  success();
};
const { login } = loginSlice.actions;
export const { logout } = loginSlice.actions;
export const loggedInSelect = (state) => state.login.loggedIn;
export const rolesSelect = (state) => state.login.roles;

export default loginSlice.reducer;
