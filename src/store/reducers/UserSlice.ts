import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "models/IUser";

interface UserState {
  users: IUser[];
  archivedUsers: IUser[];
  isLoading: boolean;
  error: string
}

const initialState: UserState = {
  users: [],
  archivedUsers: [],
  isLoading: false,
  error: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true;
    },
    userFetchingSuccess(state, action: PayloadAction<IUser[]>) {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload;
    },
    userFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload
    },
    archiveUser(state, action: PayloadAction<number>) {
      const userId = action.payload;
      const userToArchive = state.users.find((user) => user.id === userId);
      if (userToArchive) {
        state.users = state.users.filter((user) => user.id !== userId);
        state.archivedUsers.push(userToArchive); 
      }
    },
    activateUser(state, action: PayloadAction<number>) {
      const userId = action.payload;
      const userToActivate = state.archivedUsers.find((user) => user.id === userId); // И здесь
      if (userToActivate) {
        state.archivedUsers = state.archivedUsers.filter((user) => user.id !== userId); // И здесь
        state.users.push(userToActivate);
      }
    },
    removeFromActive(state, action: PayloadAction<number>) {
      const userId = action.payload;
      const userToRemove = state.users.find((user) => user.id === userId);
      if (userToRemove) {
        state.users = state.users.filter((user) => user.id !== userId);
      }
    },
  }
});

export const { archiveUser, activateUser, removeFromActive } = userSlice.actions;

export default userSlice.reducer;