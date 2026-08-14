import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { QuestionRepo } from "@/lib/repo";

const bodySchema = z.object({
  questionId: z.string().min(1),
  selectedAnswer: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { questionId, selectedAnswer } = parsed.data;
    const question = QuestionRepo.getById(questionId);
    if (!question || !question.isEnabled) {
      return NextResponse.json(
        { error: "Question not found." },
        { status: 404 },
      );
    }

    const isCorrect = question.correctAnswer === selectedAnswer;

    return NextResponse.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    });
  } catch (err) {
    console.error("[/api/quizzes] POST failed:", err);
    return NextResponse.json(
      { error: "Failed to grade answer." },
      { status: 500 },
    );
  }
}
