import db from "../database/init.js";

async function profileCommand(ctx) {
    const username = ctx.from.username || ctx.from.first_name;

    db.get(
        "SELECT * FROM leaderboard WHERE username = ?",
        [username],
        (err, row) => {
            if (err) {
                console.error("Ошибка при поиске пользователя:", err);
                return;
            }

            if (row) {
                const profileMessage = `
👤 Профиль пользователя ${username}:
📅 Последняя игра: ${row.last_played}

📊 Результаты:
📄 HTML: ${row.html_score} баллов
🎨 CSS: ${row.css_score} баллов
🟨 JavaScript: ${row.js_score} баллов
⚛️ React: ${row.react_score} баллов
🅰️ Angular: ${row.angular_score} баллов
🟦 TypeScript: ${row.typescript_score} баллов
🟢 Node.js: ${row.nodejs_score} баллов
🏆 Рейтинговый режим: ${row.rating_score} баллов

🏆 Общий счет: ${row.total_score} баллов
        `;

                ctx.reply(profileMessage);
            } else {
                ctx.reply("Профиль не найден. Начните игру, чтобы создать профиль.");
            }
        }
    );
}

export default profileCommand;