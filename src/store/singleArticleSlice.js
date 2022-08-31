import { createSlice } from '@reduxjs/toolkit';

import {
  fetchGetSingleArticle,
  fetchAddArticle,
  fetchDeleteArticle,
  fetchUpdateArticle,
  fetchFavoriteArticle,
  fetchUnFavoriteArticle,
} from '../services/realWorldBlogService';

const singleArticleSlice = createSlice({
  name: 'singleArticle',
  initialState: {
    article: null,
    loading: false,
    error: false,
    errorMessage: '',
  },
  reducers: {},
  extraReducers: {
    [fetchGetSingleArticle.pending]: (state) => {
      state.loading = true;
      state.article = null;
      state.error = false;
    },
    [fetchGetSingleArticle.fulfilled]: (state, action) => {
      state.article = action.payload.article;
      state.loading = false;
    },
    [fetchGetSingleArticle.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      state.errorMessage = action.payload;
    },

    [fetchAddArticle.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchAddArticle.fulfilled]: (state, action) => {
      state.article = action.payload.article;
      state.loading = false;
    },
    [fetchAddArticle.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      state.errorMessage = action.payload;
    },

    [fetchUpdateArticle.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchUpdateArticle.fulfilled]: (state, action) => {
      state.article = action.payload.article;
      state.loading = false;
    },
    [fetchUpdateArticle.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      state.errorMessage = action.payload;
    },

    [fetchDeleteArticle.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchDeleteArticle.fulfilled]: (state) => {
      state.article = null;
      state.loading = false;
    },
    [fetchDeleteArticle.rejected]: (state, action) => {
      state.error = true;
      state.loading = true;
      state.errorMessage = action.payload;
    },

    [fetchFavoriteArticle.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchFavoriteArticle.fulfilled]: (state, action) => {
      state.article = action.payload.article;
      state.loading = false;
    },
    [fetchFavoriteArticle.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      state.errorMessage = action.payload;
    },

    [fetchUnFavoriteArticle.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchUnFavoriteArticle.fulfilled]: (state, action) => {
      state.article = action.payload.article;
      state.loading = false;
    },
    [fetchUnFavoriteArticle.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

export default singleArticleSlice.reducer;
