import { ResponseAuth, ResponseUser } from './types';
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
