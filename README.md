# NodeJS_tg_bot
Этот проект представляет собой Telegram-бота для подготовки к техническим собеседованиям. Бот помогает пользователям изучать и повторять вопросы по различным технологиям, таким как HTML, CSS, JavaScript, React, Angular, TypeScript и Node.js. Проект был создан с целью изучения современных технологий и практики разработки Telegram-ботов.
![bot1](https://github.com/user-attachments/assets/eccd3c95-5528-4975-b4a9-2a2a676ea76c)
![bot2](https://github.com/user-attachments/assets/6979a1d7-78a5-444b-a07e-3f71a71aa30c)
![bot3](https://github.com/user-attachments/assets/5ff16b71-a14b-415d-ab35-80dd3a9f5beb)

---

## **Цели проекта**
1. **Обучение**: Изучить технологии, такие как Node.js, grammY, SQLite и работу с API Telegram.
2. **Помощь пользователям**: Предоставить удобный инструмент для подготовки к техническим собеседованиям.
3. **Практика**: Реализовать функционал викторин, рейтинговый режим и систему отслеживания прогресса.
4. **Мотивация**: Внедрить таблицу лидеров для повышения вовлеченности пользователей.

---

## **Стек технологий**
- Node.js
- grammY
- SQLite
- date-fns
- dotenv
- Bun

---

## **Инструкция по запуску проекта**

### **1. Установка зависимостей**

Убедитесь, что у вас установлен [Bun](https://bun.sh/). Затем выполните команду для установки зависимостей:
```bash
bun install
```

### **2. Настройка переменных окружения**

Создайте файл .env в корне проекта и добавьте в него следующие переменные:
```env
BOT_API_KEY=ваш_токен_бота
ADMIN_ID=ваш_ID_в_Telegram
```

### **3. Запуск бота**

Запустите бота с помощью команды:
```bash
bun start
```

### **4. Использование бота**

Откройте Telegram и найдите своего бота.

Используйте команду /start, чтобы начать взаимодействие.

Выберите категорию или режим для начала теста.

## **Что необходимо изучить для понимания проекта**
1. **JavaScript/TypeScript**: Основы языка и асинхронное программирование.
2. **Node.js**: Работа с модулями, файловой системой и окружением.
3. **SQLite**: Основы работы с базами данных и SQL-запросами.
4. **Telegram Bot API**: Как взаимодействовать с Telegram API через библиотеку grammY.
5. **Работа с JSON**: Чтение и запись данных в формате JSON.

## **Структура проекта**
```
tech-interview-trainer/
├── components/
│ ├── commandCenter.js # Центр управления командами
│ ├── loadQuestions.js # Загрузка вопросов из JSON
│ ├── startQuiz.js # Запуск викторины
│ ├── handleQuizAnswer.js # Обработка ответов на вопросы
│ └── startRatingQuiz.js # Запуск рейтингового режима
│
├── commands/
│ ├── admin.js # Команда /admin
│ ├── leaderboard.js # Команда /leaderboard
│ ├── menu.js # Команда /menu
│ ├── reset.js # Команда /reset
│ ├── stop.js # Команда /stop
│ └── profile.js # Команда /profile
│
├── database/
│ ├── init.js # Инициализация базы данных
│ ├── userCreate.js # Создание профиля пользователя
│ ├── userUpdate.js # Обновление профиля пользователя
│ ├── getBestUsers.js # Получение лучших пользователей
│ ├── getAllUsers.js # Получение всех пользователей
│ └── loaderboard.db # БД
│
├── questions/ # папка с вопросами
│ ├── html_questions.json # html вопросы
│ ├── css_questions.json # css вопросы
│ ├── js_questions.json # js вопросы
│ ├── react_questions.json # react вопросы
│ ├── angular_questions.json # angular вопросы
│ ├── typescript_questions.json # ts вопросы
│ └── nodejs_questions.json # nodejs вопросы
│
├── materials/ # Папка с медиафайлами (гифки, стикеры)
└── index.js # Основной файл бота
```

## **Команды бота**
- `/start` — Начать использование бота.
- `/profile` — Просмотр вашего профиля.
- `/leaderboard` — Таблица лидеров.
- `/stop` — Завершить текущий тест.
- `/reset` — Сбросить прогресс по текущей категории.
- `/menu` — Вернуться в главное меню.
- `/admin` — Администрирование (только для администратора).
