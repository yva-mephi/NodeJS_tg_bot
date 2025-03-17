import db from "./init.js";

async function createProfile(username) {
    db.get(
        "SELECT * FROM leaderboard WHERE username = ?",
        [username],
        (err, row) => {
            if (err) {
                console.error("Ошибка при поиске пользователя:", err);
                return;
            }

            if (!row) {
                db.run(
                    "INSERT INTO leaderboard (username, last_played) VALUES (?, ?)",
                    [username, "Еще не играл"],
                    (err) => {
                        if (err) {
                            console.error("Ошибка при создании профиля:", err);
                        }
                    }
                );
            }
        }
    );
}

export default createProfile;