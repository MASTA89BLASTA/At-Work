import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "models/IUser";
import { checkFormValidity } from "features/utils/utils";

interface UserState {
  users: IUser[];
  archivedUsers: IUser[];
  isLoading: boolean;
  error: string;
  formData: IUser | null;
  formError: string;
  currentUser: IUser | null;
}

const initialState: UserState = {
  users: [],
  archivedUsers: [],
  isLoading: false,
  error: "",
  formData: null,
  formError: "",
  currentUser: null,
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
      if (state.currentUser && state.currentUser.id === userId) {
        state.currentUser = null;
      }
    },
    activateUser(state, action: PayloadAction<number>) {
      const userId = action.payload;
      const userToActivate = state.archivedUsers.find(
        user => user.id === userId
      ); 
      if (userToActivate) {
        state.archivedUsers = state.archivedUsers.filter(
          user => user.id !== userId
        ); 
        state.users.push(userToActivate);
      }
    },
    removeFromActive(state, action: PayloadAction<number>) {
      const userId = action.payload;
      state.users = state.users.filter(user => user.id !== userId);
      if (state.currentUser && state.currentUser.id === userId) {
        state.currentUser = null;
      }
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
        state.formError = checkFormValidity(state.formData);
      }
    },
    handleNestedFormChange(state, action: PayloadAction<{ parentKey: keyof IUser; childKey: string; value: string }>) {
      const { parentKey, childKey, value } = action.payload;
      if (state.formData && state.formData[parentKey] && typeof state.formData[parentKey] === 'object') {
        (state.formData[parentKey] as any)[childKey] = value;
        state.formError = checkFormValidity(state.formData);
      }
    },
    setFormError(state, action: PayloadAction<string>) {
      state.formError = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<IUser | null>) {
      state.currentUser = action.payload;
    },
    clearCurrentUser(state) {
      state.currentUser = null;
    },
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
  setFormError,
  setCurrentUser,
  clearCurrentUser,
} = userSlice.actions;

export default userSlice.reducer;
