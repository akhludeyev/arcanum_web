import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/useAuthStore';
import { Plus, User, Users, Baby } from 'lucide-react';
import { getArcanaData } from '../data/arcanas';

type DashboardTab = 'matrices' | 'compatibility' | 'children';

interface SavedProfile {
  id: string;
  name: string;
  date: string;
  mainArcana: number;
  type: 'matrix' | 'compatibility' | 'child';
}

const mockProfiles: SavedProfile[] = [
  {
    id: '1',
    name: 'Моя матрица',
    date: '15.03.1990',
    mainArcana: 8,
    type: 'matrix'
  },
  {
    id: '2',
    name: 'Анна Петрова',
    date: '22.07.1985',
    mainArcana: 16,
    type: 'matrix'
  },
  {
    id: '3',
    name: 'Совместимость с Иваном',
    date: '10.05.1988',
    mainArcana: 20,
    type: 'compatibility'
  },
  {
    id: '4',
    name: 'Роль дочери Марии',
    date: '08.12.2015',
    mainArcana: 7,
    type: 'child'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<DashboardTab>('matrices');

  if (!user?.isPremium) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-16 md:pt-20 pb-8 flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="mb-4 text-gray-900">Premium функция</h2>
              <p className="text-gray-600 mb-6">
                Личный кабинет и сохранение профилей доступны только для Premium пользователей
              </p>
              <button
                onClick={() => navigate('/subscription')}
                className="px-8 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
              >
                Оформить Premium
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const filteredProfiles = mockProfiles.filter(profile => {
    if (activeTab === 'matrices') return profile.type === 'matrix';
    if (activeTab === 'compatibility') return profile.type === 'compatibility';
    if (activeTab === 'children') return profile.type === 'child';
    return false;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16 md:pt-20 pb-8">
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <h1 className="mb-8 text-gray-900">Мои сохранённые профили</h1>

          {/* Desktop Sidebar + Content Layout */}
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('matrices')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${activeTab === 'matrices'
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <User size={20} />
                    Мои матрицы
                  </button>
                  <button
                    onClick={() => setActiveTab('compatibility')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${activeTab === 'compatibility'
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <Users size={20} />
                    Совместимости
                  </button>
                  <button
                    onClick={() => setActiveTab('children')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${activeTab === 'children'
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <Baby size={20} />
                    Дети
                  </button>
                </nav>
              </div>
            </div>

            {/* Mobile Tabs */}
            <div className="lg:hidden mb-6">
              <div className="bg-white rounded-lg shadow-md p-2 flex gap-2">
                <button
                  onClick={() => setActiveTab('matrices')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${activeTab === 'matrices'
                      ? 'bg-purple-700 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <User size={18} />
                  <span className="hidden sm:inline">Матрицы</span>
                </button>
                <button
                  onClick={() => setActiveTab('compatibility')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${activeTab === 'compatibility'
                      ? 'bg-purple-700 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Users size={18} />
                  <span className="hidden sm:inline">Пары</span>
                </button>
                <button
                  onClick={() => setActiveTab('children')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${activeTab === 'children'
                      ? 'bg-purple-700 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Baby size={18} />
                  <span className="hidden sm:inline">Дети</span>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {/* New Calculation Button */}
              <div className="mb-6">
                <button
                  onClick={() => {
                    if (activeTab === 'matrices') navigate('/');
                    if (activeTab === 'compatibility') navigate('/compatibility');
                    if (activeTab === 'children') navigate('/child-role');
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
                >
                  <Plus size={20} />
                  Новый расчёт
                </button>
              </div>

              {/* Profiles Grid */}
              {filteredProfiles.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredProfiles.map(profile => (
                    <button
                      key={profile.id}
                      onClick={() => {
                        alert(`Открыт профиль: ${profile.name}`);
                      }}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-700">{profile.mainArcana}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1 text-gray-900">{profile.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{profile.date}</p>
                          <p className="text-gray-700 text-sm">
                            {getArcanaData(profile.mainArcana).name}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <p className="text-gray-600 mb-4">
                    {activeTab === 'matrices' && 'У вас пока нет сохранённых матриц'}
                    {activeTab === 'compatibility' && 'У вас пока нет сохранённых расчётов совместимости'}
                    {activeTab === 'children' && 'У вас пока нет сохранённых профилей детей'}
                  </p>
                  <button
                    onClick={() => {
                      if (activeTab === 'matrices') navigate('/');
                      if (activeTab === 'compatibility') navigate('/compatibility');
                      if (activeTab === 'children') navigate('/child-role');
                    }}
                    className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
                  >
                    Создать первый расчёт
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
