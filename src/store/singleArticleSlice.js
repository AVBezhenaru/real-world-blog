import { createSlice } from '@reduxjs/toolkit';

import { fetchGetSingleArticle } from '../services/realWorldBlogService';

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
      state.error = false;
    },
    [fetchGetSingleArticle.fulfilled]: (state, action) => {
      state.article = action.payload.article;
      state.loading = false;
    },
    [fetchGetSingleArticle.rejected]: (state, action) => {
      state.error = true;
      state.errorMessage = action.payload;
    },
  },
});

export default singleArticleSlice.reducer;
