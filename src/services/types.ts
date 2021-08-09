export interface ResponseAuth {
  accessToken: string;
  message: string;
  user: ResponseUser;
}

export interface ResponseUser {
  firstName: null | string;
  lastName: null | string;
  avatarKey: string | null;
  deletedAt: string | null;
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
}


