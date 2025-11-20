# Техническое Задание на Разработку Web-Приложения "Матрица Судьбы"

**Дата создания:** 18 ноября 2025, 14:45 UTC+6  
**Дата редактирования:** 18 ноября 2025, 14:45 UTC+6  
**Версия документа:** 6.0 (Web Edition with React)

---

## ИЗМЕНЕНИЯ В ВЕРСИИ 6.0

**Критические изменения:**

- **Платформа:** Переход с мобильного приложения на Web-версию с адаптивной мобильной версткой
- **Frontend:** React 18+ с TypeScript вместо React Native
- **Методология:** Исключен прогноз пола ребенка из функционала
- **Психоматрица Пифагора:** Расчеты только по дате рождения (без ФИО)
- **Новый функционал:** Добавлен расчет "Роли ребенка в роду" и совместимости с родителями
- **Совместимость пар:** Расширенный алгоритм с учетом кармических задач
- **Backend:** Сохранен Golang микросервисный подход
- **Дизайн:** Удалена информация о шрифтах и отступах (определяется на этапе UI/UX)

---

## 1. Введение

Настоящее техническое задание описывает разработку web-приложения для нумерологического анализа личности, совместимости и кармических аспектов на основе даты рождения. Приложение основано на методе "Матрица Судьбы" Натальи Ладини, интегрирующем 22 энергии старших арканов Таро с психоматрицей Пифагора.

Web-приложение обеспечивает:
- Кросс-платформенный доступ (десктоп, планшет, мобильный)
- Адаптивную вёрстку для всех устройств
- Быструю загрузку и отзывчивый интерфейс
- Синхронизацию данных между устройствами

**Дисклеймер:** Нумерология является эзотерической практикой. Результаты предназначены для самопознания и саморефлексии, не являются научным прогнозом или гарантией.

---

## 2. Общие Сведения о Проекте

### 2.1. Технологический Стек

#### Frontend (Web Application)

```
Platform: Web (Progressive Web App - PWA)
Framework: React 18.2+
Language: TypeScript 5.x
Build Tool: Vite 5.x / Create React App 5.x
UI Framework: Material-UI (MUI) 5.x / Chakra UI 2.x
State Management: Zustand 4.x / Redux Toolkit 2.x
Routing: React Router 6.x
Forms: React Hook Form 7.x + Zod validation
Charts: Recharts 2.x / D3.js 7.x
HTTP Client: Axios 1.x / React Query 5.x
Date Handling: date-fns 3.x
Internationalization: react-i18next 14.x
```

#### Responsive Design

```
CSS Framework: Tailwind CSS 3.x / Styled Components 6.x
Breakpoints:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
Media Queries: Mobile-first approach
Touch Support: Touch events для мобильных устройств
```

#### Backend (Golang Microservices)

```
Language: Go 1.21+
Framework: Gin 1.9+ / Fiber 2.50+
Database: PostgreSQL 15+ (primary)
Cache: Redis 7+
Message Queue: RabbitMQ 3.12+
```

#### Authentication & Authorization

```
JWT: golang-jwt/jwt v5
OAuth2: golang.org/x/oauth2 (Google, Apple ID for web)
Password Hashing: bcrypt
Session Storage: Redis
```

#### Storage & Files

```
Object Storage: MinIO / AWS S3
PDF Generation: Go library (unidoc/unipdf)
```

#### API & Documentation

```
REST API: OpenAPI 3.0 specification
API Gateway: Kong / Traefik
Documentation: Swagger UI
Real-time: WebSocket (для уведомлений)
```

#### DevOps & Infrastructure

```
Containerization: Docker 24+
Orchestration: Kubernetes 1.28+
CI/CD: GitLab CI/CD
Monitoring: Prometheus + Grafana
Logging: ELK Stack
CDN: Cloudflare / AWS CloudFront
```

#### Development Tools

```
Version Control: GitLab
Project Management: YouTrack
Design: Figma
Code Editor: VS Code
API Testing: Postman
Load Testing: k6
```

#### Third-party Services

```
Payments: Stripe / Paddle
Email: SendGrid / Mailgun
Analytics: Amplitude / Mixpanel
Error Tracking: Sentry
SEO: Google Analytics, Yandex.Metrica
```

### 2.2. Параметры Проекта

- **Языки:** Русский (основной), английский (локализация)
- **Монетизация:** Freemium (базовые функции бесплатно, Premium подписка)
- **Timeline:** 10 спринтов по 1 неделе
- **Бюджет:** 165k USD
- **Поддержка браузеров:**
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+
  - Мобильные браузеры: Chrome Mobile, Safari Mobile

### 2.3. Нефункциональные Требования

#### 2.3.1. Производительность

**Frontend:**
- First Contentful Paint (FCP): < 1.5 секунд
- Time to Interactive (TTI): < 3 секунд
- Lighthouse Performance Score: > 90
- Локальные расчеты: < 1 секунды
- Отклик UI: < 100 мс

**Backend:**
- Время ответа API (p95): < 200 мс
- Время ответа API (p99): < 500 мс
- Throughput: минимум 1000 requests/second
- Database queries: < 50 мс (p95)

#### 2.3.2. Масштабируемость

- Horizontal scaling через Kubernetes
- Database read replicas
- Redis cluster для кэша
- CDN для статических файлов
- Auto-scaling на основе метрик

#### 2.3.3. Надежность

- Uptime: 99.9% (SLA)
- Database backups: ежедневно, retention 30 дней
- Disaster recovery: RTO < 4 часа, RPO < 1 час
- Health checks: каждые 30 секунд

