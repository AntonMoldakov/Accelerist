import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from 'services';
import { SignUpProps, SignInProps,ResetPasswordProps } from './types';

export const signIn = createAsyncThunk('user/signIn', async (user: SignInProps, { rejectWithValue }) => {
  try {
    const response = await userAPI.signIn(user).catch(response => {
      throw new Error(response.response.data.message);
    });

    return { ...response.data.user, accessToken: response.data.accessToken, error: '' };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signUp = createAsyncThunk('user/signUp', async (user: SignUpProps, { rejectWithValue }) => {
  try {
    const response = await userAPI.signUp(user).catch(response => {
      throw new Error(response.response.data.message);
    });

    return { ...response.data.user, accessToken: response.data.accessToken, error: '' };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const resetPassword = createAsyncThunk('user/resetPassword', async (user: ResetPasswordProps, { rejectWithValue }) => {
  try {
    await userAPI.resetPassword(user).catch(response => {
      throw new Error(response.response.data.message);
    });

  } catch (error) {
    return rejectWithValue(error.message);
  }
});
