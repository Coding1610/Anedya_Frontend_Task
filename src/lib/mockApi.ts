import { AuthToken, UserRole, User } from '@/types/auth';

export const MOCK_USER_ROLE: UserRole = 'admin';

const mockUsers: Record<UserRole, User> = {
  admin: {
    id: 'admin01',
    name: 'Anedya Admin',
    email: 'anedyaadmin@gmail.com',
    role: 'admin',
    avatar: undefined,
  },
  user: {
    id: 'user01',
    name: 'Yash Prajapati',
    email: 'yashu016@gmail.com',
    role: 'user',
    avatar: undefined,
  },
};

// simulates an API login request
export const mockLogin = async (role?: UserRole): Promise<AuthToken> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const userRole = role || MOCK_USER_ROLE;
  const user = mockUsers[userRole];
  // create token
  const token: AuthToken = {
    token: `mock-token-${userRole}-${Date.now()}`,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    user,
  };
  return token;
};

// simulates an API logout request
export const mockLogout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
};

// simulates token validation
// export const mockValidateToken = async (token: string): Promise<boolean> => {
//   await new Promise((resolve) => setTimeout(resolve, 200));
//   return token.startsWith('mock-token-');
// };