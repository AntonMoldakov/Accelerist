import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, signIn, signUp } from './actions';
import { IUser } from 'types';

const initialState: IUser = {
  accessToken: '',
  id: '',
  email: '',
  isAuthorized: false,
  imported: false,
  teamId: '',
  role: '',
  isReceivingNotifications: false,
  loggedInAt: '',
  createdAt: '',
  updatedAt: '',
  error: '',
  firstName: null, 
  lastName: null,
  avatarKey: null,
  deletedAt: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut() {
      return  initialState
    },
  },
  extraReducers: builder => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      return state = action.payload
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      return state = action.payload
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      return {...state , ...action.payload}
    });
    builder.addCase(signIn.rejected, (state, actions) => {
      return { ...state, error: actions.payload as string}
    });
    builder.addCase(signUp.rejected, (state, actions) => {
      return { ...state, error: actions.payload as string}
    });
  },
});

export const actions = userSlice.actions;
export default userSlice.reducer;
