import { ResponeAuth } from './types';
import api from './httpServices';
import { ResetPasswordProps, SignInProps, SignUpProps } from 'store/user/types';

export const userAPI = {
  signIn(data: SignInProps) {
    return api.post<ResponeAuth>('auth/sign_in', data);
  },
  signUp(data: SignUpProps) {
    return api.post<ResponeAuth>('auth/sign_up', data);
  },
  resetPassword(data: ResetPasswordProps) {
    return api.post<ResponeAuth>('auth/change_password/send_mail', data);
  },
};