#### 2.3.4. Безопасность

**Authentication:**
- JWT tokens (access: 15 мин, refresh: 7 дней)
- OAuth2 для social login
- bcrypt для паролей (cost: 12)
- Rate limiting: 100 requests/minute per user

**API Security:**
- HTTPS/TLS 1.3 обязательно
- CORS configuration
- SQL injection prevention
- XSS protection
- CSRF tokens

**Data Protection:**
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- GDPR compliance
- Data retention: 2 года после удаления

#### 2.3.5. Доступность (A11y)

- WCAG 2.1 Level AA compliance
- Поддержка скринридеров
- Keyboard navigation
- Цветовая контрастность
- ARIA labels

#### 2.3.6. SEO

- Server-side rendering (SSR) / Static Site Generation (SSG)
- Meta tags optimization
- Structured data (Schema.org)
- Sitemap.xml
- robots.txt
- Open Graph tags
- Twitter Cards

---

## 3. UI/UX и Адаптивный Дизайн

### 3.1. Принципы Дизайна

**Mobile-First Approach:**
Разработка начинается с мобильной версии, затем масштабируется на планшеты и десктоп.

**Progressive Enhancement:**
Базовый функционал работает везде, расширенные возможности добавляются на поддерживаемых устройствах.

**Touch-Friendly:**
Все интерактивные элементы доступны для touch-устройств (минимальный размер 44x44px).

### 3.2. Breakpoints и Layout

```css
/* Mobile */
@media (min-width: 320px) {
  /* Одноколоночный layout */
  /* Вертикальная навигация */
  /* Упрощенные графики */
}

/* Tablet */
@media (min-width: 768px) {
  /* Двухколоночный layout */
  /* Горизонтальная навигация */
  /* Расширенные графики */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Трехколоночный layout */
  /* Sidebar навигация */
  /* Полные интерактивные графики */
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* Максимальная ширина контента: 1280px */
  /* Центрирование */
}
```

### 3.3. Компоненты и Состояния

**Универсальные компоненты:**
- Header с адаптивным меню (бургер на мобильных)
- Footer с контактами и ссылками
- Cards для отображения результатов
- Модальные окна для детальной информации
- Loading states (skeleton screens)
- Error states
- Empty states

**Интерактивность:**
- Hover effects (только на desktop)
- Touch feedback на мобильных
- Smooth scrolling
- Анимации переходов

### 3.4. UI Матрицы

**Десктоп:**
- Полная Звезда Ладини (22 узла) с интерактивностью
- Боковая панель с психоматрицей Пифагора
- Детальные интерпретации в правой колонке

**Планшет:**
- Звезда Ладини в центре
- Табы для переключения между матрицами
- Модальные окна для интерпретаций

**Мобильный:**
- Упрощенная визуализация матрицы
- Вертикальный scroll
- Аккордеоны для интерпретаций
- Swipe-навигация между разделами

---

## 4. Backend Архитектура (Golang)

### 4.1. Микросервисная Архитектура

```
┌─────────────────────────────────────────────────┐
│         API Gateway (Traefik/Kong)              │
│    Rate Limiting | Auth | Load Balancing        │
└─────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌─────────────┐ ┌──────────────┐
│ Auth Service │ │ User Service│ │ Calc Service │
└──────────────┘ └─────────────┘ └──────────────┘
        │               │               │
        └───────────────┼───────────────┘
                        ▼
        ┌───────────────────────────────┐
        │    Premium Service             │
        └───────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌─────────────┐ ┌──────────────┐
│  PostgreSQL  │ │    Redis    │ │    MinIO     │
└──────────────┘ └─────────────┘ └──────────────┘
```

### 4.2. Сервисы

#### 4.2.1. Auth Service

**Endpoints:**
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
POST   /api/v1/auth/password/reset
POST   /api/v1/auth/password/change
POST   /api/v1/auth/oauth/google
POST   /api/v1/auth/oauth/apple
```

#### 4.2.2. User Service

**Endpoints:**
```
GET    /api/v1/users/me
PUT    /api/v1/users/me
DELETE /api/v1/users/me
GET    /api/v1/users/me/settings
PUT    /api/v1/users/me/settings
```

#### 4.2.3. Calculation Service

**Endpoints:**
```
POST   /api/v1/calculate/matrix           # Матрица Судьбы
POST   /api/v1/calculate/pythagoras       # Психоматрица (только дата)
POST   /api/v1/calculate/compatibility    # Совместимость пар
POST   /api/v1/calculate/child-role       # Роль ребенка в роду
POST   /api/v1/calculate/forecasts        # Прогнозы
```

#### 4.2.4. Content Service

**Endpoints:**
```
GET    /api/v1/content/arcana/:id         # Интерпретация аркана
GET    /api/v1/content/interpretations    # Все интерпретации
```

#### 4.2.5. Premium Service

**Endpoints:**
```
GET    /api/v1/premium/status
POST   /api/v1/premium/subscribe
POST   /api/v1/premium/cancel
POST   /api/v1/premium/pdf/generate
GET    /api/v1/premium/pdf/:id
```

---

## 5. Расчетные Модули (Core Logic)

### 5.1. Матрица Судьбы (22 Аркана)

**Описание:**  
Основной расчет личности по методике Натальи Ладини.

**Алгоритм:**

```typescript
interface MatrixFate {
  main: number;        // Личное предназначение
  social: number;      // Социальная реализация
  spiritual: number;   // Духовный путь
  tail: number;        // Кармический хвост
}

function reduceTo22(num: number): number {
  if (num <= 22) return num;
  const sum = num.toString().split('').reduce((a, b) => 
    parseInt(a) + parseInt(b), 0
  );
  return reduceTo22(sum);
}

