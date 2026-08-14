-- AI Learning Adventure — schema (SQLite)

CREATE TABLE IF NOT EXISTS missions (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  level TEXT NOT NULL,               -- Beginner | Basic Understanding | Applied Practice | Responsible Use | Builder Mindset
  objective TEXT NOT NULL,
  lessonContent TEXT NOT NULL,
  scenario TEXT NOT NULL,
  sortOrder INTEGER NOT NULL,
  isPublished INTEGER NOT NULL DEFAULT 1,
  isEnabled INTEGER NOT NULL DEFAULT 1,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id TEXT PRIMARY KEY,
  missionId TEXT NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  type TEXT NOT NULL,                -- mcq | true_false | scenario
  question TEXT NOT NULL,
  options TEXT NOT NULL,             -- JSON array of strings
  correctAnswer TEXT NOT NULL,       -- matches one of options
  explanation TEXT NOT NULL,
  isEnabled INTEGER NOT NULL DEFAULT 1,
  sortOrder INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS flashcards (
  id TEXT PRIMARY KEY,
  missionId TEXT NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  concept TEXT NOT NULL,
  definition TEXT NOT NULL,
  example TEXT NOT NULL,
  tip TEXT NOT NULL,
  isEnabled INTEGER NOT NULL DEFAULT 1,
  sortOrder INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS badges (
  id TEXT PRIMARY KEY,
  missionId TEXT NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'award'
);

CREATE TABLE IF NOT EXISTS progress (
  id TEXT PRIMARY KEY,
  sessionId TEXT NOT NULL,
  missionId TEXT NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'in_progress', -- in_progress | completed
  quizScore INTEGER,
  quizTotal INTEGER,
  completedAt TEXT,
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(sessionId, missionId)
);

CREATE TABLE IF NOT EXISTS badges_earned (
  id TEXT PRIMARY KEY,
  sessionId TEXT NOT NULL,
  badgeId TEXT NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earnedAt TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(sessionId, badgeId)
);

CREATE INDEX IF NOT EXISTS idx_quiz_mission ON quiz_questions(missionId);
CREATE INDEX IF NOT EXISTS idx_flashcards_mission ON flashcards(missionId);
CREATE INDEX IF NOT EXISTS idx_progress_session ON progress(sessionId);
CREATE INDEX IF NOT EXISTS idx_badges_earned_session ON badges_earned(sessionId);
