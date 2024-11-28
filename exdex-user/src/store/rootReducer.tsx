import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import packageReducer from "./packageSlice";
import apiReducer from "./apiSlice";
import toastReducer from "./toastSlice";
import overviewReducer from "./overviewSlice";
import loadReducer from "./loadSectionsSlice";
import helpCenterReducer from "./helpCenterSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  package: packageReducer,
  api: apiReducer,
  toast: toastReducer,
  overview: overviewReducer,
  load: loadReducer,
  helpCenter : helpCenterReducer
});

export default rootReducer;
