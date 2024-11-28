import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // Import your root reducer

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
