import db from "./init.js";

async function getTotalUsers() {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT COUNT(*) AS count FROM leaderboard",
            (err, row) => {
                if (err) return reject(err);
                resolve(row.count);
            }
        );
    });
}

export default getTotalUsers;