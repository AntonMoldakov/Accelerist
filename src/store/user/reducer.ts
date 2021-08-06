import { createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from './actions';
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
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut(state) {
      state = initialState
    },
  },
  extraReducers: builder => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      return state = action.payload
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      return state = action.payload
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