function calculateMatrixFate(date: string): MatrixFate {
  // date = "22.06.1987"
  const digits = date.replace(/\D/g, '').split('').map(Number);
  const total = digits.reduce((a, b) => a + b, 0);
  
  const main = reduceTo22(total) || 22;
  
  const day = parseInt(date.slice(0, 2));
  const year = parseInt(date.slice(6));
  const social = reduceTo22(day + year);
  
  const spiritual = reduceTo22(main + social);
  const tail = reduceTo22(total - day);
  
  return { main, social, spiritual, tail };
}
```

**Пример:**
```typescript
// Дата: 22.06.1987
// Цифры: [2,2,0,6,1,9,8,7]
// Сумма: 35
// Main: 8 (35 → 3+5 = 8)
// Social: 11 (22+1987 = 2009 → 11)
// Spiritual: 19 (8+11 = 19)
// Tail: 13 (35-22 = 13)
```

**API Request:**
```json
POST /api/v1/calculate/matrix
{
  "birthDate": "22.06.1987"
}
```

**API Response:**
```json
{
  "success": true,
  "data": {
    "main": 8,
    "social": 11,
    "spiritual": 19,
    "tail": 13,
    "arcanaNames": {
      "main": "Справедливость",
      "social": "Сила",
      "spiritual": "Солнце",
      "tail": "Смерть"
    }
  }
}
```

---

### 5.2. Психоматрица Пифагора (Только Дата Рождения)

**Описание:**  
Расчет по дате рождения БЕЗ использования ФИО. Соответствует классической методике Александрова.

**Алгоритм:**

```typescript
interface PythagorasMatrix {
  cells: Record<number, number>; // Количество каждой цифры 1-9
  lines: {
    rows: number[];      // Сумма по строкам
    columns: number[];   // Сумма по столбцам
    diagonals: number[]; // Сумма по диагоналям
  };
}

function calculatePythagoras(date: string): PythagorasMatrix {
  // Только цифры даты, без нулей
  const digits = date.replace(/\D/g, '').split('')
    .map(Number)
    .filter(n => n > 0);
  
  // Подсчет количества каждой цифры
  const cells: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  };
  
  digits.forEach(digit => {
    if (digit >= 1 && digit <= 9) {
      cells[digit]++;
    }
  });
  
  // Расчет линий
  const rows = [
    cells[1] + cells[2] + cells[3],  // Целеустремленность
    cells[4] + cells[5] + cells[6],  // Семья, стабильность
    cells[7] + cells[8] + cells[9]   // Привычки, таланты
  ];
  
  const columns = [
    cells[1] + cells[4] + cells[7],  // Самооценка
    cells[2] + cells[5] + cells[8],  // Материальность
    cells[3] + cells[6] + cells[9]   // Талант
  ];
  
  const diagonals = [
    cells[1] + cells[5] + cells[9],  // Духовность
    cells[3] + cells[5] + cells[7]   // Темперамент
  ];
  
  return { cells, lines: { rows, columns, diagonals } };
}
```

**Пример:**
```typescript
// Дата: 22.06.1987
// Цифры без нулей: [2,2,6,1,9,8,7]
// Cells: {1:1, 2:2, 3:0, 4:0, 5:0, 6:1, 7:1, 8:1, 9:1}
```

**API Request:**
```json
POST /api/v1/calculate/pythagoras
{
  "birthDate": "22.06.1987"
}
```

**API Response:**
```json
{
  "success": true,
  "data": {
    "cells": {
      "1": 1, "2": 2, "3": 0, "4": 0, "5": 0,
      "6": 1, "7": 1, "8": 1, "9": 1
    },
    "lines": {
      "rows": [3, 1, 3],
      "columns": [2, 3, 2],
      "diagonals": [2, 3]
    },
    "interpretations": {
      "character": "Сильная целеустремленность...",
      "health": "Обратить внимание на...",
      "luck": "Средний уровень везения..."
    }
  }
}
```

**Примечание:**  
Расчет с использованием ФИО перенесен в отдельный модуль "Число Имени" и не является частью психоматрицы Пифагора.

---

### 5.3. Совместимость Пар (Расширенный Алгоритм)

**Описание:**  
Анализ совместимости двух людей на основе их матриц судьбы с учетом кармических задач.

**Алгоритм:**

```typescript
interface CompatibilityResult {
  overallScore: number;           // Общая совместимость (0-100)
  karmicTask: number;             // Кармическая задача пары
  destinyArcana: number;          // Аркан предназначения пары
  aspects: {
    spiritual: number;            // Духовная совместимость
    emotional: number;            // Эмоциональная совместимость
    material: number;             // Материальная совместимость
    karmic: number;               // Кармическая связь
  };
  strengths: string[];            // Сильные стороны
  challenges: string[];           // Вызовы
  recommendations: string[];      // Рекомендации
}

