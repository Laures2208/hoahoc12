import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("data.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT,
    lesson_id TEXT,
    completed INTEGER DEFAULT 0,
    score INTEGER DEFAULT 0,
    UNIQUE(user_email, lesson_id)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get("/api/progress/:email", (req, res) => {
    const { email } = req.params;
    const rows = db.prepare("SELECT * FROM progress WHERE user_email = ?").all(email);
    res.json(rows);
  });

  app.post("/api/progress", (req, res) => {
    const { email, lesson_id, completed, score } = req.body;
    const stmt = db.prepare(`
      INSERT INTO progress (user_email, lesson_id, completed, score)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(user_email, lesson_id) DO UPDATE SET
        completed = excluded.completed,
        score = MAX(progress.score, excluded.score)
    `);
    stmt.run(email, lesson_id, completed, score);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
