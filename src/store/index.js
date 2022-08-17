import { configureStore } from '@reduxjs/toolkit';

import { articleReducer, singleArticleReducer } from './articleSlice';

export default configureStore({
  reducer: {
    articles: articleReducer,
    singleArticle: singleArticleReducer,
  },
});
