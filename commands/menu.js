export default async function menuCommand(ctx) {
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