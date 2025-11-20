import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { AppContextType } from '../App';
import { getRandomArcana } from '../data/arcanas';

interface LandingProps {
  context: AppContextType;
}

export default function Landing({ context }: LandingProps) {
  const [birthDate, setBirthDate] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    if (!birthDate) {
      context.showToast('Пожалуйста, введите дату рождения', 'error');
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation
    setTimeout(() => {
      const matrix = Array(8).fill(0).map(() => getRandomArcana());
      setIsCalculating(false);
      context.navigateTo('matrix-result', { birthDate, matrix });
    }, 1500);
  };

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);
    setBirthDate(formatted);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header context={context} />
      
      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-4 text-gray-900">
                Узнайте свою Матрицу судьбы по дате рождения
              </h1>
              <p className="mb-8 text-gray-600">
                Бесплатный расчёт — 1 раз в сутки
              </p>

              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <div className="mb-4">
                  <label htmlFor="birthDate" className="block text-left mb-2 text-gray-700">
                    Дата рождения
                  </label>
                  <input
                    id="birthDate"
                    type="text"
                    placeholder="ДД.ММ.ГГГГ"
                    value={birthDate}
                    onChange={handleDateChange}
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent text-center"
                  />
                </div>

                {isCalculating ? (
                  <Spinner />
                ) : (
                  <button
                    onClick={handleCalculate}
                    className="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors text-center"
                  >
                    Рассчитать бесплатно
                  </button>
                )}

                <p className="mt-4 text-sm text-gray-500">
                  Премиум-подписка снимает все ограничения
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1280px] mx-auto px-4">
            <h2 className="text-center mb-12 text-gray-900">
              Что вы получите
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="mb-3 text-gray-900">Личная матрица</h3>
                <p className="text-gray-600">
                  Подробный расчёт всех позиций вашей матрицы судьбы с детальными описаниями
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="mb-3 text-gray-900">Совместимость пары</h3>
                <p className="text-gray-600">
                  Анализ кармической совместимости с партнёром и рекомендации для гармоничных отношений
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="mb-3 text-gray-900">Роль ребёнка в роду</h3>
                <p className="text-gray-600">
                  Определение роли ребёнка в семейной системе и рекомендации по воспитанию
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => context.navigateTo('subscription')}
                className="px-8 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
              >
                Узнать о Premium подписке
              </button>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-gray-50 py-12 md:py-20">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-center mb-8 text-gray-900">
                О методе Матрица Судьбы
              </h2>
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-4 text-gray-700">
                <p>
                  Матрица Судьбы — это метод самопознания, основанный на нумерологии и арканах Таро. 
                  Каждая дата рождения содержит уникальный код, раскрывающий ваши таланты, предназначение 
                  и кармические задачи.
                </p>
                <p>
                  Расчёт матрицы помогает понять свои сильные и слабые стороны, улучшить отношения, 
                  найти своё призвание и гармонизировать все сферы жизни.
                </p>
                <p>
                  Наш сервис предоставляет детальную интерпретацию каждого аркана в вашей матрице 
                  с практическими рекомендациями для проработки.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
