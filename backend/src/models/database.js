const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    // This line finds the 'database' folder and tells SQLite to create our database file there.
    const dbPath = path.join(__dirname, '../../database/sweetshop.db');
    this.db = new sqlite3.Database(dbPath);
    this.init();
  }

  init() {
    // Create the 'users' table if it doesn't already exist
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create the 'sweets' table if it doesn't already exist
    this.db.run(`
      CREATE TABLE IF NOT EXISTS sweets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  // Helper method to run queries with promises (makes code cleaner later)
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

// Create one instance of the database and export it for our app to use
module.exports = new Database();