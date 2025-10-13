export interface User {
  userId?: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'PLAYER';
}
