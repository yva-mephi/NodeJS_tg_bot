import { updateLeaderboard } from "../database/userUpdate.js";

export default async function stopCommand(ctx) {
    const { currentCategory, correctAnswers = {}, ratingMode, score = 0 } = ctx.session;

    if (!currentCategory) {
        await ctx.reply("Вы не начали тест.");
        return;
    }

    const username = ctx.from.username || ctx.from.first_name;
    const finalScore = ratingMode ? score : correctAnswers[currentCategory] || 0;

    // Обновляем таблицу лидеров
    await updateLeaderboard(username, ratingMode ? "rating" : currentCategory, finalScore);

    await ctx.reply(`Вы завершили тест! Набранные баллы: ${finalScore}`);
    ctx.session.askedQuestions = [];
    ctx.session.currentQuestion = null;
    ctx.session.ratingMode = false;
    ctx.session.score = 0;

    // Возвращаем главное меню
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
}