function calculateCompatibility(
  person1: MatrixFate,
  person2: MatrixFate
): CompatibilityResult {
  
  // 1. Кармическая задача пары
  const karmicTask = reduceTo22(person1.main + person2.main);
  
  // 2. Аркан предназначения пары
  const destinyArcana = reduceTo22(person1.spiritual + person2.spiritual);
  
  // 3. Духовная совместимость (близость духовных путей)
  const spiritualDiff = Math.abs(person1.spiritual - person2.spiritual);
  const spiritual = spiritualDiff <= 3 ? 90 : 
                    spiritualDiff <= 7 ? 70 : 50;
  
  // 4. Эмоциональная совместимость (основные арканы)
  const emotionalMatch = person1.main === person2.main ? 100 :
                         Math.abs(person1.main - person2.main) <= 5 ? 80 : 60;
  
  // 5. Материальная совместимость (социальные арканы)
  const materialMatch = person1.social === person2.social ? 100 :
                        Math.abs(person1.social - person2.social) <= 4 ? 75 : 55;
  
  // 6. Кармическая связь (хвосты отражают друг друга)
  const karmicConnection = 
    person1.tail === person2.main || person2.tail === person1.main ? 95 :
    person1.tail === person2.spiritual || person2.tail === person1.spiritual ? 85 : 60;
  
  // 7. Бонусы за благоприятные кармические задачи
  const favorableTasks = [7, 11, 17, 19, 20];
  const taskBonus = favorableTasks.includes(karmicTask) ? 15 : 5;
  
  // 8. Общая совместимость
  const baseScore = (spiritual + emotionalMatch + materialMatch + karmicConnection) / 4;
  const overallScore = Math.min(100, baseScore + taskBonus);
  
  // 9. Определение сильных сторон
  const strengths: string[] = [];
  if (spiritual >= 80) strengths.push("Глубокое духовное понимание");
  if (emotionalMatch >= 80) strengths.push("Эмоциональное единство");
  if (karmicConnection >= 85) strengths.push("Сильная кармическая связь");
  if (favorableTasks.includes(karmicTask)) {
    strengths.push(`Благоприятная кармическая задача: ${getArcanaName(karmicTask)}`);
  }
  
  // 10. Определение вызовов
  const challenges: string[] = [];
  if (spiritualDiff > 10) challenges.push("Разные духовные пути требуют взаимного уважения");
  if (Math.abs(person1.main - person2.main) > 10) {
    challenges.push("Разные жизненные приоритеты - источник роста");
  }
  
  // 11. Рекомендации
  const recommendations: string[] = [
    `Работайте вместе над задачей: ${getArcanaName(karmicTask)}`,
    `Ваше общее предназначение связано с энергией: ${getArcanaName(destinyArcana)}`,
  ];
  
  return {
    overallScore: Math.round(overallScore),
    karmicTask,
    destinyArcana,
    aspects: {
      spiritual: Math.round(spiritual),
      emotional: Math.round(emotionalMatch),
      material: Math.round(materialMatch),
      karmic: Math.round(karmicConnection)
    },
    strengths,
    challenges,
    recommendations
  };
}
```

**Благоприятные кармические задачи:**
- **7 (Колесница):** Движение вперед, достижение целей вместе
- **11 (Сила):** Внутренняя сила, стойкость союза
- **17 (Звезда):** Вдохновение, надежда, светлый путь
- **19 (Солнце):** Радость, успех, счастье в паре
- **20 (Суд):** Очищение, трансформация, новый уровень отношений

**API Request:**
```json
POST /api/v1/calculate/compatibility
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

**API Response:**
```json
{
  "success": true,
  "data": {
    "overallScore": 87,
    "karmicTask": 16,
    "destinyArcana": 17,
    "arcanaNames": {
      "karmicTask": "Башня",
      "destinyArcana": "Звезда"
    },
    "aspects": {
      "spiritual": 85,
      "emotional": 100,
      "material": 75,
      "karmic": 70
    },
    "strengths": [
      "Эмоциональное единство",
      "Глубокое духовное понимание"
    ],
    "challenges": [
      "Кармическая задача Башня требует совместного преодоления кризисов"
    ],
    "recommendations": [
      "Работайте вместе над задачей: Башня - трансформация через разрушение старого",
      "Ваше общее предназначение связано с энергией: Звезда - надежда и вдохновение"
    ]
  }
}
```

---

### 5.4. Роль Ребенка в Роду + Совместимость с Родителями

**Описание:**  
Расчет роли ребенка в семейной системе и его кармических задач с каждым из родителей. Основан на методике Натальи Ладини 2024-2025.

**Алгоритм:**

