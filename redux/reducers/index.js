import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./../slices/authSlice";
import credentialsReducer from "./../slices/credentialsSlice";
import statusReducer from "../slices/statusSlice";

export default combineReducers({
  auth: authReducer,
  credentials: credentialsReducer,
  status: statusReducer,
});
