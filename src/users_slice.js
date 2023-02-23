import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userService = axios.create({
  baseURL: "http://localhost:8080/users",
  headers: { "Content-Type": "application/json" },
});

export const userSlice = createSlice({
  name: "users",
  initialState: {
    values: [],
    loaded: false,
    userForEdit: "",
  },
  reducers: {
    loadUsers: (state, action) => {
      state.values = action.payload;
      state.loaded = true;
    },
    removeUser: (state, action) => {
      state.values = state.values.filter((u) => u.id !== action.payload) || [];
    },
    addUser: (state, action) => {
      state.values.push(action.payload);
    },
    editUser: (state, action) => {
      const userIndex = state.values.findIndex(
        (u) => u.id === action.payload.id
      );
      state.values[userIndex] = action.payload;
    },
    setUser: (state, action) => {
      state.userForEdit = action.payload;
    },
  },
});

export const loadUsersAsync = (BackUserPage, success) => (dispatch) => {
  userService.get().then(({ data }) => {
    if (BackUserPage) {
      success();
    }
    dispatch(loadUsers(data));
  });
};

export const deleteUserAsync = (userId, success, fail) => (dispatch) => {
  userService
    .delete(`/${userId}`)
    .then((res) => {
      if (res.status === 200) {
        success();
        dispatch(removeUser(userId));
      }
    })
    .catch((error) => {
      fail(error);
    });
};

export const createUserAsync = (user, success, fail) => (dispatch) => {
  userService
    .post("/", user)
    .then((data) => {
      success();
      dispatch(addUser(data.user));
    })
    .catch((error) => {
      fail(error);
    });
};

export const editUserAsync = (user, success, fail) => (dispatch) => {
  userService
    .put("/", user)
    .then((data) => {
      success();
      dispatch(editUser(data.user));
    })
    .catch((error) => {
      fail(error);
    });
};
export const getUserForEdit = (userId, success) => (dispatch) => {
  userService.get(`/${userId}`).then(({ data }) => {
    success(data);
  });
};

const { loadUsers, removeUser, addUser, editUser } = userSlice.actions;

export const selectUsers = (state) => state.users.values;
export const selectUsersLoaded = (state) => state.users.loaded;
export const selectUserForEdit = (state) => state.users.userForEdit;

export default userSlice.reducer;