```typescript
interface ChildRoleResult {
  childMatrix: MatrixFate;
  roles: {
    isCleanser: boolean;          // Очиститель рода (20 Суд)
    isHealer: boolean;            // Целитель рода (18+20)
    isKarmicMirror: boolean;      // Зеркало кармы предков
    primaryRole: string;          // Основная роль в семье
  };
  compatibilityWithParents: {
    parent1: ParentChildCompatibility;
    parent2: ParentChildCompatibility;
  };
  siblingArcana?: number;         // Если есть брат/сестра
}

interface ParentChildCompatibility {
  taskArcana: number;             // Кармическая задача с родителем
  arcanaName: string;
  interpretation: string;
  connectionStrength: number;     // Сила связи (0-100)
}

function calculateChildRole(
  childDate: string,
  parent1: { matrix: MatrixFate; name: string },
  parent2: { matrix: MatrixFate; name: string },
  existingChildMatrix?: MatrixFate
): ChildRoleResult {
  
  const child = calculateMatrixFate(childDate);
  
  // 1. Очиститель рода (20 Суд в духовном пути)
  const isCleanser = child.spiritual === 20;
  
  // 2. Целитель рода (18 Луна + 20 Суд)
  const isHealer = child.spiritual === 20 && child.main === 18;
  
  // 3. Зеркало кармы (арканы ребенка = хвосты родителей)
  const isKarmicMirror = 
    child.main === parent1.matrix.tail ||
    child.main === parent2.matrix.tail ||
    child.spiritual === parent1.matrix.tail ||
    child.spiritual === parent2.matrix.tail;
  
  // 4. Основная роль в семье
  let primaryRole = "Новый импульс роду";
  if (isCleanser) primaryRole = "Очиститель рода (20 Суд)";
  if (isHealer) primaryRole = "Целитель рода (18 Луна + 20 Суд)";
  if (isKarmicMirror) primaryRole = "Зеркало кармы предков";
  if (child.main === 22) primaryRole = "Шут - начало нового цикла рода";
  
  // 5. Задача с родителем 1
  const taskWithP1 = reduceTo22(parent1.matrix.main + child.main);
  const compatP1 = analyzeParentChildTask(taskWithP1, parent1.matrix, child);
  
  // 6. Задача с родителем 2
  const taskWithP2 = reduceTo22(parent2.matrix.main + child.main);
  const compatP2 = analyzeParentChildTask(taskWithP2, parent2.matrix, child);
  
  // 7. Задача между детьми (если есть старший)
  let siblingArcana: number | undefined;
  if (existingChildMatrix) {
    siblingArcana = reduceTo22(child.main + existingChildMatrix.main);
  }
  
  return {
    childMatrix: child,
    roles: {
      isCleanser,
      isHealer,
      isKarmicMirror,
      primaryRole
    },
    compatibilityWithParents: {
      parent1: compatP1,
      parent2: compatP2
    },
    siblingArcana
  };
}

function analyzeParentChildTask(
  arcana: number,
  parentMatrix: MatrixFate,
  childMatrix: MatrixFate
): ParentChildCompatibility {
  
  const arcanaName = getArcanaName(arcana);
  
  // Интерпретации по арканам
  const interpretations: Record<number, string> = {
    17: "Светлый путь. Ребёнок — вдохновение и надежда для родителя",
    19: "Солнечный ребёнок. Приносит радость и успех",
    20: "Суд. Очищение кармы родителя. Очень сильная связь",
    11: "Сила. Учит стойкости и внутреннему росту",
    7: "Колесница. Динамика, движение вперёд вместе",
    9: "Отшельник. Учит мудрости и глубине",
    18: "Луна. Зеркало теней. Работа с подсознанием",
    13: "Смерть. Трансформация. Завершение старых программ",
    16: "Башня. Разрушение иллюзий. Сложные, но важные уроки",
    8: "Справедливость. Учит балансу и ответственности"
  };
  
  const interpretation = interpretations[arcana] || 
    `Аркан ${arcanaName}. Индивидуальная кармическая задача`;
  
  // Сила связи (чем ближе к благоприятным арканам, тем сильнее)
  const favorableArcanas = [17, 19, 20, 11, 7];
  const connectionStrength = favorableArcanas.includes(arcana) ? 90 : 70;
  
  return {
    taskArcana: arcana,
    arcanaName,
    interpretation,
    connectionStrength
  };
}
```

**Ключевые роли ребенка:**

1. **Очиститель рода (20 Суд):**
   - Приходит, чтобы очистить родовые программы
   - Высокая духовная миссия
   - Может проявлять экстрасенсорные способности

2. **Целитель рода (18 Луна + 20 Суд):**
   - Лечит не только тело, но и душу семьи
   - Интуитивный, чувствительный
   - Видит скрытые проблемы

3. **Зеркало кармы:**
   - Отражает непроработанные программы родителей
   - Помогает родителям увидеть свои теневые стороны
   - Катализатор роста для всей семьи

4. **Шут (22):**
   - Начало нового цикла в роду
   - Свобода от родовых программ
   - Уникальный путь

**API Request:**
```json
POST /api/v1/calculate/child-role
{
  "childDate": "15.07.2021",
  "parent1": {
    "birthDate": "22.06.1987",
    "name": "Артём"
  },
  "parent2": {
    "birthDate": "10.10.1995",
    "name": "Рубина"
  },
  "existingChild": {
    "birthDate": "01.01.2019"
  }
}
```

**API Response:**
```json
{
  "success": true,
  "data": {
    "childMatrix": {
      "main": 9,
      "social": 11,
      "spiritual": 20,
      "tail": 3
    },
    "roles": {
      "isCleanser": true,
      "isHealer": false,
      "isKarmicMirror": false,
      "primaryRole": "Очиститель рода (20 Суд)"
    },
    "compatibilityWithParents": {
      "parent1": {
        "taskArcana": 17,
        "arcanaName": "Звезда",
        "interpretation": "Светлый путь. Ребёнок — вдохновение и надежда для родителя",
        "connectionStrength": 90
      },
      "parent2": {
        "taskArcana": 17,
        "arcanaName": "Звезда",
        "interpretation": "Светлый путь. Ребёнок — вдохновение и надежда для родителя",
        "connectionStrength": 90
      }
    },
    "siblingArcana": 14,
    "interpretation": {
      "role": "Этот ребёнок пришел с высокой духовной миссией очищения родовых программ...",
      "withParents": "С обоими родителями у ребенка очень гармоничная связь через аркан Звезда...",
      "withSibling": "Задача между детьми - Умеренность (14) - учиться балансу и гармонии..."
    }
  }
}
```

**Важно:**  
- Прогноз пола ребенка ИСКЛЮЧЕН из функционала
- Прогноз даты рождения ИСКЛЮЧЕН из функционала
- Фокус на кармических ролях и задачах, а не на предсказаниях

**Полные описания:**  
Детальные интерпретации всех 22 арканов, кармических задач пар и расширенные роли детей в роду содержатся в **ПРИЛОЖЕНИИ В: Справочник Интерпретаций** (отдельный документ).

---

## 6. База Данных (PostgreSQL)

