# Arcanum API (Golang Backend)

Backend API для приложения "Матрица Судьбы" на Golang + Gin + PostgreSQL + Redis.

## Технологии

- **Go 1.21+**
- **Gin** - веб-фреймворк
- **PostgreSQL 15+** - основная БД
- **Redis 7+** - кэш и rate limiting
- **JWT** - аутентификация

## Структура проекта

```
apps/api/
├── cmd/
│   └── server/          # Точка входа приложения
│       └── main.go
├── internal/
│   ├── config/          # Конфигурация
│   ├── database/        # PostgreSQL и Redis клиенты
│   ├── handlers/        # HTTP обработчики
│   ├── middleware/      # Middleware (auth, CORS, rate limiting)
│   ├── models/          # Модели данных
│   ├── repository/      # Слой работы с БД
│   └── services/        # Бизнес-логика
│       └── calculator/  # Сервисы расчетов
├── migrations/          # SQL миграции
├── go.mod
├── go.sum
└── .env.example
```

## Быстрый старт

### 1. Установка зависимостей

```bash
cd apps/api
go mod download
```

### 2. Настройка окружения

Скопируйте `.env.example` в `.env` и настройте переменные:

```bash
cp .env.example .env
```

### 3. Запуск PostgreSQL и Redis

```bash
# Из корня проекта
docker-compose up -d postgres redis
```

### 4. Применение миграций

```bash
# Подключитесь к PostgreSQL
docker exec -it arcanum_postgres psql -U arcanum_user -d arcanum_db

# Выполните миграцию
\i /docker-entrypoint-initdb.d/001_initial_schema.sql
```

Или через psql напрямую:

```bash
psql postgresql://arcanum_user:arcanum_password@localhost:5432/arcanum_db -f migrations/001_initial_schema.sql
```

### 5. Запуск сервера

```bash
go run cmd/server/main.go
```

Сервер запустится на `http://localhost:3001`

## API Endpoints

### Public Endpoints

#### Health Check
```bash
GET /health
```

#### Расчет Матрицы Судьбы
```bash
POST /api/v1/calculate/matrix
Content-Type: application/json

{
  "birthDate": "22.06.1987"
}
```

#### Расчет Психоматрицы Пифагора
```bash
POST /api/v1/calculate/pythagoras
Content-Type: application/json

{
  "birthDate": "22.06.1987"
}
```

### Premium Endpoints (требуется JWT токен)

#### Расчет совместимости пар
```bash
POST /api/v1/calculate/compatibility
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "person1": {
    "birthDate": "22.06.1987",
    "name": "Артём"
  },
  "person2": {
    "birthDate": "10.10.1995",
    "name": "Рубина"
  }
}
```

## Разработка

### Запуск в dev режиме

```bash
# С автоматической перезагрузкой
go install github.com/cosmtrek/air@latest
air
```

### Тестирование

```bash
# Unit тесты
go test ./internal/services/calculator/... -v

# Все тесты
go test ./... -v

# С покрытием
go test ./... -cover
```

### Сборка

```bash
# Production build
go build -o server cmd/server/main.go

# Запуск
./server
```

## Docker

### Сборка образа

```bash
docker build -t arcanum-api .
```

### Запуск

```bash
docker run -p 3001:3001 --env-file .env arcanum-api
```

## Переменные окружения

| Переменная | Описание | По умолчанию |
|-----------|----------|--------------|
| `APP_ENV` | Окружение (development/production) | development |
| `APP_PORT` | Порт сервера | 3001 |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `REDIS_URL` | Redis connection string | redis://localhost:6379 |
| `JWT_SECRET` | Секретный ключ для JWT (мин. 32 символа) | - |
| `CORS_ALLOWED_ORIGINS` | Разрешенные origins для CORS | http://localhost:5173 |

## TODO

- [ ] Реализовать Auth endpoints (регистрация, вход)
- [ ] Реализовать User endpoints (профиль)
- [ ] Реализовать Subscription endpoints (Stripe)
- [ ] Добавить расчет роли ребенка в роду
- [ ] Написать интеграционные тесты
- [ ] Добавить OpenAPI/Swagger документацию
- [ ] Настроить CI/CD

## Лицензия

MIT
