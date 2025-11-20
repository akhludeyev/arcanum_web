import { useState } from 'react';
import Landing from './pages/Landing';
import MatrixResult from './pages/MatrixResult';
import Compatibility from './pages/Compatibility';
import ChildRole from './pages/ChildRole';
import Dashboard from './pages/Dashboard';
import Subscription from './pages/Subscription';
import Toast from './components/Toast';
import MobileNavigation from './components/MobileNavigation';

type Page = 'landing' | 'matrix-result' | 'compatibility' | 'child-role' | 'dashboard' | 'subscription';

export interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

export interface AppContextType {
  navigateTo: (page: Page, data?: any) => void;
  currentPage: Page;
  pageData: any;
  showToast: (message: string, type: 'success' | 'error') => void;
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [pageData, setPageData] = useState<any>(null);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });
  const [isPremium, setIsPremium] = useState(false);

  const navigateTo = (page: Page, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
    window.scrollTo(0, 0);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const context: AppContextType = {
    navigateTo,
    currentPage,
    pageData,
    showToast,
    isPremium,
    setIsPremium
  };

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      {currentPage === 'landing' && <Landing context={context} />}
      {currentPage === 'matrix-result' && <MatrixResult context={context} />}
      {currentPage === 'compatibility' && <Compatibility context={context} />}
      {currentPage === 'child-role' && <ChildRole context={context} />}
      {currentPage === 'dashboard' && <Dashboard context={context} />}
      {currentPage === 'subscription' && <Subscription context={context} />}
      
      <MobileNavigation context={context} currentPage={currentPage} />
      
      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
}