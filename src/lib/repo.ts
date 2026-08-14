import { db } from "./db";
import { newId } from "./utils";
import type {
  Mission,
  QuizQuestion,
  Flashcard,
  Badge,
  Progress,
  BadgeEarned,
  MissionWithMeta,
} from "./types";

// ---------- row <-> type mapping ----------

function rowToMission(row: any): Mission {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    level: row.level,
    objective: row.objective,
    lessonContent: row.lessonContent,
    scenario: row.scenario,
    sortOrder: row.sortOrder,
    isPublished: !!row.isPublished,
    isEnabled: !!row.isEnabled,
  };
}

function rowToQuestion(row: any): QuizQuestion {
  return {
    id: row.id,
    missionId: row.missionId,
    type: row.type,
    question: row.question,
    options: JSON.parse(row.options),
    correctAnswer: row.correctAnswer,
    explanation: row.explanation,
    isEnabled: !!row.isEnabled,
    sortOrder: row.sortOrder,
  };
}

function rowToFlashcard(row: any): Flashcard {
  return {
    id: row.id,
    missionId: row.missionId,
    concept: row.concept,
    definition: row.definition,
    example: row.example,
    tip: row.tip,
    isEnabled: !!row.isEnabled,
    sortOrder: row.sortOrder,
  };
}

function rowToBadge(row: any): Badge {
  return {
    id: row.id,
    missionId: row.missionId,
    name: row.name,
    description: row.description,
    icon: row.icon,
  };
}

function rowToProgress(row: any): Progress {
  return {
    id: row.id,
    sessionId: row.sessionId,
    missionId: row.missionId,
    status: row.status,
    quizScore: row.quizScore,
    quizTotal: row.quizTotal,
    completedAt: row.completedAt,
    updatedAt: row.updatedAt,
  };
}

// ---------- Missions ----------

export const MissionRepo = {
  // learnerVisible = true restricts to isPublished && isEnabled (server-side enforced,
  // so unpublished/disabled content is never reachable even via a direct URL).
  listAll(learnerVisible: boolean): Mission[] {
    const rows = learnerVisible
      ? db
          .prepare(
            "SELECT * FROM missions WHERE isPublished = 1 AND isEnabled = 1 ORDER BY sortOrder ASC",
          )
          .all()
      : db.prepare("SELECT * FROM missions ORDER BY sortOrder ASC").all();
    return rows.map(rowToMission);
  },

  getBySlug(slug: string, learnerVisible: boolean): Mission | null {
    const row = learnerVisible
      ? db
          .prepare(
            "SELECT * FROM missions WHERE slug = ? AND isPublished = 1 AND isEnabled = 1",
          )
          .get(slug)
      : db.prepare("SELECT * FROM missions WHERE slug = ?").get(slug);
    return row ? rowToMission(row) : null;
  },

  getById(id: string): Mission | null {
    const row = db.prepare("SELECT * FROM missions WHERE id = ?").get(id);
    return row ? rowToMission(row) : null;
  },

  create(input: Omit<Mission, "id">): Mission {
    const id = newId("mission");
    db.prepare(
      `INSERT INTO missions (id, slug, title, level, objective, lessonContent, scenario, sortOrder, isPublished, isEnabled)
       VALUES (@id, @slug, @title, @level, @objective, @lessonContent, @scenario, @sortOrder, @isPublished, @isEnabled)`,
    ).run({
      id,
      slug: input.slug,
      title: input.title,
      level: input.level,
      objective: input.objective,
      lessonContent: input.lessonContent,
      scenario: input.scenario,
      sortOrder: input.sortOrder,
      isPublished: input.isPublished ? 1 : 0,
      isEnabled: input.isEnabled ? 1 : 0,
    });
    return this.getById(id)!;
  },

  update(id: string, input: Partial<Omit<Mission, "id">>): Mission | null {
    const existing = this.getById(id);
    if (!existing) return null;
    const merged = { ...existing, ...input };
    db.prepare(
      `UPDATE missions SET slug=@slug, title=@title, level=@level, objective=@objective,
       lessonContent=@lessonContent, scenario=@scenario, sortOrder=@sortOrder,
       isPublished=@isPublished, isEnabled=@isEnabled, updatedAt=datetime('now') WHERE id=@id`,
    ).run({
      id,
      slug: merged.slug,
      title: merged.title,
      level: merged.level,
      objective: merged.objective,
      lessonContent: merged.lessonContent,
      scenario: merged.scenario,
      sortOrder: merged.sortOrder,
      isPublished: merged.isPublished ? 1 : 0,
      isEnabled: merged.isEnabled ? 1 : 0,
    });
    return this.getById(id);
  },

  remove(id: string): boolean {
    const res = db.prepare("DELETE FROM missions WHERE id = ?").run(id);
    return res.changes > 0;
  },
};

// ---------- Quiz Questions ----------

