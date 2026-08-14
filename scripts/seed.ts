// Run with: npm run db:seed
// Idempotent-ish: clears existing content tables and reloads from seed-data.ts,
// but leaves learner progress/badges_earned untouched so re-seeding content
// doesn't wipe a live demo session's progress.
import { db } from "../src/lib/db";
import { missions } from "../src/lib/seed-data";
import { newId } from "../src/lib/utils";

const insertMission = db.prepare(
  `INSERT INTO missions (id, slug, title, level, objective, lessonContent, scenario, sortOrder, isPublished, isEnabled)
   VALUES (@id, @slug, @title, @level, @objective, @lessonContent, @scenario, @sortOrder, 1, 1)`
);
const insertQuestion = db.prepare(
  `INSERT INTO quiz_questions (id, missionId, type, question, options, correctAnswer, explanation, isEnabled, sortOrder)
   VALUES (@id, @missionId, @type, @question, @options, @correctAnswer, @explanation, 1, @sortOrder)`
);
const insertFlashcard = db.prepare(
  `INSERT INTO flashcards (id, missionId, concept, definition, example, tip, isEnabled, sortOrder)
   VALUES (@id, @missionId, @concept, @definition, @example, @tip, 1, @sortOrder)`
);
const insertBadge = db.prepare(
  `INSERT INTO badges (id, missionId, name, description, icon) VALUES (@id, @missionId, @name, @description, @icon)`
);

function run() {
  const seedAll = db.transaction(() => {
    db.exec("DELETE FROM badges; DELETE FROM flashcards; DELETE FROM quiz_questions; DELETE FROM missions;");

    missions.forEach((m, index) => {
      const missionId = newId("mission");
      insertMission.run({
        id: missionId,
        slug: m.slug,
        title: m.title,
        level: m.level,
        objective: m.objective,
        lessonContent: m.lessonContent,
        scenario: m.scenario,
        sortOrder: index,
      });

      m.quiz.forEach((q, qIndex) => {
        insertQuestion.run({
          id: newId("q"),
          missionId,
          type: q.type,
          question: q.question,
          options: JSON.stringify(q.options),
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          sortOrder: qIndex,
        });
      });

      m.flashcards.forEach((f, fIndex) => {
        insertFlashcard.run({
          id: newId("fc"),
          missionId,
          concept: f.concept,
          definition: f.definition,
          example: f.example,
          tip: f.tip,
          sortOrder: fIndex,
        });
      });

      insertBadge.run({
        id: newId("badge"),
        missionId,
        name: m.badge.name,
        description: m.badge.description,
        icon: m.badge.icon,
      });
    });
  });

  seedAll();
  console.log(`Seeded ${missions.length} missions with quizzes, flashcards, and badges.`);
}

run();
