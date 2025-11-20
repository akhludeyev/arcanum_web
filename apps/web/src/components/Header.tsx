import { AppContextType } from '../App';
import logo from '../assets/33a9f053405e16aa8ac7c924f4530599c47dbef7.png';

interface HeaderProps {
  context: AppContextType;
  showBack?: boolean;
}

export default function Header({ context, showBack }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-[1280px] mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={() => context.navigateTo('landing')}
              className="text-gray-700 hover:text-purple-700 transition-colors hidden md:block"
            >
              ← Назад
            </button>
          )}
          <button
            onClick={() => context.navigateTo('landing')}
            className="flex items-center gap-3"
          >
            <img src={logo} alt="Arcanum" className="h-10 md:h-12" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => context.navigateTo('matrix-result')}
            className="text-gray-700 hover:text-purple-700 transition-colors"
          >
            Моя матрица
          </button>
          <button
            onClick={() => context.navigateTo('compatibility')}
            className="text-gray-700 hover:text-purple-700 transition-colors"
          >
            Совместимость
          </button>
          <button
            onClick={() => context.navigateTo('child-role')}
            className="text-gray-700 hover:text-purple-700 transition-colors"
          >
            Роль ребёнка
          </button>
          {context.isPremium && (
            <button
              onClick={() => context.navigateTo('dashboard')}
              className="text-gray-700 hover:text-purple-700 transition-colors"
            >
              Мои профили
            </button>
          )}
          <button
            onClick={() => context.navigateTo('subscription')}
            className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors"
          >
            {context.isPremium ? 'Premium' : 'Подписка'}
          </button>
        </nav>
      </div>
    </header>
  );
}
