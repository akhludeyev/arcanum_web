export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-600">
            <a href="#" className="hover:text-purple-700 transition-colors">О проекте</a>
            <a href="#" className="hover:text-purple-700 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-purple-700 transition-colors">Поддержка</a>
          </div>
          <div className="text-gray-500">
            © 2025 Arcanum
          </div>
        </div>
      </div>
    </footer>
  );
}
