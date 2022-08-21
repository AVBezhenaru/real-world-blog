import { createSlice } from '@reduxjs/toolkit';

import {
  fetchGetCurrentUser,
  fetchLoginUser,
  fetchRegisterUser,
  fetchUpdateCurrentUser,
} from '../services/realWorldBlogService';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    email: null,
    img: null,
    loading: false,
    error: false,
    errorMessage: '',
  },
  reducers: {
    logOut(state) {
      state.username = null;
      state.email = null;
      state.img = null;
    },
  },
  extraReducers: {
    [fetchLoginUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchLoginUser.fulfilled]: (state, action) => {
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.img = action.payload.user.image;
      state.loading = false;
    },
    [fetchLoginUser.rejected]: (state, action) => {
      state.error = true;
      state.errorMessage = action.payload;
    },

    [fetchGetCurrentUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchGetCurrentUser.fulfilled]: (state, action) => {
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.img = action.payload.user.image;
      state.loading = false;
    },
    [fetchGetCurrentUser.rejected]: (state, action) => {
      state.error = true;
      state.errorMessage = action.payload;
    },

    [fetchRegisterUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchRegisterUser.fulfilled]: (state, action) => {
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.loading = false;
    },
    [fetchRegisterUser.rejected]: (state, action) => {
      state.error = true;
      state.errorMessage = action.payload;
    },

    [fetchUpdateCurrentUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchUpdateCurrentUser.fulfilled]: (state, action) => {
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.img = action.payload.user.image;
      state.loading = false;
    },
    [fetchUpdateCurrentUser.rejected]: (state, action) => {
      state.error = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
