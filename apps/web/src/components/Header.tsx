import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import logo from '../assets/33a9f053405e16aa8ac7c924f4530599c47dbef7.png';

interface HeaderProps {
  showBack?: boolean;
}

export default function Header({ showBack }: HeaderProps) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-[1280px] mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-purple-700 transition-colors hidden md:block"
            >
              ← Назад
            </button>
          )}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Arcanum" className="h-10 md:h-12" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-purple-700 transition-colors"
          >
            Моя матрица
          </Link>
          <Link
            to="/compatibility"
            className="text-gray-700 hover:text-purple-700 transition-colors"
          >
            Совместимость
          </Link>
          <Link
            to="/child-role"
            className="text-gray-700 hover:text-purple-700 transition-colors"
          >
            Роль ребёнка
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-purple-700 transition-colors flex items-center gap-2"
              >
                <span>{user?.name}</span>
                {user?.isPremium && <span className="text-yellow-500">⭐</span>}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-purple-700 transition-colors"
              >
                Войти
              </Link>
              <Link
                to="/subscription"
                className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors"
              >
                Подписка
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
