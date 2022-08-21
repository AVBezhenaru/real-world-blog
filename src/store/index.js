import { configureStore } from '@reduxjs/toolkit';

import articleReducer from './articleSlice';
import userReducer from './userSlice';
import singleArticleReducer from './singleArticleSlice';

export default configureStore({
  reducer: {
    articles: articleReducer,
    singleArticle: singleArticleReducer,
    user: userReducer,
  },
});
