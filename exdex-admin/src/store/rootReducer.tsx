import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import apiReducer from "./apiSlice";
import toastReducer from "./toastSlice";
import loadReducer from "./loadSectionsSlice";
import overviewReducer from "./overviewSlice";
import userReducer from './userSlice';
import helpCenter from "./helpCenter";

const rootReducer = combineReducers({
  auth: authReducer,
  api: apiReducer,
  toast: toastReducer,
  load: loadReducer,
  overview: overviewReducer,
  user:userReducer,
  helpCenter : helpCenter

});

export default rootReducer;