### 6.1. Схема БД

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  is_premium BOOLEAN DEFAULT FALSE,
  premium_until TIMESTAMP,
  language VARCHAR(10) DEFAULT 'ru',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  matrix_main INTEGER,
  matrix_social INTEGER,
  matrix_spiritual INTEGER,
  matrix_tail INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Compatibility results
CREATE TABLE compatibility_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  profile1_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  profile2_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  overall_score INTEGER,
  karmic_task INTEGER,
  destiny_arcana INTEGER,
  result_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Child roles
CREATE TABLE child_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  child_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent1_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent2_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  is_cleanser BOOLEAN,
  is_healer BOOLEAN,
  is_karmic_mirror BOOLEAN,
  primary_role VARCHAR(100),
  result_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Content interpretations (локализованный контент)
CREATE TABLE arcana_interpretations (
  id SERIAL PRIMARY KEY,
  arcana_number INTEGER NOT NULL,
  language VARCHAR(10) NOT NULL,
  title VARCHAR(100),
  short_description TEXT,
  full_description TEXT,
  love_aspect TEXT,
  money_aspect TEXT,
  health_aspect TEXT,
  child_aspect TEXT,
  UNIQUE(arcana_number, language)
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255),
  status VARCHAR(50),
  plan VARCHAR(50),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_birth_date ON profiles(birth_date);
CREATE INDEX idx_compatibility_user_id ON compatibility_results(user_id);
CREATE INDEX idx_child_roles_user_id ON child_roles(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
```

### 6.2. Пример данных (Arcana Interpretations)

```sql
INSERT INTO arcana_interpretations (
  arcana_number, language, title, short_description, full_description
) VALUES (
  8, 'ru', 
  'Справедливость',
  'Баланс, истина, ответственность',
  'Аркан Справедливость символизирует баланс между духовным и материальным...'
);
```

---

## 7. Безопасность

### 7.1. OWASP Top 10 Protection

**A01: Broken Access Control**
- JWT validation на каждом запросе
- Role-based access control (RBAC)
- Resource ownership verification

**A02: Cryptographic Failures**
- HTTPS/TLS 1.3 mandatory
- bcrypt для паролей (cost: 12)
- Encryption at rest (AES-256)

**A03: Injection**
- Prepared statements для SQL
- Input validation (Zod schemas)
- Sanitization всех user inputs

**A04: Insecure Design**
- Rate limiting
- Circuit breakers
- Fail-safe defaults

**A05: Security Misconfiguration**
- Security headers (CSP, HSTS, X-Frame-Options)
- Disable directory listing
- Remove unnecessary services

**A06: Vulnerable Components**
- Dependabot alerts
- Regular updates
- Security audits

**A07: Authentication Failures**
- Strong password policy
- Account lockout after 5 failed attempts
- MFA support (опционально)

**A08: Data Integrity Failures**
- Input validation
- Digital signatures для важных данных
- Checksum verification

**A09: Logging Failures**
- Comprehensive logging
- PII masking
- Log aggregation (ELK)

**A10: SSRF**
- Whitelist external URLs
- Network segmentation

---

## 8. Frontend Архитектура (React)

### 8.1. Структура Проекта

```
/matrix-sudby-web/
├── public/
│   ├── index.html
│   ├── manifest.json          # PWA manifest
│   └── robots.txt
├── src/
│   ├── components/            # Переиспользуемые компоненты
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   └── Card/
│   │   ├── matrix/
│   │   │   ├── MatrixVisualization/
│   │   │   ├── ArcanaCard/
│   │   │   └── PythagorasGrid/
│   │   └── layouts/
│   │       ├── Header/
│   │       ├── Footer/
│   │       └── Sidebar/
│   ├── pages/                 # Страницы приложения
│   │   ├── Home/
│   │   ├── Calculator/
│   │   ├── Compatibility/
│   │   ├── ChildRole/
│   │   ├── Profile/
│   │   ├── Premium/
│   │   └── Auth/
│   ├── hooks/                 # Custom hooks
│   │   ├── useMatrix.ts
│   │   ├── useCompatibility.ts
│   │   └── useAuth.ts
│   ├── services/              # API services
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── calculation.service.ts
│   │   └── premium.service.ts
│   ├── store/                 # State management
│   │   ├── useUserStore.ts
│   │   ├── useMatrixStore.ts
│   │   └── useUIStore.ts
│   ├── utils/                 # Утилиты
│   │   ├── calculations.ts    # Локальные расчеты
│   │   ├── validators.ts
│   │   └── formatters.ts
│   ├── types/                 # TypeScript types
│   │   ├── matrix.types.ts
│   │   ├── user.types.ts
│   │   └── api.types.ts
│   ├── styles/                # Глобальные стили
│   │   ├── globals.css
│   │   └── theme.ts
│   ├── locales/               # i18n
│   │   ├── ru.json
│   │   └── en.json
│   ├── App.tsx
│   └── main.tsx
├── .env.development
├── .env.production
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

### 8.2. State Management (Zustand)

```typescript
// store/useUserStore.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null })
    }),
    { name: 'user-storage' }
  )
);
```

### 8.3. API Service

```typescript
// services/api.ts
import axios from 'axios';
import { useUserStore } from '@/store/useUserStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useUserStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 8.4. Responsive Components

```typescript
// components/matrix/MatrixVisualization/index.tsx
import { useMediaQuery } from '@/hooks/useMediaQuery';
import DesktopMatrix from './DesktopMatrix';
import TabletMatrix from './TabletMatrix';
import MobileMatrix from './MobileMatrix';

export const MatrixVisualization = ({ data }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px)');
  
  if (isDesktop) return <DesktopMatrix data={data} />;
  if (isTablet) return <TabletMatrix data={data} />;
  return <MobileMatrix data={data} />;
};
```

---

## 9. PWA (Progressive Web App)

### 9.1. Service Worker

```javascript
// public/service-worker.js
const CACHE_NAME = 'matrix-sudby-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

