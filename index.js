import { Bot, session } from "grammy";
import dotenv from "dotenv";
import { InputFile } from "grammy";
import createProfile from "./database/userCreate.js";
import profileCommand from "./commands/profile.js";
import stopCommand from "./commands/stop.js";
import leaderboardCommand from "./commands/leaderboard.js";
import adminCommand from "./commands/admin.js";
import resetCommand from "./commands/reset.js";
import menuCommand from "./commands/menu.js";
import commandCenter from "./components/commandCenter.js";
import { loadQuestions, questionsData } from "./components/loadQuestions.js";
import db from "./database/init.js";

// Загружаем переменные окружения из .env
dotenv.config();

// Инициализируем бота с токеном из .env
const bot = new Bot(process.env.BOT_API_KEY);

// Настройка сессии для хранения данных пользователя
bot.use(session({
    initial: () => ({
        correctAnswers: {
            html: 0,
            css: 0,
            js: 0,
            react: 0,
            angular: 0,
            typescript: 0,
            nodejs: 0,
        },
        hasStartedRatingMode: false,
        questionsData,
    }),
}));

// Загрузка вопросов при запуске бота
loadQuestions();

// Устанавливаем меню команд
bot.api.setMyCommands([
    { command: "start", description: "🚀 Начать использование бота" },
    { command: "profile", description: "👤 Просмотр вашего профиля" },
    { command: "admin", description: "🛠 Администрирование (только для админов)" },
    { command: "stop", description: "🛑 Завершить тест" },
    { command: "leaderboard", description: "🏆 Таблица лидеров" },
    { command: "reset", description: "🔄 Сбросить прогресс по текущей категории" },
    { command: "menu", description: "🏠 Вернуться в главное меню" },
]);

// Обработчик команды /start
bot.command("start", async (ctx) => {
    const username = ctx.from.username || ctx.from.first_name;

    // Создание профиля пользователя
    await createProfile(username);

    // Отправка гифки с текстом
    await ctx.replyWithAnimation(new InputFile("./materials/hello.gif"), {
        caption: `Привет, ${username}! 🚀\n` +
            "Я бот для подготовки к техническим собеседованиям.🤖\n" +
            "🧑🏻‍💻Используй команды ниже, чтобы начать:\n" +
            "/start - Начать использование бота\n" +
            "/profile - Просмотр вашего профиля\n" +
            "/admin - Администрирование (только для админов)\n" +
            "/stop - Завершить тест\n" +
            "/leaderboard - Таблица лидеров\n" +
            "/reset - Сбросить прогресс по текущей категории\n" +
            "/menu - Вернуться в главное меню",
    });

    // Клавиатура с кнопками
    const startKeyboard = {
        keyboard: [
            [{ text: "📄 HTML" }, { text: "🎨 CSS" }],
            [{ text: "🟨 JavaScript" }, { text: "⚛️ React" }],
            [{ text: "🅰️ Angular" }, { text: "🟦 TypeScript" }],
            [{ text: "🟩Node.js" }],
            [{ text: "🏆 Рейтинговый режим" }],
            [{ text: "📣 Таблица лидеров" }],
        ],
        resize_keyboard: true,
    };

    await ctx.reply("Выбери категорию или режим:", {
        reply_markup: startKeyboard,
    });
});

// Обработчик команды /profile
bot.command("profile", profileCommand);

// Обработчик команды /stop
bot.command("stop", stopCommand);

// Обработчик команды /leaderboard
bot.command("leaderboard", leaderboardCommand);

// Обработчик команды /admin
bot.command("admin", adminCommand);

// Обработчик команды /reset
bot.command("reset", resetCommand);

// Обработчик команды /menu
bot.command("menu", menuCommand);

// Обработчик сообщений
bot.on("message", async (ctx) => {
    const { text } = ctx.message;
    if (text.startsWith("/")) return; // Игнорируем команды
    commandCenter(ctx);
});

// Запуск бота
bot.start();
console.log("Бот запущен!");