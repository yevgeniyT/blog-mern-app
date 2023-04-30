export interface IUser {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
  role?: string;
  avatarImage?: string;
  isActive?: boolean;
  lastLogin?: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}