### 9.2. Manifest

```json
{
  "short_name": "Матрица Судьбы",
  "name": "Матрица Судьбы - Нумерологический Калькулятор",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#6B46C1",
  "background_color": "#FFFFFF"
}
```

---

## 10. Roadmap Разработки (10 Спринтов)

### Спринт 1: Инфраструктура и Дизайн (Неделя 1)
- [ ] GitLab repository setup
- [ ] React проект с Vite/CRA
- [ ] Golang backend structure
- [ ] PostgreSQL setup
- [ ] Redis setup
- [ ] Figma UI/UX mockups
- [ ] Дизайн-система (цвета, компоненты)

### Спринт 2: Аутентификация (Неделя 2)
- [ ] Auth Service (Golang)
- [ ] JWT implementation
- [ ] Login/Register страницы (React)
- [ ] OAuth2 (Google, Apple)
- [ ] Password reset flow

### Спринт 3: Расчетные Модули (Неделя 3)
- [ ] Матрица Судьбы (backend + frontend)
- [ ] Психоматрица Пифагора (только дата)
- [ ] Локальные расчеты в React
- [ ] Unit tests (80%+ coverage)

### Спринт 4: Визуализация (Неделя 4)
- [ ] Интерактивная Звезда Ладини
- [ ] Психоматрица 3x3
- [ ] Адаптивная верстка
- [ ] Skeleton loading states
- [ ] Анимации переходов

### Спринт 5: Совместимость (Неделя 5)
- [ ] Расширенный алгоритм совместимости
- [ ] UI совместимости с графиками
- [ ] Сохранение результатов
- [ ] Экспорт в PDF (базовый)

### Спринт 6: Роль Ребенка (Неделя 6)
- [ ] Расчет роли ребенка в роду
- [ ] Совместимость с родителями
- [ ] UI для детских матриц
- [ ] Интерпретации ролей

### Спринт 7: Premium и Подписки (Неделя 7)
- [ ] Stripe integration
- [ ] Premium функции (расширенные отчеты)
- [ ] PDF экспорт (расширенный)
- [ ] Ограничения для Free users

### Спринт 8: Контент и Интерпретации (Неделя 8)
- [ ] База интерпретаций всех 22 арканов
- [ ] Детальные описания
- [ ] Локализация (ru/en)
- [ ] SEO оптимизация контента

### Спринт 9: Тестирование и Оптимизация (Неделя 9)
- [ ] E2E тесты (Playwright/Cypress)
- [ ] Load testing (k6)
- [ ] Lighthouse audit (>90 score)
- [ ] Security audit
- [ ] Performance optimization

### Спринт 10: Production Deployment (Неделя 10)
- [ ] Kubernetes deployment
- [ ] CDN setup (Cloudflare)
- [ ] SSL certificates
- [ ] DNS configuration
- [ ] Monitoring (Prometheus + Grafana)
- [ ] Go-live

---

## 11. Монетизация

### 11.1. Freemium Модель

**Бесплатные функции:**
- Базовая Матрица Судьбы (1 расчет в день)
- Психоматрица Пифагора (1 расчет в день)
- Базовые интерпретации
- Сохранение 1 профиля

**Premium функции (299₽/месяц или 2990₽/год):**
- Неограниченные расчеты
- Совместимость пар (неограниченно)
- Роль ребенка в роду
- Расширенные интерпретации
- PDF экспорт (до 30 страниц)
- Сохранение до 50 профилей
- Прогнозы на год
- Приоритетная поддержка
- Отсутствие рекламы

**Lifetime (9990₽):**
- Все Premium функции навсегда
- Ранний доступ к новым функциям
- Персональные консультации (2 в год)

### 11.2. Маркетинговая Стратегия

**Каналы привлечения:**
- SEO (органический трафик)
- Контент-маркетинг (блог, статьи)
- Social media (Instagram, VK, Telegram)
- YouTube (видео о нумерологии)
- Партнерская программа (30% комиссии)

**Конверсия Free → Premium:**
- 7-дневный пробный период Premium
- Персонализированные предложения
- Email-кампании с обучающим контентом
- Ограниченные акции (скидки 50% первый месяц)

---

## 12. Метрики Успеха

### 12.1. KPI (Key Performance Indicators)

**User Acquisition:**
- Monthly Active Users (MAU): цель 10,000 за 6 месяцев
- New Sign-ups: 500/месяц
- Organic Traffic: 60% от общего трафика

**Engagement:**
- Daily Active Users / MAU: > 20%
- Session Duration: > 5 минут
- Calculations per User: > 3/месяц

**Monetization:**
- Free → Premium Conversion: > 3%
- Monthly Recurring Revenue (MRR): $5,000 за 6 месяцев
- Customer Lifetime Value (LTV): > $30
- Churn Rate: < 5%/месяц

**Technical:**
- Uptime: > 99.9%
- Page Load Time: < 2 секунд
- API Response Time (p95): < 200ms
- Error Rate: < 0.1%

### 12.2. Analytics Implementation

```typescript
// utils/analytics.ts
import amplitude from 'amplitude-js';

const analytics = amplitude.getInstance();
analytics.init(import.meta.env.VITE_AMPLITUDE_KEY);

export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  analytics.logEvent(eventName, properties);
};

// Примеры событий
trackEvent('matrix_calculated', { arcana: 8 });
trackEvent('premium_subscribed', { plan: 'monthly' });
trackEvent('pdf_exported', { pages: 25 });
```

