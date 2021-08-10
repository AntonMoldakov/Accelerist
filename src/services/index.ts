import { getFavoriteCompaniesProps, getProspectsListProps, ResponseAuth, ResponseFavoriteCompanies, ResponseProspectsList, ResponseUser } from './types';
import api from './httpServices';
import { ResetPasswordProps, SignInProps, SignUpProps } from 'store/user/types';

export const userAPI = {
  signIn(data: SignInProps) {
    return api.post<ResponseAuth>('auth/sign_in', data);
  },
  signUp(data: SignUpProps) {
    return api.post<ResponseAuth>('auth/sign_up', data);
  },
  resetPassword(data: ResetPasswordProps) {
    return api.post('auth/change_password/send_mail', data);
  },
  getCurrentUser() {
    return api.get<ResponseUser>('user');
  },
};

export const companiesApi = {
  getProspectsList({ limit = 12, page = 1, sort = 'alphabet' }: getProspectsListProps)  {
    return api.get<ResponseProspectsList>(`saved-list?limit=${limit}&page=${page}&sort=${sort}`);
  },
  getFavoriteCompanies({ limit = 12, page = 1}: getFavoriteCompaniesProps)  {
    return api.get<ResponseFavoriteCompanies>(`companies/favorites?limit=${limit}&page=${page}`);
  }
}

