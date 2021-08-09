export interface IUser {
  accessToken: string;
  id: string;
  email: string;
  isAuthorized: boolean;
  imported: boolean;
  teamId: string;
  role: string;
  isReceivingNotifications: boolean;
  loggedInAt: string;
  createdAt: string;
  updatedAt: string;
  error: string;
  firstName: null | string;
  lastName: null | string;
  avatarKey: string | null;
  deletedAt: string | null;
}
