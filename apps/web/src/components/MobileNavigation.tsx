import { Home, User, Users, Baby, FolderOpen } from 'lucide-react';
import { AppContextType } from '../App';

interface MobileNavigationProps {
  context: AppContextType;
  currentPage: string;
}

export default function MobileNavigation({ context, currentPage }: MobileNavigationProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 h-16">
        <button
          onClick={() => context.navigateTo('landing')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentPage === 'landing'
              ? 'text-purple-700'
              : 'text-gray-600'
          }`}
        >
          <Home size={20} />
          <span className="text-xs">Главная</span>
        </button>

        <button
          onClick={() => context.navigateTo('matrix-result')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentPage === 'matrix-result'
              ? 'text-purple-700'
              : 'text-gray-600'
          }`}
        >
          <User size={20} />
          <span className="text-xs">Матрица</span>
        </button>

        <button
          onClick={() => context.navigateTo('compatibility')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentPage === 'compatibility'
              ? 'text-purple-700'
              : 'text-gray-600'
          }`}
        >
          <Users size={20} />
          <span className="text-xs">Пара</span>
        </button>

        <button
          onClick={() => context.navigateTo('child-role')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentPage === 'child-role'
              ? 'text-purple-700'
              : 'text-gray-600'
          }`}
        >
          <Baby size={20} />
          <span className="text-xs">Ребёнок</span>
        </button>

        <button
          onClick={() => context.navigateTo(context.isPremium ? 'dashboard' : 'subscription')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentPage === 'dashboard' || currentPage === 'subscription'
              ? 'text-purple-700'
              : 'text-gray-600'
          }`}
        >
          <FolderOpen size={20} />
          <span className="text-xs">{context.isPremium ? 'Профили' : 'Premium'}</span>
        </button>
      </div>
    </nav>
  );
}
