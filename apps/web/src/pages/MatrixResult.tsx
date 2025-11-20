import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import MatrixDiagram from '../components/MatrixDiagram';
import ArcanaDetail from '../components/ArcanaDetail';
import { AppContextType } from '../App';
import { getArcanaData, getRandomArcana } from '../data/arcanas';
import { Lock, Download } from 'lucide-react';

interface MatrixResultProps {
  context: AppContextType;
}

export default function MatrixResult({ context }: MatrixResultProps) {
  const [selectedArcana, setSelectedArcana] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  
  // Get matrix from context or generate random one
  const matrix = context.pageData?.matrix || Array(8).fill(0).map(() => getRandomArcana());
  const birthDate = context.pageData?.birthDate || '01.01.1990';

  const handleArcanaClick = (arcana: number, position: string) => {
    setSelectedArcana(arcana);
    setSelectedPosition(position);
  };

  const handleSaveProfile = () => {
    if (!context.isPremium) {
      context.showToast('Доступно только в Premium', 'error');
      context.navigateTo('subscription');
      return;
    }
    context.showToast('Профиль сохранён', 'success');
  };

  const handleDownloadPDF = () => {
    if (!context.isPremium) {
      context.showToast('Доступно только в Premium', 'error');
      context.navigateTo('subscription');
      return;
    }
    context.showToast('PDF скачивается...', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header context={context} showBack />
      
      <main className="flex-1 pt-16 md:pt-20 pb-8">
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="mb-4 text-gray-900">Ваша матрица судьбы</h1>
            <p className="text-gray-600 mb-6">Дата рождения: {birthDate}</p>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-2 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors disabled:opacity-50"
              >
                {!context.isPremium && <Lock size={16} />}
                Сохранить профиль
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
              >
                {!context.isPremium && <Lock size={16} />}
                <Download size={16} />
                Скачать PDF
              </button>
            </div>
          </div>

          {/* Matrix Diagram */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
            <h2 className="mb-6 text-gray-900 text-center">Интерактивная матрица</h2>
            <p className="text-center text-gray-600 mb-8">Нажмите на любую позицию для детального описания</p>
            <MatrixDiagram matrix={matrix} onArcanaClick={handleArcanaClick} />
          </div>

          {/* Key Arcanas */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="mb-2 text-gray-900">Основной аркан</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-700">{matrix[6]}</span>
                </div>
                <div>
                  <p className="text-gray-900">{getArcanaData(matrix[6]).name}</p>
                  <button
                    onClick={() => handleArcanaClick(matrix[6], 'Центр')}
                    className="text-sm text-purple-700 hover:text-purple-800"
                  >
                    Подробнее →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="mb-2 text-gray-900">Предназначение</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-700">{matrix[1]}</span>
                </div>
                <div>
                  <p className="text-gray-900">{getArcanaData(matrix[1]).name}</p>
                  <button
                    onClick={() => handleArcanaClick(matrix[1], 'Предназначение')}
                    className="text-sm text-purple-700 hover:text-purple-800"
                  >
                    Подробнее →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="mb-2 text-gray-900">Таланты</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-700">{matrix[7]}</span>
                </div>
                <div>
                  <p className="text-gray-900">{getArcanaData(matrix[7]).name}</p>
                  <button
                    onClick={() => handleArcanaClick(matrix[7], 'Талант')}
                    className="text-sm text-purple-700 hover:text-purple-800"
                  >
                    Подробнее →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Info Block */}
          <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="mb-2 text-gray-900">Как работать с матрицей</h3>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>Изучите каждый аркан в своей матрице, нажимая на круглые элементы</li>
              <li>Обратите внимание на позитивные и негативные проявления каждого аркана</li>
              <li>Следуйте рекомендациям для проработки слабых сторон</li>
              <li>Используйте знания о своих талантах для реализации предназначения</li>
              <li>Регулярно возвращайтесь к матрице для отслеживания прогресса</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />

      {/* Arcana Detail Modal */}
      <Modal
        isOpen={selectedArcana !== null}
        onClose={() => setSelectedArcana(null)}
        title={selectedPosition}
      >
        {selectedArcana !== null && (
          <ArcanaDetail arcana={getArcanaData(selectedArcana)} />
        )}
      </Modal>
    </div>
  );
}
