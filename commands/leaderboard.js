import db from "../database/init.js";

export default async function leaderboardCommand(ctx) {
    const topUsers = await new Promise((resolve, reject) => {
        db.all(
            "SELECT username, total_score FROM leaderboard ORDER BY total_score DESC LIMIT 10",
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