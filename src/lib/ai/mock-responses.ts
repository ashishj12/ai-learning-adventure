import type { TutorRequest, TutorResponse } from "@/lib/types";

// Deterministic, clearly-labeled sample responses. Used when GROQ_API_KEY is
// missing, or when a live call errors/times out — the app must stay fully
// demoable either way. Never silently fails: always returns *something*.

const MOCK_PREFIX = "(Sample response — connect an AI key for live answers) ";

const topicExplainers: Record<string, string> = {
  "what-is-ai":
    "AI is software trained to spot patterns in data and use them to produce useful outputs — like recognizing a face in a photo. It doesn't think or feel; it predicts based on what it learned.",
  "what-is-generative-ai":
    "Generative AI creates brand-new content — text, images, audio — by predicting plausible next steps based on patterns learned from huge datasets, rather than copying stored examples.",
  "what-is-an-llm":
    "A Large Language Model generates text by predicting the next token, over and over, based on everything written so far. It's trained on massive text data, not a lookup table of answers.",
  "prompt-engineering-basics":
    "Good prompts are specific: state the task, audience, tone, and format you want. Adding an example of the style you're after usually improves results a lot.",
  "tokens-and-context":
    "Tokens are the text chunks a model reads and writes, and the context window is the max number of tokens it can consider at once — input and output combined.",
  "hallucinations":
    "A hallucination is confident-sounding AI output that's actually false or made up. It happens because the model optimizes for fluent text, not verified truth — always double check specific facts.",
  "bias-and-responsible-ai":
    "AI models can inherit bias from their training data. Responsible use means staying aware of that, testing high-stakes decisions for fairness, and keeping a human in the loop.",
  "retrieval-augmented-generation":
    "RAG retrieves real, relevant documents first, then has the model generate an answer grounded in that content — reducing hallucination and letting it use info beyond its training cutoff.",
};

// Keyword -> mission slug, used to match free-text questions (AI Only Mode,
// the landing-page prompt box) to the right sample explanation when there's
// no missionSlug context to key off directly. Order matters: more specific
// terms are checked first so e.g. "generative AI" doesn't match "AI" alone.
const keywordToSlug: [RegExp, string][] = [
  [/retrieval|\brag\b/i, "retrieval-augmented-generation"],
  [/hallucinat/i, "hallucinations"],
  [/\bbias\b|responsible/i, "bias-and-responsible-ai"],
  [/\btoken|context window/i, "tokens-and-context"],
  [/prompt/i, "prompt-engineering-basics"],
  [/generative/i, "what-is-generative-ai"],
  [/\bllm\b|language model/i, "what-is-an-llm"],
  [/what is ai\b|\bartificial intelligence\b/i, "what-is-ai"],
];

function matchTopicFromText(question?: string): string | undefined {
  if (!question) return undefined;
  for (const [pattern, slug] of keywordToSlug) {
    if (pattern.test(question)) return topicExplainers[slug];
  }
  return undefined;
}

export function getMockTutorResponse(req: TutorRequest): TutorResponse {
  switch (req.mode) {
    case "mission_help":
    case "ai_only": {
      const topicHint = (req.missionSlug ? topicExplainers[req.missionSlug] : undefined) ?? matchTopicFromText(req.question);
      const base =
        topicHint ??
        "That's a great question about AI. In short: AI systems learn patterns from data and use them to generate predictions or content — try opening a mission for a focused, step-by-step explanation of this topic.";
      return { answer: MOCK_PREFIX + base, isMock: true };
    }
    case "quiz_explanation": {
      const verdict = req.isCorrect ? "Nice work — that's correct." : "Not quite.";
      const answer = `${verdict} The key idea here: ${req.correctAnswer ?? "review the mission's lesson content"} is the concept being tested. Revisit the mission's lesson section for a fuller explanation, then try a similar question to reinforce it.`;
      return { answer: MOCK_PREFIX + answer, isMock: true };
    }
    case "next_mission": {
      return {
        answer: MOCK_PREFIX + "Nice progress! A good next step is to continue to the next mission in the map — each one builds on the last, so following the suggested order works well.",
        isMock: true,
      };
    }
    default:
      return { answer: MOCK_PREFIX + "I can help explain AI concepts, give hints, or suggest what to learn next — what would you like to know?", isMock: true };
  }
}