---

## 13. Дисклеймеры и Юридические Аспекты

### 13.1. Обязательные Дисклеймеры

**На главной странице:**
```
Матрица Судьбы - это эзотерическая система самопознания.
Результаты расчетов предназначены для саморефлексии и 
развлечения. Не являются научным прогнозом, медицинской 
консультацией или гарантией будущих событий.
```

**В расчетах:**
```
Интерпретации основаны на методике Натальи Ладини и 
представляют один из возможных взглядов на личность. 
Используйте информацию для самоанализа и личностного роста.
```

**Для совместимости:**
```
Результаты совместимости носят рекомендательный характер 
и не должны быть единственным критерием при принятии 
решений в отношениях.
```

**Для роли ребенка:**
```
Информация о роли ребенка в роду предназначена для лучшего 
понимания ребенка и не заменяет профессиональных 
педагогических или психологических консультаций.
```

### 13.2. Пользовательское Соглашение

- Возрастное ограничение: 18+
- Запрет на коммерческое использование расчетов без лицензии
- Ограничение ответственности за решения, принятые на основе расчетов
- Право на изменение функционала и цен
- Политика возврата: 14 дней для подписок

### 13.3. GDPR Compliance

- Право на доступ к данным
- Право на удаление данных
- Право на экспорт данных
- Согласие на обработку персональных данных
- Cookie policy
- Privacy policy

---

## 14. Поддержка и Документация

### 14.1. Пользовательская Документация

**База знаний:**
- Что такое Матрица Судьбы?
- Как рассчитать свою матрицу?
- Интерпретация арканов
- FAQ по подпискам
- Troubleshooting

**Видео-туториалы:**
- Первые шаги в приложении
- Как читать свою матрицу
- Совместимость: что означают результаты
- Роль ребенка: практическое применение

### 14.2. Техническая Документация

- API Documentation (Swagger)
- Architecture Overview
- Deployment Guide
- Contribution Guidelines
- Security Best Practices

### 14.3. Каналы Поддержки

- Email: support@matrixsudby.com
- Telegram: @matrixsudby_support
- FAQ + чат-бот (автоответы)
- Premium: персональный менеджер

---

## 15. Cost Estimation

### 15.1. Infrastructure (Monthly)

**Development:**
- DigitalOcean Droplets: $48
- PostgreSQL Managed: $60
- Redis: $15
- S3 Storage: $5
- **Total: $128/month**

**Production (10k MAU):**
- Kubernetes Cluster: $120
- PostgreSQL: $120
- Redis: $40
- S3/CDN: $30
- Load Balancer: $20
- **Total: $330/month**

**Scaling (100k MAU):**
- Kubernetes: $400
- PostgreSQL: $480
- Redis: $120
- CDN: $100
- **Total: ~$1,100/month**

### 15.2. Third-party Services

- Stripe: 2.9% + $0.30 per transaction
- SendGrid: $15/month (40k emails)
- Amplitude: Free up to 10M events
- Sentry: $26/month
- **Total: ~$40/month base**

### 15.3. Development

- Frontend Developer (React): $70-100/hour
- Backend Developer (Golang): $80-120/hour
- UI/UX Designer: $60-90/hour
- DevOps Engineer: $90-130/hour
- Timeline: 10 weeks
- **Total Budget: $165,000**

---

## ПРИЛОЖЕНИЕ А: Контакты и Ресурсы

**Репозитории:**
- Frontend: https://gitlab.com/matrixsudby/web-app
- Backend: https://gitlab.com/matrixsudby/backend-go

**Environments:**
- Dev: https://dev.matrixsudby.com
- Staging: https://staging.matrixsudby.com
- Production: https://matrixsudby.com

**Мониторинг:**
- Grafana: https://grafana.matrixsudby.com
- Logs: https://logs.matrixsudby.com

---

## ПРИЛОЖЕНИЕ Б: Глоссарий

**Матрица Судьбы:** Эзотерическая система самопознания по методике Натальи Ладини  
**22 Аркана:** 22 старших аркана Таро, используемых в расчетах  
**Психоматрица:** Квадрат Пифагора для анализа личности  
**PWA:** Progressive Web App - веб-приложение с функциями мобильного  
**SSR:** Server-Side Rendering  
**SEO:** Search Engine Optimization  
**JWT:** JSON Web Token  
**GDPR:** General Data Protection Regulation  
**KPI:** Key Performance Indicator  
**MAU:** Monthly Active Users  
**MRR:** Monthly Recurring Revenue

---

## ПРИЛОЖЕНИЕ В: Справочник Интерпретаций

**Содержание:**
1. Полное описание всех 22 арканов Таро (позитивные/негативные проявления, рекомендации)
2. Все 22 кармические задачи пар с оценкой благоприятности
3. Расширенные роли детей в роду (10 основных ролей)

**Документ:** APPENDIX_C_Full_Interpretations.md (отдельный файл)

**Назначение:**  
Справочник содержит детальные интерпретации для использования в:
- Content Service (API)
- Frontend компонентах
- PDF-отчетах
- Обучающих материалах

---

**Дата создания:** 18 ноября 2025, 14:45 UTC+6  
**Последнее обновление:** 18 ноября 2025, 14:45 UTC+6  
**Версия:** 6.0 (Web Edition with React)  
**Статус:** Готово к разработке

---

© 2025 Матрица Судьбы. Все права защищены.
