import db from "./init.js";

async function getLeaderboard() {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT username, total_score FROM leaderboard ORDER BY total_score DESC LIMIT 10",
            (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            }
        );
    });
}

export default getLeaderboard;