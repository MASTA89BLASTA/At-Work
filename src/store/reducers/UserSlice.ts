import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "models/IUser";

interface UserState {
  users: IUser[];
  archivedUsers: IUser[];
  isLoading: boolean;
  error: string;
  formData: IUser | null;
}

const initialState: UserState = {
  users: [],
  archivedUsers: [],
  isLoading: false,
  error: "",
  formData: null,
};

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
      state.error = action.payload;
    },
    archiveUser(state, action: PayloadAction<number>) {
      const userId = action.payload;
      const userToArchive = state.users.find(user => user.id === userId);
      if (userToArchive) {
        state.users = state.users.filter(user => user.id !== userId);
        state.archivedUsers.push(userToArchive);
      }
    },
    activateUser(state, action: PayloadAction<number>) {
      const userId = action.payload;
      const userToActivate = state.archivedUsers.find(
        user => user.id === userId
      ); // И здесь
      if (userToActivate) {
        state.archivedUsers = state.archivedUsers.filter(
          user => user.id !== userId
        ); // И здесь
        state.users.push(userToActivate);
      }
    },
    removeFromActive(state, action: PayloadAction<number>) {
      const userId = action.payload;
      state.users = state.users.filter(user => user.id !== userId);
    },
    updateUser(state, action: PayloadAction<IUser>) {
      const updatedUser = action.payload;
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedUser };
      }
      console.log("Updated users in reducer: ", state.users);
    },
    setFormData(state, action: PayloadAction<IUser | null>) {
      state.formData = action.payload;
    },
    handleFormChange(
      state,
      action: PayloadAction<{ id: string; value: string }>
    ) {
      const { id, value } = action.payload;
      if (state.formData) {
        state.formData = { ...state.formData, [id]: value };
      }
    },
    handleNestedFormChange(state, action: PayloadAction<{ parentKey: keyof IUser; childKey: string; value: string }>) {
      const { parentKey, childKey, value } = action.payload;
      if (state.formData && state.formData[parentKey] && typeof state.formData[parentKey] === 'object') {
        (state.formData[parentKey] as any)[childKey] = value;
      }
    }
  },
});

export const {
  archiveUser,
  activateUser,
  removeFromActive,
  updateUser,
  setFormData,
  handleFormChange,
  handleNestedFormChange,
} = userSlice.actions;

export default userSlice.reducer;
