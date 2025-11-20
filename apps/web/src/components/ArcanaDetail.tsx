import { useState } from 'react';
import { ArcanaData } from '../data/arcanas';

interface ArcanaDetailProps {
  arcana: ArcanaData;
}

type Tab = 'positive' | 'negative' | 'relationships' | 'finance' | 'health' | 'recommendations';

export default function ArcanaDetail({ arcana }: ArcanaDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('positive');

  return (
    <div>
      <div className="mb-6">
        <h2 className="mb-2 text-gray-900">{arcana.number} — {arcana.name}</h2>
        <p className="text-gray-600">{arcana.keywords}</p>
      </div>

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
          Позитивное
        </button>
        <button
          onClick={() => setActiveTab('negative')}
          className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
            activeTab === 'negative'
              ? 'border-purple-700 text-purple-700'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Негативное
        </button>
        <button
          onClick={() => setActiveTab('relationships')}
          className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
            activeTab === 'relationships'
              ? 'border-purple-700 text-purple-700'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Отношения
        </button>
        <button
          onClick={() => setActiveTab('finance')}
          className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
            activeTab === 'finance'
              ? 'border-purple-700 text-purple-700'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Финансы
        </button>
        <button
          onClick={() => setActiveTab('health')}
          className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
            activeTab === 'health'
              ? 'border-purple-700 text-purple-700'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Здоровье
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
            activeTab === 'recommendations'
              ? 'border-purple-700 text-purple-700'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Рекомендации
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {activeTab === 'positive' && (
          <div>
            <h3 className="mb-3 text-gray-900">Позитивное проявление</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {arcana.positive.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'negative' && (
          <div>
            <h3 className="mb-3 text-gray-900">Негативное проявление</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {arcana.negative.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'relationships' && (
          <div>
            <h3 className="mb-3 text-gray-900">В отношениях</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {arcana.relationships.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'finance' && (
          <div>
            <h3 className="mb-3 text-gray-900">Финансы</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {arcana.finance.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'health' && (
          <div>
            <h3 className="mb-3 text-gray-900">Здоровье</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {arcana.health.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'recommendations' && (
          <div>
            <h3 className="mb-3 text-gray-900">Рекомендации для проработки</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {arcana.recommendations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
