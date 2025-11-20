import { getArcanaData } from '../data/arcanas';

interface MatrixDiagramProps {
  matrix: number[];
  onArcanaClick: (arcana: number, position: string) => void;
}

const positions = [
  { x: '50%', y: '10%', label: 'Духовное' },
  { x: '85%', y: '30%', label: 'Предназначение' },
  { x: '85%', y: '70%', label: 'Материальное' },
  { x: '50%', y: '90%', label: 'Здоровье' },
  { x: '15%', y: '70%', label: 'Отношения' },
  { x: '15%', y: '30%', label: 'Социум' },
  { x: '50%', y: '50%', label: 'Центр' },
  { x: '35%', y: '20%', label: 'Талант' },
];

export default function MatrixDiagram({ matrix, onArcanaClick }: MatrixDiagramProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative w-full" style={{ paddingBottom: '100%' }}>
        {/* SVG Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <line x1="50" y1="10" x2="85" y2="30" stroke="#9CA3AF" strokeWidth="0.2" />
          <line x1="85" y1="30" x2="85" y2="70" stroke="#9CA3AF" strokeWidth="0.2" />
          <line x1="85" y1="70" x2="50" y2="90" stroke="#9CA3AF" strokeWidth="0.2" />
          <line x1="50" y1="90" x2="15" y2="70" stroke="#9CA3AF" strokeWidth="0.2" />
          <line x1="15" y1="70" x2="15" y2="30" stroke="#9CA3AF" strokeWidth="0.2" />
          <line x1="15" y1="30" x2="50" y2="10" stroke="#9CA3AF" strokeWidth="0.2" />
          
          <line x1="50" y1="10" x2="50" y2="50" stroke="#9CA3AF" strokeWidth="0.2" />
          <line x1="85" y1="30" x2="50" y2="50" stroke="#9CA3AF" strokeWidth="0.2" />
          <line x1="85" y1="70" x2="50" y2="50" stroke="#9CA3AF" strokeWidth="0.2" />
          <line x1="50" y1="90" x2="50" y2="50" stroke="#9CA3AF" strokeWidth="0.2" />
          <line x1="15" y1="70" x2="50" y2="50" stroke="#9CA3AF" strokeWidth="0.2" />
          <line x1="15" y1="30" x2="50" y2="50" stroke="#9CA3AF" strokeWidth="0.2" />
        </svg>

        {/* Arcana Circles */}
        {positions.slice(0, matrix.length).map((pos, index) => {
          const arcana = getArcanaData(matrix[index]);
          return (
            <button
              key={index}
              onClick={() => onArcanaClick(matrix[index], pos.label)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: pos.x, top: pos.y }}
            >
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-purple-700 flex flex-col items-center justify-center shadow-md group-hover:shadow-lg group-hover:border-purple-800 transition-all">
                  <span className="text-purple-700 group-hover:text-purple-800">{arcana.number}</span>
                  <span className="text-gray-600 text-xs mt-1 px-2 text-center leading-tight hidden md:block">{arcana.name}</span>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-gray-500">
                  {pos.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
