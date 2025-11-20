import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import { AppContextType } from '../App';
import { getArcanaData, getRandomArcana } from '../data/arcanas';
import { User } from 'lucide-react';

interface ChildRoleProps {
  context: AppContextType;
}

interface RoleDetails {
  role: string;
  arcana: number;
  description: string;
  signs: string[];
  characteristics: string[];
  tasks: string[];
  parenting: string[];
  challenges: string[];
}

const roleData: Record<string, RoleDetails> = {
  cleanser: {
    role: 'Очиститель рода',
    arcana: 20,
    description: 'Ребёнок пришёл освободить род от кармических долгов и негативных программ. Он проходит через испытания, трансформируя родовую карму.',
    signs: [
      'Частые болезни или проблемы со здоровьем в детстве',
      'Привлечение сложных ситуаций',
      'Высокая чувствительность к семейной атмосфере',
      'Желание изменить семейные традиции'
    ],
    characteristics: [
      'Глубокая эмпатия и чувствительность',
      'Способность видеть скрытые проблемы семьи',
      'Стремление к справедливости',
      'Ранняя духовная зрелость',
      'Склонность к самопожертвованию'
    ],
    tasks: [
      'Трансформация негативных родовых программ',
      'Освобождение рода от кармических долгов',
      'Исцеление семейных отношений',
      'Разрыв деструктивных паттернов'
    ],
    parenting: [
      'Обеспечьте безопасное пространство для эмоций',
      'Не перегружайте ответственностью',
      'Учите устанавливать личные границы',
      'Поддерживайте духовное развитие',
      'Помогайте не брать на себя чужие проблемы',
      'Регулярно проводите семейные ритуалы очищения'
    ],
    challenges: [
      'Склонность брать на себя проблемы семьи',
      'Чувство вины без причины',
      'Сложности с самоидентификацией',
      'Энергетическое истощение',
      'Проблемы со здоровьем'
    ]
  },
  innovator: {
    role: 'Новатор рода',
    arcana: 16,
    description: 'Ребёнок пришёл разрушить устаревшие структуры и привнести новые идеи. Он катализатор перемен в семейной системе.',
    signs: [
      'Нестандартное мышление с раннего возраста',
      'Сопротивление традициям и правилам',
      'Привлечение неожиданных ситуаций',
      'Стремление всё менять и обновлять'
    ],
    characteristics: [
      'Креативность и оригинальность',
      'Смелость в выборе нового пути',
      'Независимость суждений',
      'Высокая энергия перемен',
      'Революционный дух'
    ],
    tasks: [
      'Обновление родовых программ',
      'Внесение новых ценностей в семью',
      'Разрушение ограничивающих убеждений',
      'Создание нового направления в роду'
    ],
    parenting: [
      'Предоставляйте свободу выбора',
      'Поддерживайте творческие начинания',
      'Учите направлять энергию конструктивно',
      'Не навязывайте жёсткие рамки',
      'Помогайте доводить начатое до конца',
      'Создавайте базовую стабильность'
    ],
    challenges: [
      'Склонность к бунтарству',
      'Сложности с дисциплиной',
      'Непредсказуемое поведение',
      'Конфликты с традициями',
      'Риск деструктивных действий'
    ]
  }
};

export default function ChildRole({ context }: ChildRoleProps) {
  const [childDate, setChildDate] = useState('');
  const [motherDate, setMotherDate] = useState('');
  const [fatherDate, setFatherDate] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<RoleDetails | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

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
    if (!childDate || !motherDate || !fatherDate) {
      context.showToast('Пожалуйста, введите все три даты', 'error');
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const roles = ['cleanser', 'innovator'];
      const selectedRole = roles[Math.floor(Math.random() * roles.length)];
      setResult(roleData[selectedRole]);
      setIsCalculating(false);
    }, 1500);
  };

  const handleSave = () => {
    if (!context.isPremium) {
      context.showToast('Доступно только в Premium', 'error');
      context.navigateTo('subscription');
      return;
    }
    context.showToast('Расчёт сохранён', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header context={context} showBack />
      
      <main className="flex-1 pt-16 md:pt-20 pb-8">
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <h1 className="mb-8 text-gray-900">Роль ребёнка в роду</h1>

          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700">
                  <User size={20} className="text-purple-700" />
                  Дата рождения ребёнка
                </label>
                <input
                  type="text"
                  placeholder="ДД.ММ.ГГГГ"
                  value={childDate}
                  onChange={(e) => setChildDate(formatDate(e.target.value))}
                  maxLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent text-center"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700">
                  <User size={20} className="text-purple-700" />
                  Дата рождения матери
                </label>
                <input
                  type="text"
                  placeholder="ДД.ММ.ГГГГ"
                  value={motherDate}
                  onChange={(e) => setMotherDate(formatDate(e.target.value))}
                  maxLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent text-center"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700">
                  <User size={20} className="text-purple-700" />
                  Дата рождения отца
                </label>
                <input
                  type="text"
                  placeholder="ДД.ММ.ГГГГ"
                  value={fatherDate}
                  onChange={(e) => setFatherDate(formatDate(e.target.value))}
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
                Определить роль
              </button>
            )}
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Main Result Card */}
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-2xl text-purple-700">{result.arcana}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-2 text-gray-900">Роль ребёнка: {result.role}</h2>
                    <p className="text-gray-600 mb-4">
                      Аркан {result.arcana} — {getArcanaData(result.arcana).name}
                    </p>
                    <p className="text-gray-700">
                      {result.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowDetailModal(true)}
                    className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
                  >
                    Подробное описание роли
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    Сохранить расчёт
                  </button>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="mb-4 text-gray-900">Признаки определения</h3>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {result.signs.map((sign, index) => (
                      <li key={index}>{sign}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="mb-4 text-gray-900">Основные характеристики</h3>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {result.characteristics.slice(0, 4).map((char, index) => (
                      <li key={index}>{char}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Recommendations */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="mb-4 text-gray-900">Ключевые рекомендации по воспитанию</h3>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  {result.parenting.slice(0, 4).map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  Нажмите "Подробное описание роли" для полного списка рекомендаций
                </p>
              </div>
            </div>
          )}

          {/* Info Block */}
          {!result && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="mb-3 text-gray-900">О роли ребёнка в роду</h3>
              <p className="text-gray-700 mb-3">
                Каждый ребёнок приходит в семью с определённой кармической задачей. 
                Понимание роли ребёнка помогает родителям:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>Правильно выстроить процесс воспитания</li>
                <li>Понять особенности поведения ребёнка</li>
                <li>Избежать конфликтов и недопонимания</li>
                <li>Помочь ребёнку реализовать его предназначение</li>
                <li>Трансформировать родовые программы</li>
              </ul>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={`Подробное описание: ${result?.role}`}
      >
        {result && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-gray-900">Признаки определения</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                {result.signs.map((sign, index) => (
                  <li key={index}>{sign}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-gray-900">Характеристики ребёнка</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                {result.characteristics.map((char, index) => (
                  <li key={index}>{char}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-gray-900">Задачи в роду</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                {result.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-gray-900">Особенности воспитания</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                {result.parenting.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-gray-900">Потенциальные сложности</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                {result.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
