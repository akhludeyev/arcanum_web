import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AppContextType } from '../App';
import { Check } from 'lucide-react';

interface SubscriptionProps {
  context: AppContextType;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '0 ₽',
    period: 'Бесплатно',
    features: [
      '1 расчёт матрицы в сутки',
      'Базовое описание арканов',
      'Ограниченный доступ к функциям',
      'Без сохранения профилей',
      'Без экспорта в PDF'
    ]
  },
  {
    id: 'premium-month',
    name: 'Premium',
    price: '299 ₽',
    period: 'в месяц',
    highlighted: true,
    badge: 'Популярный',
    features: [
      'Неограниченные расчёты',
      'Полные описания всех арканов',
      'Совместимость пары',
      'Роль ребёнка в роду',
      'Сохранение всех профилей',
      'Экспорт в PDF',
      'Детальные рекомендации',
      'Приоритетная поддержка'
    ]
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '9 990 ₽',
    period: 'Разово навсегда',
    badge: 'Выгодно',
    features: [
      'Все функции Premium',
      'Бессрочный доступ',
      'Все будущие обновления',
      'VIP поддержка',
      'Эксклюзивные материалы'
    ]
  }
];

export default function Subscription({ context }: SubscriptionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSubscribe = (planId: string) => {
    if (planId === 'free') {
      context.showToast('Вы уже используете бесплатный план', 'error');
      return;
    }

    setSelectedPlan(planId);
    
    // Simulate payment
    setTimeout(() => {
      context.setIsPremium(true);
      context.showToast('Подписка успешно оформлена!', 'success');
      setTimeout(() => {
        context.navigateTo('dashboard');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header context={context} showBack />
      
      <main className="flex-1 pt-16 md:pt-20 pb-8">
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="mb-4 text-gray-900">Выберите ваш план</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Получите полный доступ ко всем функциям Arcanum. 
              Неограниченные расчёты, детальные описания и персональные рекомендации.
            </p>
          </div>

          {/* Plans Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {plans.map(plan => (
              <div
                key={plan.id}
                className={`bg-white rounded-lg overflow-hidden transition-all ${
                  plan.highlighted
                    ? 'border-2 border-purple-700 shadow-lg scale-105'
                    : 'border border-gray-200 shadow-md'
                }`}
              >
                {plan.badge && (
                  <div className={`py-2 text-center text-white ${
                    plan.highlighted ? 'bg-purple-700' : 'bg-gray-700'
                  }`}>
                    {plan.badge}
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="mb-2 text-gray-900">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl text-gray-900">{plan.price}</span>
                    <span className="text-gray-600"> {plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={selectedPlan === plan.id}
                    className={`w-full py-3 rounded-lg transition-colors ${
                      plan.highlighted
                        ? 'bg-purple-700 text-white hover:bg-purple-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {selectedPlan === plan.id ? 'Обработка...' : 
                     plan.id === 'free' ? 'Текущий план' : 'Выбрать план'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="mb-8 text-center text-gray-900">Часто задаваемые вопросы</h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="mb-2 text-gray-900">Как отменить подписку?</h3>
                <p className="text-gray-700">
                  Вы можете отменить подписку в любой момент в настройках аккаунта. 
                  Доступ к Premium функциям сохранится до конца оплаченного периода.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="mb-2 text-gray-900">Что происходит после окончания подписки?</h3>
                <p className="text-gray-700">
                  После окончания подписки вы вернётесь к бесплатному плану. 
                  Все сохранённые данные останутся доступными при повторной активации Premium.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="mb-2 text-gray-900">В чём разница между месячной подпиской и Lifetime?</h3>
                <p className="text-gray-700">
                  Месячная подписка продлевается автоматически каждый месяц. 
                  Lifetime — это единоразовый платёж, который даёт бессрочный доступ ко всем функциям 
                  и будущим обновлениям.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="mb-2 text-gray-900">Безопасна ли оплата?</h3>
                <p className="text-gray-700">
                  Да, мы используем защищённое соединение и проверенные платёжные системы Stripe/Paddle. 
                  Данные вашей карты надёжно защищены.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
