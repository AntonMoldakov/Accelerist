import { createAsyncThunk } from '@reduxjs/toolkit';
import { companiesAPI } from 'services';
import { actions } from './reducer';

export const getFavoriteCompanies = createAsyncThunk('companies/getFavoriteCompanies', async (page: string, { rejectWithValue }) => {
  try {
    const response = await companiesAPI.getFavoriteCompanies(page).catch(response => {
      throw new Error(response.response.data.message);
    });

    return { ...response.data, error: '' };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const dislikeCompany = createAsyncThunk('companies/dislikeCompany', async (id: string, { rejectWithValue, dispatch }) => {
  try {
    companiesAPI.dislikeCompany(id).catch(response => {
      throw new Error(response.response.data.message);
    }).then(()=> dispatch(actions.dislikeCompany({ id, error: '' })))

  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const likeCompany = createAsyncThunk('companies/likeCompany', async (id: string, { rejectWithValue, dispatch }) => {
  try {
    companiesAPI.likeCompany(id).catch(response => {
      throw new Error(response.response.data.message);
    }).then(()=> dispatch(actions.likeCompany({ id, error: '' })))

  } catch (error) {
    return rejectWithValue(error.message);
  }
});
