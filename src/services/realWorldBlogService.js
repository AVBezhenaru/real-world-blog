import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://blog.kata.academy/api/';

export const fetchGetArticles = createAsyncThunk(
  'articles/fetchGetArticles',
  async function (offset, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}articles?limit=5&offset=${offset}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

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
      const response = await fetch(`${BASE_URL}articles/${slug}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

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

export const fetchAddArticle = createAsyncThunk(
  'singleArticle/fetchAddArticle',
  async function ([article], { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(article),
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.errors);
      }

      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchUpdateArticle = createAsyncThunk(
  'singleArticle/fetchUpdateArticle',
  async function ([article, slug], { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(article),
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.errors);
      }

      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchDeleteArticle = createAsyncThunk(
  'singleArticle/fetchDeleteArticle',
  async function (slug, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}articles/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.errors);
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchFavoriteArticle = createAsyncThunk(
  'singleArticle/fetchFavoriteArticle',
  async function (slug, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.errors);
      }

      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchUnFavoriteArticle = createAsyncThunk(
  'singleArticle/fetchUnFavoriteArticle',
  async function (slug, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.errors);
      }

      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchRegisterUser = createAsyncThunk('user/fetchRegisterUser', async function (user, { rejectWithValue }) {
  try {
    const response = await fetch(`${BASE_URL}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data.errors);
    }

    const data = await response.json();
    localStorage.setItem('token', data.user.token);
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const fetchLoginUser = createAsyncThunk('user/fetchLoginUser', async function (user, { rejectWithValue }) {
  try {
    const response = await fetch(`${BASE_URL}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data.errors);
    }

    const data = await response.json();
    localStorage.setItem('token', data.user.token);
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const fetchGetCurrentUser = createAsyncThunk(
  'user/fetchGetCurrentUser',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.errors);
      }

      const data = await response.json();
      localStorage.setItem('token', data.user.token);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchUpdateCurrentUser = createAsyncThunk(
  'user/fetchUpdateCurrentUser',
  async function (user, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASE_URL}user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.errors);
      }

      const data = await response.json();
      localStorage.setItem('token', data.user.token);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
