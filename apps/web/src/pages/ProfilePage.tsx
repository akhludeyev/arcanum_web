import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import userService from '../api/userService';
import Header from '../components/Header';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user, setUser, logout } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        try {
            const updatedUser = await userService.updateProfile({ name });
            setUser(updatedUser);
            setSuccess('Профиль успешно обновлен');
            setIsEditing(false);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Ошибка обновления профиля');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
            <Header />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                        <h1 className="text-3xl font-bold text-white mb-6">Профиль пользователя</h1>

                        {error && (
                            <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 bg-green-500/20 border border-green-500/50 text-green-100 px-4 py-3 rounded-lg">
                                {success}
                            </div>
                        )}

                        <div className="space-y-6">
                            {/* Информация о пользователе */}
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-2">
                                    Email
                                </label>
                                <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                                    {user.email}
                                </div>
                            </div>

                            {/* Имя пользователя */}
                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    <label className="block text-sm font-medium text-purple-200 mb-2">
                                        Имя
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                                    />
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setName(user.name);
                                                setError('');
                                            }}
                                            className="flex-1 bg-white/10 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-200"
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-purple-200 mb-2">
                                        Имя
                                    </label>
                                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-lg">
                                        <span className="text-white">{user.name}</span>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="text-purple-300 hover:text-purple-200 font-medium"
                                        >
                                            Изменить
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Premium статус */}
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-2">
                                    Статус подписки
                                </label>
                                <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg">
                                    {user.isPremium ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-yellow-400 text-xl">⭐</span>
                                            <span className="text-white font-semibold">Premium</span>
                                            {user.premiumExpiresAt && (
                                                <span className="text-purple-300 text-sm">
                                                    до {new Date(user.premiumExpiresAt).toLocaleDateString('ru-RU')}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <span className="text-white">Базовый</span>
                                            <button className="text-purple-300 hover:text-purple-200 font-medium">
                                                Обновить до Premium
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Дата регистрации */}
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-2">
                                    Дата регистрации
                                </label>
                                <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                                    {new Date(user.createdAt).toLocaleDateString('ru-RU', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </div>
                            </div>

                            {/* Кнопка выхода */}
                            <div className="pt-6 border-t border-white/10">
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-200 font-semibold py-3 px-6 rounded-lg transition-all duration-200 border border-red-500/50"
                                >
                                    Выйти из аккаунта
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
