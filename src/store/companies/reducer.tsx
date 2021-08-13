import { createSlice } from '@reduxjs/toolkit';
import { ResponseFavoriteCompanies } from 'services/types';
import { getFavoriteCompanies, dislikeCompany, likeCompany } from './action';
import { dislikeCompanyAction } from './types';

const initialState: ResponseFavoriteCompanies = {
  items: [],
  meta: {
    currentPage: '',
    itemCount: 0,
    itemsPerPage: '',
    totalItems: 0,
    totalPages: 0,
  },
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    dislikeCompany(state, action: dislikeCompanyAction) {
      return {
        ...state,
        error: action.payload.error,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    },
    likeCompany(state, action: dislikeCompanyAction) {
      return {
        ...state,
        error: action.payload.error,
        items: state.items.map(item => (item.id === action.payload.id ? { ...item, like: true } : item)),
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(getFavoriteCompanies.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(getFavoriteCompanies.rejected, (state, actions) => {
      return { ...state, error: actions.payload as string };
    });
    builder.addCase(dislikeCompany.rejected, (state, actions) => {
      return { ...state, error: actions.payload as string };
    });
    builder.addCase(likeCompany.rejected, (state, actions) => {
      return { ...state, error: actions.payload as string };
    });
  },
});

export const actions = companiesSlice.actions;
export default companiesSlice.reducer;
