import { ResponseAuth, ResponseFavoriteCompanies, ResponseUser } from './types';
import api from './httpServices';
import { ResetPasswordProps, SignInProps, SignUpProps } from 'store/user/types';
import { PAGE_SIZE } from 'const';

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

export const companiesAPI = {
  getFavoriteCompanies(page: string) {
    return api.get<ResponseFavoriteCompanies>(`companies/favorites?limit=${PAGE_SIZE}&page=${page}`);
  },
  likeCompany(id: string) {
    return api.get<boolean>(`companies/${id}/like`);
  },
  dislikeCompany(id: string) {
    return api.get<boolean>(`companies/${id}/dislike`);
  },
}