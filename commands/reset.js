import db from "../database/init.js";

export default async function resetCommand(ctx) {
    const { currentCategory } = ctx.session;

    if (!currentCategory) {
        await ctx.reply("Вы не начали тест.");
        return;
    }

    const username = ctx.from.username || ctx.from.first_name;

    db.run(
        `UPDATE leaderboard 
     SET ${currentCategory}_score = 0, total_score = total_score - ${currentCategory}_score
     WHERE username = ?`,
        [username],
        (err) => {
            if (err) {
                console.error("Ошибка при сбросе прогресса:", err);
                ctx.reply("Произошла ошибка при сбросе прогресса.");
            } else {
                ctx.reply(`Прогресс по категории ${currentCategory} сброшен.`);
            }
        }
    );

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