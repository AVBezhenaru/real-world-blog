import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://blog.kata.academy/api/';

export const fetchGetArticles = createAsyncThunk(
  'articles/fetchGetArticles',
  async function (offset, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}articles?limit=5&offset=${offset}`);

      if (!response.ok) {
        throw new Error('Упс, чет не так))');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      const err = new Error(error);
      if (err.message === 'TypeError: Failed to fetch') {
        err.message = 'Oops, something went wrong, please check your internet connection';
      }
      return rejectWithValue(err.message);
    }
  }
);

export const fetchGetSingleArticle = createAsyncThunk(
  'singleArticle/fetchGetSingleArticle',
  async function (slug = 1, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}articles/${slug}`);

      if (!response.ok) {
        throw new Error('Упс, чет не так))');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      const err = new Error(error);
      if (err.message === 'TypeError: Failed to fetch') {
        err.message = 'Oops, something went wrong, please check your internet connection';
      }
      return rejectWithValue(err.message);
    }
  }
);