export const QuestionRepo = {
  listByMission(missionId: string, learnerVisible: boolean): QuizQuestion[] {
    const rows = learnerVisible
      ? db
          .prepare(
            "SELECT * FROM quiz_questions WHERE missionId = ? AND isEnabled = 1 ORDER BY sortOrder ASC",
          )
          .all(missionId)
      : db
          .prepare(
            "SELECT * FROM quiz_questions WHERE missionId = ? ORDER BY sortOrder ASC",
          )
          .all(missionId);
    return rows.map(rowToQuestion);
  },

  getById(id: string): QuizQuestion | null {
    const row = db.prepare("SELECT * FROM quiz_questions WHERE id = ?").get(id);
    return row ? rowToQuestion(row) : null;
  },

  create(input: Omit<QuizQuestion, "id">): QuizQuestion {
    const id = newId("q");
    db.prepare(
      `INSERT INTO quiz_questions (id, missionId, type, question, options, correctAnswer, explanation, isEnabled, sortOrder)
       VALUES (@id, @missionId, @type, @question, @options, @correctAnswer, @explanation, @isEnabled, @sortOrder)`,
    ).run({
      id,
      missionId: input.missionId,
      type: input.type,
      question: input.question,
      options: JSON.stringify(input.options),
      correctAnswer: input.correctAnswer,
      explanation: input.explanation,
      isEnabled: input.isEnabled ? 1 : 0,
      sortOrder: input.sortOrder,
    });
    return this.getById(id)!;
  },

  update(
    id: string,
    input: Partial<Omit<QuizQuestion, "id">>,
  ): QuizQuestion | null {
    const existing = this.getById(id);
    if (!existing) return null;
    const merged = { ...existing, ...input };
    db.prepare(
      `UPDATE quiz_questions SET missionId=@missionId, type=@type, question=@question, options=@options,
       correctAnswer=@correctAnswer, explanation=@explanation, isEnabled=@isEnabled, sortOrder=@sortOrder WHERE id=@id`,
    ).run({
      id,
      missionId: merged.missionId,
      type: merged.type,
      question: merged.question,
      options: JSON.stringify(merged.options),
      correctAnswer: merged.correctAnswer,
      explanation: merged.explanation,
      isEnabled: merged.isEnabled ? 1 : 0,
      sortOrder: merged.sortOrder,
    });
    return this.getById(id);
  },

  remove(id: string): boolean {
    const res = db.prepare("DELETE FROM quiz_questions WHERE id = ?").run(id);
    return res.changes > 0;
  },
};

// ---------- Flashcards ----------

export const FlashcardRepo = {
  listByMission(missionId: string, learnerVisible: boolean): Flashcard[] {
    const rows = learnerVisible
      ? db
          .prepare(
            "SELECT * FROM flashcards WHERE missionId = ? AND isEnabled = 1 ORDER BY sortOrder ASC",
          )
          .all(missionId)
      : db
          .prepare(
            "SELECT * FROM flashcards WHERE missionId = ? ORDER BY sortOrder ASC",
          )
          .all(missionId);
    return rows.map(rowToFlashcard);
  },

  getById(id: string): Flashcard | null {
    const row = db.prepare("SELECT * FROM flashcards WHERE id = ?").get(id);
    return row ? rowToFlashcard(row) : null;
  },

  create(input: Omit<Flashcard, "id">): Flashcard {
    const id = newId("fc");
    db.prepare(
      `INSERT INTO flashcards (id, missionId, concept, definition, example, tip, isEnabled, sortOrder)
       VALUES (@id, @missionId, @concept, @definition, @example, @tip, @isEnabled, @sortOrder)`,
    ).run({
      id,
      missionId: input.missionId,
      concept: input.concept,
      definition: input.definition,
      example: input.example,
      tip: input.tip,
      isEnabled: input.isEnabled ? 1 : 0,
      sortOrder: input.sortOrder,
    });
    return this.getById(id)!;
  },

  update(id: string, input: Partial<Omit<Flashcard, "id">>): Flashcard | null {
    const existing = this.getById(id);
    if (!existing) return null;
    const merged = { ...existing, ...input };
    db.prepare(
      `UPDATE flashcards SET missionId=@missionId, concept=@concept, definition=@definition,
       example=@example, tip=@tip, isEnabled=@isEnabled, sortOrder=@sortOrder WHERE id=@id`,
    ).run({
      id,
      missionId: merged.missionId,
      concept: merged.concept,
      definition: merged.definition,
      example: merged.example,
      tip: merged.tip,
      isEnabled: merged.isEnabled ? 1 : 0,
      sortOrder: merged.sortOrder,
    });
    return this.getById(id);
  },

  remove(id: string): boolean {
    const res = db.prepare("DELETE FROM flashcards WHERE id = ?").run(id);
    return res.changes > 0;
  },
};

// ---------- Badges ----------

