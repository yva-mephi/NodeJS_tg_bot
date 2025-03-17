import startQuiz from "./startQuiz.js";
import startRatingQuiz from "./startRatingQuiz.js";
import db from "../database/init.js";
import handleQuizAnswer from "./handleQuizAnswer.js";

const commandCenter = async (ctx) => {
    const { text } = ctx.message;

    switch (text) {
        case "📄 HTML":
            await ctx.replyWithSticker("CAACAgIAAxkBAAENiEBn1_AvCcpLTFO8B_jJMuN_uA0JZgACL2QAAs7KwUqlbWrq3dpn1TYE");
            await ctx.reply("Вы выбрали 📄 HTML");
            await startQuiz(ctx, "html");
            break;

        case "🎨 CSS":
            await ctx.replyWithSticker("CAACAgIAAxkBAAENiEhn1_BRQKVCver1eCTSgN5-V7hLWgAClW0AAtrKuUqhqxudVSUVOTYE");
            await ctx.reply("Вы выбрали 🎨 CSS");
            await startQuiz(ctx, "css");
            break;

        case "🟨 JavaScript":
            await ctx.replyWithSticker("CAACAgIAAxkBAAENiDxn1_AiDiaZ8O6_uiMSWTg_RNwhZwACT2MAAkq5wEqPFE6aOjJlnDYE");
            await ctx.reply("Вы выбрали 🟨 JavaScript");
            await startQuiz(ctx, "js");
            break;

        case "⚛️ React":
            await ctx.replyWithSticker("CAACAgIAAxkBAAENiEZn1_BG3rMxBU8gP57xPjvvpAb46QACXW0AAsUswUpnIKhUWyBaZjYE");
            await ctx.reply("Вы выбрали ⚛️ React");
            await startQuiz(ctx, "react");
            break;

        case "🅰️ Angular":
            await ctx.replyWithSticker("CAACAgIAAxkBAAENiEpn1_Ba-yeZ9F0lUT4N7vkELBq1kgACwG8AApxKwEoi966UwwNEJzYE");
            await ctx.reply("Вы выбрали 🅰️ Angular");
            await startQuiz(ctx, "angular");
            break;

        case "🟦 TypeScript":
            await ctx.replyWithSticker("CAACAgIAAxkBAAENiCxn1-9HfiZsOkhEgx5DunVKIMvK9AAC-GkAAsTowUrOmdEWOdHVnzYE");
            await ctx.reply("Вы выбрали 🟦 TypeScript");
            await startQuiz(ctx, "typescript");
            break;

        case "🟩Node.js":
            await ctx.replyWithSticker("CAACAgIAAxkBAAENiEJn1_A9IEAvBeD87_MPmLX0TdoErQACt2oAAuUkwUpkz9BwvFonbjYE");
            await ctx.reply("Вы выбрали 🟢 Node.js");
            await startQuiz(ctx, "nodejs");
            break;

        case "🏆 Рейтинговый режим":
            await startRatingQuiz(ctx);
            break;

        case "📣 Таблица лидеров":
            await showLeaderboard(ctx);
            break;

        default:
            await handleQuizAnswer(ctx, text);
    }
};

// Функция для отображения таблицы лидеров
async function showLeaderboard(ctx) {
    const topUsers = await new Promise((resolve, reject) => {
        db.all(
            "SELECT username, total_score  FROM leaderboard ORDER BY total_score DESC LIMIT 10",
            (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            }
        );
    });

    if (topUsers.length > 0) {
        const leaderboardMessage = topUsers
            .map((user, index) => `${index + 1}. ${user.username} - ${user.total_score} очков`)
            .join("\n");

        await ctx.reply(`🏆 Таблица лидеров:\n${leaderboardMessage}`);
    } else {
        await ctx.reply("Таблица лидеров пуста. Начните игру, чтобы появились результаты!");
    }
}

export default commandCenter;