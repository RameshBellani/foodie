import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Try to load user from localStorage
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  // If there's a stored token and user, assume the user is logged in
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isLoading = !user && !token; // Set loading if there's no user or token

  return {
    user,
    isLoading,
    setUser: (user) => {
      set({ user });
      if (user) {
        localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
      } else {
        localStorage.removeItem('user'); // Remove user from localStorage on logout
      }
    },
    setLoading: (loading) => set({ isLoading: loading }),
  };
});
