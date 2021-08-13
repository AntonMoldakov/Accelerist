import { RootState } from 'store';

export const selectFavoriteCompanies = (state: RootState) => state.companies.items;
export const selectFavoriteCompaniesMeta = (state: RootState) => state.companies.meta;
