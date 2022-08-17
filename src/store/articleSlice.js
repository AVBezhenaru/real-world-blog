import { createSlice } from '@reduxjs/toolkit';

import { fetchGetArticles, fetchGetSingleArticle } from '../services/realWorldBlogService';

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articleList: [],
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

const articleReducer = articleSlice.reducer;
const singleArticleReducer = singleArticleSlice.reducer;
export { articleReducer, singleArticleReducer };
