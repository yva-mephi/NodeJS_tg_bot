import db from "../database/init.js";

export default async function adminCommand(ctx) {
    const userId = ctx.from.id;
    const adminId = parseInt(process.env.ADMIN_ID, 10);

    if (userId === adminId) {
        const totalUsers = await new Promise((resolve, reject) => {
            db.get("SELECT COUNT(*) AS count FROM leaderboard", (err, row) => {
                if (err) return reject(err);
                resolve(row.count);
            });
        });

        await ctx.reply(`Общее количество пользователей: ${totalUsers}`);
    } else {
        await ctx.reply("У вас нет прав для использования этой команды.");
    }
}