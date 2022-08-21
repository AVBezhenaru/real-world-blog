import { createSlice } from '@reduxjs/toolkit';

import { fetchGetArticles } from '../services/realWorldBlogService';

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articleList: null,
    articleCount: 0,
    loading: false,
    error: false,
    errorMessage: '',
  },
  reducers: {},
  extraReducers: {
    [fetchGetArticles.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchGetArticles.fulfilled]: (state, action) => {
      state.loading = false;
      state.articleList = action.payload.articles;
      state.articleCount = action.payload.articlesCount;
    },
    [fetchGetArticles.rejected]: (state, action) => {
      state.error = true;
      state.errorMessage = action.payload;
    },
  },
});

export default articleSlice.reducer;
