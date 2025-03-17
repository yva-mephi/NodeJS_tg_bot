import { questionsData } from "./loadQuestions.js";
import startQuiz from "./startQuiz.js";
import { updateLeaderboard } from "../database/userUpdate.js";

async function handleQuizAnswer(ctx, answer) {
    const { currentQuestion, currentCategory, correctAnswers = {}, askedQuestions = [], ratingMode, score = 0 } = ctx.session;

    if (!currentQuestion) {
        await ctx.reply("Кажется, я забыл вопрос. Давайте начнем заново.");
        return;
    }

    const correctAnswer = currentQuestion.options[currentQuestion.correctOption];

    if (answer === correctAnswer) {
        await ctx.reply("✅ Верно!");
        if (ratingMode) {
            ctx.session.score = score + 1;
        } else {
            ctx.session.correctAnswers[currentCategory] = (ctx.session.correctAnswers[currentCategory] || 0) + 1;
        }
    } else {
        await ctx.reply(`❌ Неверно! Правильный ответ: ${correctAnswer}`);
        if (ratingMode) {
            const username = ctx.from.username || ctx.from.first_name;
            await updateLeaderboard(username, "rating", ctx.session.score);
            await ctx.reply(`Игра завершена! Ваш счет: ${ctx.session.score}`);
            ctx.session.ratingMode = false;
            ctx.session.score = 0;
            returnMainMenu(ctx); // Возвращаем главное меню
            return;
        }
    }

    // Добавляем вопрос в список заданных
    ctx.session.askedQuestions = [...askedQuestions, currentQuestion.index];

    // Получаем вопросы для текущей категории
    const questions = ctx.session.questionsData[currentCategory];

    // Проверяем, остались ли вопросы
    if (ctx.session.askedQuestions.length >= questions.length) {
        const username = ctx.from.username || ctx.from.first_name;
        const finalScore = ratingMode ? ctx.session.score : ctx.session.correctAnswers[currentCategory];

        // Обновляем таблицу лидеров
        await updateLeaderboard(username, ratingMode ? "rating" : currentCategory, finalScore);

        await ctx.reply(`🎉 Вы прошли все вопросы! Набранные баллы: ${finalScore}`);
        ctx.session.askedQuestions = [];
        ctx.session.currentQuestion = null;
        ctx.session.ratingMode = false;
        ctx.session.score = 0;

        returnMainMenu(ctx); // Возвращаем главное меню
        return;
    }

    // Запускаем следующий вопрос
    await startQuiz(ctx, currentCategory);
}

// Функция для возврата главного меню
function returnMainMenu(ctx) {
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

    ctx.reply("Выбери категорию или режим:", {
        reply_markup: startKeyboard,
    });
}

export default handleQuizAnswer;