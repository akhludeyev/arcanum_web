# 🔮 Arcanum - Матрица Судьбы

**Web-приложение для нумерологического анализа личности** на основе методики Натальи Ладини

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2+-61DAFB)](https://reactjs.org/)

---

## 📋 О проекте

**Arcanum** — это современное web-приложение (PWA) для расчета и анализа:
- 🌟 **Матрица Судьбы** (22 аркана Таро)
- 🔢 **Психоматрица Пифагора** (квадрат 3x3)
- 💑 **Совместимость пар** (расширенный алгоритм)
- 👶 **Роль ребенка в роду** (кармические задачи)

---

## 🛠️ Технологический стек

### Frontend
- **React 18.2+** с TypeScript 5.x
- **Vite 6.x** — быстрая сборка
- **Tailwind CSS 4.x** — стилизация
- **Zustand** — state management
- **React Router 6** — маршрутизация
- **React Hook Form** + **Zod** — формы и валидация

### Backend ✅
- **Golang 1.21+** — основной язык
- **Gin** — веб-фреймворк
- **PostgreSQL 15+** — основная БД
- **Redis 7+** — кэш и rate limiting
- **JWT** — аутентификация

### DevOps
- **Turborepo** — управление monorepo
- **Docker Compose** — локальная разработка
- **GitHub Actions** — CI/CD
- **Vercel** — хостинг frontend

---

## 📁 Структура проекта

```
arcanum/
├── apps/
│   ├── web/              # React приложение (frontend) ✅
│   └── api/              # Golang backend API ✅
│       ├── cmd/server/   # Точка входа
│       ├── internal/     # Внутренние пакеты
│       │   ├── config/   # Конфигурация
│       │   ├── database/ # PostgreSQL & Redis
│       │   ├── handlers/ # HTTP handlers
│       │   ├── middleware/ # Auth, CORS, rate limiting
│       │   ├── models/   # Модели данных
│       │   └── services/ # Бизнес-логика
│       └── migrations/   # SQL миграции
├── packages/
│   └── shared/           # Общие типы и утилиты (планируется)
├── docs/                 # Техническая документация
│   ├── TZ_MatrixSudby_Web_v6.0.md
│   └── APPENDIX_C_Full_Interpretations.md
├── docker-compose.yml    # PostgreSQL + Redis для разработки
├── package.json          # Root package.json (monorepo)
├── turbo.json            # Turborepo конфигурация
└── README.md
```

---

## 🚀 Быстрый старт

### Требования
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Go** >= 1.21 (для backend)
- **Docker** + **Docker Compose** (для БД)

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/akhludeyev/arcanum_web.git
cd arcanum_web

# Установить зависимости
npm install
```

### Запуск Frontend

```bash
# Запустить dev сервер
npm run dev
```

Приложение откроется на `http://localhost:5173`

### Запуск Backend

```bash
# 1. Запустить PostgreSQL и Redis
docker-compose up -d postgres redis

# 2. Применить миграции
psql postgresql://arcanum_user:arcanum_password@localhost:5432/arcanum_db \
  -f apps/api/migrations/001_initial_schema.sql

# 3. Запустить API сервер
cd apps/api
cp .env.example .env
go run cmd/server/main.go
```

API будет доступен на `http://localhost:3001`

---

## 📦 Доступные команды

### Monorepo (Root)
```bash
npm run dev      # Запустить все dev серверы
npm run build    # Собрать все приложения
npm run lint     # Проверить код линтером
npm run test     # Запустить тесты
npm run clean    # Очистить build артефакты
```

### Frontend (apps/web)
```bash
cd apps/web
npm run dev      # Vite dev сервер
npm run build    # Production build
npm run preview  # Предпросмотр build
```

### Backend (apps/api)
```bash
cd apps/api
go run cmd/server/main.go  # Запустить сервер
go test ./...              # Запустить тесты
go build -o server cmd/server/main.go  # Собрать бинарник
```

### Docker
```bash
docker-compose up -d          # Запустить все сервисы
docker-compose up -d postgres # Только PostgreSQL
docker-compose up -d redis    # Только Redis
docker-compose down           # Остановить все
```

---

## 🎯 Roadmap

### ✅ Этап 1: Инфраструктура
- [x] Настройка monorepo (Turborepo)
- [x] Инициализация React проекта
- [x] Настройка Tailwind CSS 4.x
- [x] Настройка ESLint + TypeScript
- [x] Деплой на Vercel

### ✅ Этап 2: Frontend MVP
- [x] Дизайн-система (компоненты UI)
- [x] Калькулятор Матрицы Судьбы
- [x] Психоматрица Пифагора
- [x] Визуализация (диаграммы)
- [x] Адаптивная верстка (mobile-first)
- [x] Страницы: Landing, Dashboard, Compatibility, Child Role, Subscription

### ✅ Этап 3: Backend MVP (Golang)
- [x] REST API (Golang + Gin)
- [x] PostgreSQL 15 + Redis 7
- [x] JWT аутентификация (middleware)
- [x] Сервисы расчетов:
  - [x] Матрица Судьбы
  - [x] Психоматрица Пифагора
  - [x] Совместимость пар
- [x] Docker Compose для разработки
- [x] Rate limiting и CORS

### ✅ Этап 4: Backend Integration
- [x] Auth API (регистрация, вход, выход, обновление токена)
- [x] User API (профиль, настройки)
- [x] Сохранение расчетов в БД
- [x] Интеграция frontend с backend API
- [x] Axios клиент и interceptors

### ⏳ Этап 5: Premium функции
- [ ] Роль ребенка в роду (расчет)
- [ ] Stripe интеграция (подписки)
- [ ] PDF экспорт результатов
- [ ] Email уведомления
- [ ] История расчетов пользователя

---

## 📚 Документация

### Техническая документация
- [Техническое задание v6.0](./docs/TZ_MatrixSudby_Web_v6.0.md)
- [Справочник интерпретаций](./docs/APPENDIX_C_Full_Interpretations.md)
- [Отчет о полноте описаний](./docs/COMPLETENESS_CHECK_REPORT.md)

### Backend API
- [API README](./apps/api/README.md) - Полная документация backend

### API Endpoints

**Public endpoints:**
- `GET /health` - Health check
- `POST /api/v1/calculate/matrix` - Расчет Матрицы Судьбы
- `POST /api/v1/calculate/pythagoras` - Расчет Психоматрицы Пифагора

**Premium endpoints** (требуется JWT):
- `POST /api/v1/calculate/compatibility` - Совместимость пар

**Планируется:**
- `POST /api/v1/auth/register` - Регистрация
- `POST /api/v1/auth/login` - Вход
- `GET /api/v1/users/me` - Профиль пользователя
- `POST /api/v1/subscription/create-checkout` - Создание подписки

---

## 🤝 Вклад в проект

Проект находится в активной разработке. Если вы хотите внести вклад:
1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

---

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE)

---

## 👤 Автор

**akhludeyev**
- GitHub: [@akhludeyev](https://github.com/akhludeyev)

---

## 🙏 Благодарности

- Методика **Натальи Ладини** — основа расчетов Матрицы Судьбы
- **22 аркана Таро** — символическая система
- **Пифагор** — основатель нумерологии

## 🔧 Технологии и инструменты

- [Golang](https://go.dev/) - Backend язык программирования
- [Gin](https://gin-gonic.com/) - HTTP веб-фреймворк
- [PostgreSQL](https://www.postgresql.org/) - Реляционная база данных
- [Redis](https://redis.io/) - In-memory хранилище
- [React](https://react.dev/) - UI библиотека
- [Vite](https://vitejs.dev/) - Frontend build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS фреймворк
- [Docker](https://www.docker.com/) - Контейнеризация

---

**⭐ Если проект вам понравился, поставьте звезду!**
