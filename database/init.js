import sqlite3 from "sqlite3";
const { Database } = sqlite3;

const db = new Database("database/leaderboard.db");

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      html_score INTEGER DEFAULT 0,
      css_score INTEGER DEFAULT 0,
      js_score INTEGER DEFAULT 0,
      react_score INTEGER DEFAULT 0,
      angular_score INTEGER DEFAULT 0,
      typescript_score INTEGER DEFAULT 0,
      nodejs_score INTEGER DEFAULT 0,
      rating_score INTEGER DEFAULT 0,
      total_score INTEGER DEFAULT 0,
      last_played TEXT NOT NULL
    )
  `);
    console.log("Таблица leaderboard создана или уже существует.");
});

export default db;