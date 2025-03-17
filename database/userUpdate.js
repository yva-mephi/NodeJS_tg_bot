import db from "./init.js";
import { format } from "date-fns";

async function updateLeaderboard(username, category, score) {
    const now = new Date().toISOString();

    // Проверяем, существует ли запись пользователя
    db.get(
        "SELECT * FROM leaderboard WHERE username = ?",
        [username],
        (err, row) => {
            if (err) {
                console.error("Ошибка при поиске пользователя:", err);
                return;
            }

            if (row) {
                // Если запись существует, обновляем её
                const updateQuery = category === "rating"
                    ? `UPDATE leaderboard 
             SET rating_score = ?, total_score = total_score - ${row.rating_score} + ?, last_played = ?
             WHERE username = ?`
                    : `UPDATE leaderboard 
             SET ${category}_score = ?, total_score = total_score - ${row[`${category}_score`]} + ?, last_played = ?
             WHERE username = ?`;

                db.run(
                    updateQuery,
                    [score, score, now, username],
                    (err) => {
                        if (err) {
                            console.error("Ошибка при обновлении таблицы лидеров:", err);
                        }
                    }
                );
            } else {
                // Если записи нет, создаём новую
                const insertQuery = category === "rating"
                    ? `INSERT INTO leaderboard 
             (username, rating_score, total_score, last_played) 
             VALUES (?, ?, ?, ?)`
                    : `INSERT INTO leaderboard 
             (username, ${category}_score, total_score, last_played) 
             VALUES (?, ?, ?, ?)`;

                db.run(
                    insertQuery,
                    [username, score, score, now],
                    (err) => {
                        if (err) {
                            console.error("Ошибка при добавлении записи в таблицу лидеров:", err);
                        }
                    }
                );
            }
        }
    );
}

export { updateLeaderboard };