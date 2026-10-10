import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { deleteUser, getUsers, User } from "../../data/data";
import { RootState } from "../store";

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => getUsers(),
);

export const deleteUsers = createAsyncThunk(
  "users/deleteUser",
  async (userId: number) => {
    await deleteUser(userId);
    return userId;
  },
);

export interface UserState {
  userList: User[];
  isLoading: boolean;
}

const initialState = {
  userList: [],
  isLoading: false,
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsersStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchUsersSuccess: (state, action) => ({
      ...state,
      userList: action.payload,
      isLoading: false,
    }),
    fetchUsersFailure: (state) => ({
      ...state,
      isLoading: false,
    }),
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchUsers.fulfilled, (state, { payload }) => ({
        ...state,
        userList: payload,
        isLoading: false,
      }))
      .addCase(fetchUsers.rejected, (state) => ({
        ...state,
        isLoading: false,
      }))
      .addCase(deleteUsers.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(deleteUsers.fulfilled, (state, { payload }) => ({
        ...state,
        userList: state.userList.filter((user) => user.id !== payload),
        isLoading: false,
      }))
      .addCase(deleteUsers.rejected, (state) => ({
        ...state,
        isLoading: false,
      }));
  },
});

export default userSlice.reducer;

export const selectUsersLoading = (state: RootState) => state.user.isLoading;

export const selectUsers = (state: RootState) => state.user.userList;
