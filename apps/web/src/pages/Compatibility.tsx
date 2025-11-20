import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { AppContextType } from '../App';
import { getArcanaData, getRandomArcana } from '../data/arcanas';
import { User, Lock, Download } from 'lucide-react';

interface CompatibilityProps {
  context: AppContextType;
}

type Tab = 'positive' | 'negative' | 'recommendations';

export default function Compatibility({ context }: CompatibilityProps) {
  const [person1Date, setPerson1Date] = useState('');
  const [person2Date, setPerson2Date] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<Tab>('positive');

  const formatDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    let formatted = '';
    
    if (numbers.length > 0) {
      formatted = numbers.substring(0, 2);
    }
    if (numbers.length > 2) {
      formatted += '.' + numbers.substring(2, 4);
    }
    if (numbers.length > 4) {
      formatted += '.' + numbers.substring(4, 8);
    }
    
    return formatted;
  };

  const handleCalculate = () => {
    if (!person1Date || !person2Date) {
      context.showToast('Пожалуйста, введите обе даты рождения', 'error');
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const compatibility = Math.floor(Math.random() * 40) + 60; // 60-100%
      const karmicArcana = getRandomArcana();
      const favorability = compatibility >= 80 ? 'Очень благоприятная' :
                          compatibility >= 70 ? 'Благоприятная' :
                          compatibility >= 60 ? 'Умеренная' : 'Сложная';
      
      setResult({
        compatibility,
        karmicArcana,
        favorability,
        stars: compatibility >= 80 ? 5 : compatibility >= 70 ? 4 : 3
      });
      setIsCalculating(false);
    }, 1500);
  };

  const handleDownloadPDF = () => {
    if (!context.isPremium) {
      context.showToast('Доступно только в Premium', 'error');
      context.navigateTo('subscription');
      return;
    }
    context.showToast('PDF скачивается...', 'success');
  };

  const getCompatibilityColor = (value: number) => {
    if (value >= 80) return 'text-green-600 border-green-600';
    if (value >= 60) return 'text-yellow-600 border-yellow-600';
    return 'text-red-600 border-red-600';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header context={context} showBack />
      
      <main className="flex-1 pt-16 md:pt-20 pb-8">
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <h1 className="mb-8 text-gray-900">Совместимость пары</h1>

          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700">
                  <User size={20} className="text-purple-700" />
                  Дата рождения первого партнёра
                </label>
                <input
                  type="text"
                  placeholder="ДД.ММ.ГГГГ"
                  value={person1Date}
                  onChange={(e) => setPerson1Date(formatDate(e.target.value))}
                  maxLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent text-center"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700">
                  <User size={20} className="text-purple-700" />
                  Дата рождения второго партнёра
                </label>
                <input
                  type="text"
                  placeholder="ДД.ММ.ГГГГ"
                  value={person2Date}
                  onChange={(e) => setPerson2Date(formatDate(e.target.value))}
                  maxLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent text-center"
                />
              </div>
            </div>

            {isCalculating ? (
              <Spinner />
            ) : (
              <button
                onClick={handleCalculate}
                className="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors text-center"
              >
                Рассчитать совместимость
              </button>
            )}
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Compatibility Indicator */}
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center ${getCompatibilityColor(result.compatibility)}`}>
                      <div className="text-center">
                        <div className="text-3xl">{result.compatibility}%</div>
                        <div className="text-sm">совместимость</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="mb-3 text-gray-900">
                      Кармическая задача пары: {result.karmicArcana} — {getArcanaData(result.karmicArcana).name}
                    </h2>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                      <span className="text-gray-600">Благоприятность:</span>
                      <div className="flex items-center gap-1">
                        {Array(result.stars).fill(0).map((_, i) => (
                          <span key={i} className="text-2xl">⭐</span>
                        ))}
                      </div>
                      <span className="text-gray-900">{result.favorability}</span>
                    </div>
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-2 px-4 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors mx-auto md:mx-0"
                    >
                      {!context.isPremium && <Lock size={16} />}
                      <Download size={16} />
                      Скачать отчёт пары в PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h3 className="mb-6 text-gray-900">Детальный анализ отношений</h3>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('positive')}
                    className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
                      activeTab === 'positive'
                        ? 'border-purple-700 text-purple-700'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Позитивная реализация
                  </button>
                  <button
                    onClick={() => setActiveTab('negative')}
                    className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
                      activeTab === 'negative'
                        ? 'border-purple-700 text-purple-700'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Негативная реализация
                  </button>
                  <button
                    onClick={() => setActiveTab('recommendations')}
                    className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
                      activeTab === 'recommendations'
                        ? 'border-purple-700 text-purple-700'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Рекомендации паре
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-3 text-gray-700">
                  {activeTab === 'positive' && (
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Высокий уровень взаимопонимания и поддержки</li>
                      <li>Общие жизненные ценности и цели</li>
                      <li>Способность эффективно решать конфликты</li>
                      <li>Взаимное вдохновение на личностный рост</li>
                      <li>Гармоничное распределение ролей в паре</li>
                      <li>Сильная энергетическая связь</li>
                      <li>Потенциал для долгосрочных отношений</li>
                    </ul>
                  )}
                  {activeTab === 'negative' && (
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Возможны периодические разногласия во взглядах</li>
                      <li>Риск накопления невысказанных обид</li>
                      <li>Различия в темпераменте могут вызывать напряжение</li>
                      <li>Необходимость работы над коммуникацией</li>
                      <li>Потенциальная конкуренция в определённых сферах</li>
                      <li>Важность соблюдения личных границ</li>
                    </ul>
                  )}
                  {activeTab === 'recommendations' && (
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Регулярно выделяйте время для откровенных разговоров</li>
                      <li>Уважайте индивидуальность и личное пространство друг друга</li>
                      <li>Находите компромиссы в спорных вопросах</li>
                      <li>Поддерживайте личностный рост партнёра</li>
                      <li>Создавайте совместные цели и планы</li>
                      <li>Практикуйте благодарность и признание заслуг партнёра</li>
                      <li>Работайте над проработкой кармического аркана пары вместе</li>
                      <li>Обращайтесь за помощью к специалистам при необходимости</li>
                    </ul>
                  )}
                </div>
              </div>

              {/* Karmic Arcana Details */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="mb-3 text-gray-900">О кармической задаче пары</h3>
                <p className="text-gray-700 mb-4">
                  Кармический аркан {result.karmicArcana} — {getArcanaData(result.karmicArcana).name} показывает 
                  главную задачу, которую вы пришли решить вместе. Проработка этого аркана укрепит 
                  ваши отношения и выведет их на новый уровень.
                </p>
                <p className="text-gray-600 text-sm">
                  {getArcanaData(result.karmicArcana).keywords}
                </p>
              </div>
            </div>
          )}

          {/* Info Block */}
          {!result && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="mb-3 text-gray-900">О расчёте совместимости</h3>
              <p className="text-gray-700 mb-3">
                Кармическая совместимость показывает, насколько гармонично сочетаются энергии двух людей 
                и какие уроки они пришли пройти вместе.
              </p>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>Процент совместимости отражает лёгкость взаимодействия</li>
                <li>Кармический аркан пары показывает общую задачу</li>
                <li>Благоприятность указывает на потенциал отношений</li>
                <li>Рекомендации помогают гармонизировать взаимодействие</li>
              </ul>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
