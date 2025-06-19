import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "models/IUser";
import { checkFormValidity } from "features/utils/utils";
import { fetchUsers } from "./apiFetchUsers";
import { RootState } from "store/store";



interface UserState {
  users: IUser[];
  archivedUsers: IUser[];
  isLoading: boolean;
  error: string | null;
  formData: IUser | null;
  formError: string;
  currentUser: IUser | null;
}

const initialState: UserState = {
  users: [],
  archivedUsers: [],
  isLoading: false,
  error: null,
  formData: null,
  formError: "",
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    archiveUser(state, action: PayloadAction<number>) {
      const id = action.payload;
      const user = state.users.find(u => u.id === id);
      if (user) {
        state.users = state.users.filter(u => u.id !== id);
        state.archivedUsers.push(user);
        if (state.currentUser?.id === id) state.currentUser = null;
      }
    },
    activateUser(state, action: PayloadAction<number>) {
      const id = action.payload;
      const user = state.archivedUsers.find(u => u.id === id);
      if (user) {
        state.archivedUsers = state.archivedUsers.filter(u => u.id !== id);
        state.users.push(user);
      }
    },
    removeFromActive(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.users = state.users.filter(u => u.id !== id);
      if (state.currentUser?.id === id) state.currentUser = null;
    },
    updateUser(state, action: PayloadAction<IUser>) {
      const updated = action.payload;
      const index = state.users.findIndex(u => u.id === updated.id);
      if (index !== -1) state.users[index] = { ...state.users[index], ...updated };
    },
    setFormData(state, action: PayloadAction<IUser | null>) {
      state.formData = action.payload;
    },
    handleFormChange(state, action: PayloadAction<{ id: string; value: string }>) {
      if (state.formData) {
        const { id, value } = action.payload;
        state.formData = { ...state.formData, [id]: value };
        state.formError = checkFormValidity(state.formData);
      }
    },
    handleNestedFormChange(
      state,
      action: PayloadAction<{ parentKey: keyof IUser; childKey: string; value: string }>
    ) {
      const { parentKey, childKey, value } = action.payload;
      if (state.formData && typeof state.formData[parentKey] === "object") {
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
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
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