export const BadgeRepo = {
  listAll(): Badge[] {
    return (db.prepare("SELECT * FROM badges").all() as any[]).map(rowToBadge);
  },
  getByMission(missionId: string): Badge | null {
    const row = db
      .prepare("SELECT * FROM badges WHERE missionId = ?")
      .get(missionId);
    return row ? rowToBadge(row) : null;
  },
  getById(id: string): Badge | null {
    const row = db.prepare("SELECT * FROM badges WHERE id = ?").get(id);
    return row ? rowToBadge(row) : null;
  },
  create(input: Omit<Badge, "id">): Badge {
    const id = newId("badge");
    db.prepare(
      `INSERT INTO badges (id, missionId, name, description, icon) VALUES (@id, @missionId, @name, @description, @icon)`,
    ).run({ id, ...input });
    return this.getById(id)!;
  },
  update(id: string, input: Partial<Omit<Badge, "id">>): Badge | null {
    const existing = this.getById(id);
    if (!existing) return null;
    const merged = { ...existing, ...input };
    db.prepare(
      `UPDATE badges SET missionId=@missionId, name=@name, description=@description, icon=@icon WHERE id=@id`,
    ).run(merged);
    return this.getById(id);
  },
  remove(id: string): boolean {
    const res = db.prepare("DELETE FROM badges WHERE id = ?").run(id);
    return res.changes > 0;
  },
};

// ---------- Progress ----------

export const ProgressRepo = {
  listBySession(sessionId: string): Progress[] {
    return (
      db
        .prepare("SELECT * FROM progress WHERE sessionId = ?")
        .all(sessionId) as any[]
    ).map(rowToProgress);
  },

  get(sessionId: string, missionId: string): Progress | null {
    const row = db
      .prepare("SELECT * FROM progress WHERE sessionId = ? AND missionId = ?")
      .get(sessionId, missionId);
    return row ? rowToProgress(row) : null;
  },

  upsert(input: {
    sessionId: string;
    missionId: string;
    status: "in_progress" | "completed";
    quizScore?: number | null;
    quizTotal?: number | null;
  }): Progress {
    const existing = this.get(input.sessionId, input.missionId);
    const completedAt =
      input.status === "completed"
        ? new Date().toISOString()
        : (existing?.completedAt ?? null);
    if (existing) {
      db.prepare(
        `UPDATE progress SET status=@status, quizScore=@quizScore, quizTotal=@quizTotal, completedAt=@completedAt, updatedAt=datetime('now')
         WHERE sessionId=@sessionId AND missionId=@missionId`,
      ).run({
        sessionId: input.sessionId,
        missionId: input.missionId,
        status: input.status,
        quizScore: input.quizScore ?? existing.quizScore,
        quizTotal: input.quizTotal ?? existing.quizTotal,
        completedAt,
      });
    } else {
      db.prepare(
        `INSERT INTO progress (id, sessionId, missionId, status, quizScore, quizTotal, completedAt)
         VALUES (@id, @sessionId, @missionId, @status, @quizScore, @quizTotal, @completedAt)`,
      ).run({
        id: newId("progress"),
        sessionId: input.sessionId,
        missionId: input.missionId,
        status: input.status,
        quizScore: input.quizScore ?? null,
        quizTotal: input.quizTotal ?? null,
        completedAt,
      });
    }
    return this.get(input.sessionId, input.missionId)!;
  },
};

// ---------- Badges Earned ----------

export const BadgeEarnedRepo = {
  listBySession(sessionId: string): BadgeEarned[] {
    return db
      .prepare("SELECT * FROM badges_earned WHERE sessionId = ?")
      .all(sessionId) as any[];
  },
  award(sessionId: string, badgeId: string): { awarded: boolean } {
    // Idempotent: UNIQUE(sessionId, badgeId) means a duplicate insert is safely ignored.
    const id = newId("be");
    const res = db
      .prepare(
        "INSERT OR IGNORE INTO badges_earned (id, sessionId, badgeId) VALUES (?, ?, ?)",
      )
      .run(id, sessionId, badgeId);
    return { awarded: res.changes > 0 };
  },
};

// ---------- Composite: mission list with metadata for the map/dashboard ----------

export function listMissionsWithMeta(
  sessionId: string | null,
  learnerVisible: boolean,
): MissionWithMeta[] {
  const missionList = MissionRepo.listAll(learnerVisible);
  return missionList.map((m) => {
    const badge = BadgeRepo.getByMission(m.id);
    const questionCount = QuestionRepo.listByMission(
      m.id,
      learnerVisible,
    ).length;
    const flashcardCount = FlashcardRepo.listByMission(
      m.id,
      learnerVisible,
    ).length;
    const progress = sessionId ? ProgressRepo.get(sessionId, m.id) : null;
    return { ...m, badge, questionCount, flashcardCount, progress };
  });
}
