import apiClient from './apiClient';

export interface User {
    id: string;
    email: string;
    name: string;
    isPremium: boolean;
    premiumExpiresAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
}

export interface LoginData {
    email: string;
    password: string;
}

class AuthService {
    // Регистрация нового пользователя
    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/api/v1/auth/register', data);
        this.saveAuthData(response.data);
        return response.data;
    }

    // Вход пользователя
    async login(data: LoginData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/api/v1/auth/login', data);
        this.saveAuthData(response.data);
        return response.data;
    }

    // Выход пользователя
    async logout(): Promise<void> {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                await apiClient.post('/api/v1/auth/logout', { refreshToken });
            } catch (error) {
                console.error('Logout error:', error);
            }
        }
        this.clearAuthData();
    }

    // Обновление access токена
    async refreshToken(): Promise<string> {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await apiClient.post<{ accessToken: string }>('/api/v1/auth/refresh', {
            refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
    }

    // Сохранение данных аутентификации
    private saveAuthData(data: AuthResponse): void {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
    }

    // Очистка данных аутентификации
    private clearAuthData(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }

    // Получение текущего пользователя из localStorage
    getCurrentUser(): User | null {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }

    // Проверка аутентификации
    isAuthenticated(): boolean {
        return !!localStorage.getItem('accessToken');
    }
}

export default new AuthService();
