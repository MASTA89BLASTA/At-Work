import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice"; 

const rootReducer = combineReducers({
  user: userReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;