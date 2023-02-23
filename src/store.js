import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users_slice";
import loginReducer from "./login_slice";

export default configureStore({
  reducer: {
    users: usersReducer,
    login: loginReducer,
  },
});
