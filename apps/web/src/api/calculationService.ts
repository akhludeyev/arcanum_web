import apiClient from './apiClient';

export type CalculationType = 'matrix' | 'pythagoras' | 'compatibility' | 'child_role';

export interface Calculation {
    id: string;
    userId: string;
    type: CalculationType;
    inputData: any;
    resultData: any;
    createdAt: string;
}

export interface SaveCalculationData {
    type: CalculationType;
    inputData: any;
    resultData: any;
}

class CalculationService {
    // Сохранить расчет
    async saveCalculation(data: SaveCalculationData): Promise<Calculation> {
        const response = await apiClient.post<Calculation>('/api/v1/calculations', data);
        return response.data;
    }

    // Получить список расчетов пользователя
    async getCalculations(type?: CalculationType): Promise<Calculation[]> {
        const params = type ? { type } : {};
        const response = await apiClient.get<Calculation[]>('/api/v1/calculations', { params });
        return response.data;
    }

    // Получить конкретный расчет
    async getCalculation(id: string): Promise<Calculation> {
        const response = await apiClient.get<Calculation>(`/api/v1/calculations/${id}`);
        return response.data;
    }

    // Удалить расчет
    async deleteCalculation(id: string): Promise<void> {
        await apiClient.delete(`/api/v1/calculations/${id}`);
    }
}

export default new CalculationService();
