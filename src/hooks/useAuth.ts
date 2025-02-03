interface User {
  name: string;
  email: string;
}

export function useAuth() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userDataString = localStorage.getItem('userData');
  const userData: User | null = userDataString ? JSON.parse(userDataString) : null;

  return {
    isAuthenticated,
    user: userData,
  };
}