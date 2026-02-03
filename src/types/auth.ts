// user role enum
export type UserRole = 'admin' | 'user';

// user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// token type
export interface AuthToken {
  token: string;
  expiresAt: number;
  user: User;
}