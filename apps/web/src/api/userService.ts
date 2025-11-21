import apiClient from './apiClient';
import { User } from './authService';

export interface UpdateProfileData {
    name: string;
}

class UserService {
    // Получить профиль текущего пользователя
    async getProfile(): Promise<User> {
        const response = await apiClient.get<User>('/api/v1/users/me');
        // Обновляем данные пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    }

    // Обновить профиль пользователя
    async updateProfile(data: UpdateProfileData): Promise<User> {
        const response = await apiClient.put<User>('/api/v1/users/me', data);
        // Обновляем данные пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    }
}

export default new UserService();
