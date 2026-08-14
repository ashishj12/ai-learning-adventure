export type MissionLevel =
  | "Beginner"
  | "Basic Understanding"
  | "Applied Practice"
  | "Responsible Use"
  | "Builder Mindset";

export interface Mission {
  id: string;
  slug: string;
  title: string;
  level: MissionLevel;
  objective: string;
  lessonContent: string;
  scenario: string;
  sortOrder: number;
  isPublished: boolean;
  isEnabled: boolean;
}

export type QuestionType = "mcq" | "true_false" | "scenario";

export interface QuizQuestion {
  id: string;
  missionId: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  isEnabled: boolean;
  sortOrder: number;
}

export interface Flashcard {
  id: string;
  missionId: string;
  concept: string;
  definition: string;
  example: string;
  tip: string;
  isEnabled: boolean;
  sortOrder: number;
}

export interface Badge {
  id: string;
  missionId: string;
  name: string;
  description: string;
  icon: string;
}

export type ProgressStatus = "in_progress" | "completed";

export interface Progress {
  id: string;
  sessionId: string;
  missionId: string;
  status: ProgressStatus;
  quizScore: number | null;
  quizTotal: number | null;
  completedAt: string | null;
  updatedAt: string;
}

export interface BadgeEarned {
  id: string;
  sessionId: string;
  badgeId: string;
  earnedAt: string;
}

export interface MissionWithMeta extends Mission {
  badge: Badge | null;
  questionCount: number;
  flashcardCount: number;
  progress: Progress | null;
}

// ---- AI provider types ----

export type TutorMode = "mission_help" | "ai_only" | "quiz_explanation" | "next_mission";

export interface TutorRequest {
  mode: TutorMode;
  question?: string;
  missionSlug?: string;
  missionTitle?: string;
  missionContent?: string;
  quizQuestion?: string;
  selectedAnswer?: string;
  correctAnswer?: string;
  isCorrect?: boolean;
  userLevel?: string;
}

export interface TutorResponse {
  answer: string;
  isMock: boolean;
  suggestedNextMissionSlug?: string;
}
