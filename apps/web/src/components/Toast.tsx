import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ show, message, type, onClose }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      }`}>
        {type === 'success' ? (
          <CheckCircle className="text-green-600" size={20} />
        ) : (
          <XCircle className="text-red-600" size={20} />
        )}
        <span className={type === 'success' ? 'text-green-900' : 'text-red-900'}>
          {message}
        </span>
        <button
          onClick={onClose}
          className={`ml-2 ${type === 'success' ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'}`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
