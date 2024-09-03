import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";


const rootReducer = combineReducers({
  userReducer,
});

// const saveState = (state: RootState) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("state", serializedState);
//   } catch (e) {
//     console.error("Не возможно сохранить state", e);
//   }
// };
// const loadState = ():RootState | undefined => {
//   try {
//     const serializedState = localStorage.getItem("state");
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (e) {
//     console.error("Невозможно загрузить state", e);
//     return undefined;
//   }
// };

// const preloadedState = loadState();

// export const setupStore = () => {
//   const store = configureStore({
//     reducer: rootReducer,
//     preloadedState,
//   });

//   store.subscribe(() => {
//     saveState(store.getState());
//   });

//   return store;
// };

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]