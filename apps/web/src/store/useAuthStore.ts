import { create } from 'zustand';
import authService, { User } from '../api/authService';
import userService from '../api/userService';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
    checkAuth: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isAuthenticated(),
    isLoading: false,
    error: null,

    login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.login({ email, password });
            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Ошибка входа';
            set({
                error: errorMessage,
                isLoading: false
            });
            throw error;
        }
    },

    register: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.register({ email, password, name });
            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Ошибка регистрации';
            set({
                error: errorMessage,
                isLoading: false
            });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            await authService.logout();
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            });
        } catch (error) {
            // Даже если запрос не удался, очищаем локальное состояние
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            });
        }
    },

    setUser: (user: User | null) => {
        set({
            user,
            isAuthenticated: !!user
        });
    },

    checkAuth: async () => {
        const isAuth = authService.isAuthenticated();
        if (!isAuth) {
            set({ user: null, isAuthenticated: false });
            return;
        }

        set({ isLoading: true });
        try {
            const user = await userService.getProfile();
            set({
                user,
                isAuthenticated: true,
                isLoading: false
            });
        } catch (error) {
            // Токен невалиден - очищаем состояние
            authService.logout();
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false
            });
        }
    },

    clearError: () => {
        set({ error: null });
    },
}));
