"use client";

import {
  Check,
  MessageSquareText,
  Minus,
  Sparkles,
  SquareCheckBig,
} from "lucide-react";

const reviewRows = [
  {
    name: "[AWS:Claude-Haiku-4.5] - Su...",
    date: "Aug 15 2026, 09:52 AM",
    weight: "80%",
    minScore: "75.00",
    score: "92.00",
    result: "Passed",
    resultTone: "passed" as const,
    comments: 0,
    icon: "spark" as const,
  },
  {
    name: "[qwen3.5] - AI Vulnerabilities ...",
    date: "Aug 15 2026, 09:51 AM",
    weight: "10%",
    minScore: "80.00",
    score: "75.00",
    result: "Failed",
    resultTone: "failed" as const,
    comments: 0,
    icon: "check" as const,
  },
  {
    name: "[qwen3.5] - SAST semgrep/op...",
    date: "Aug 15 2026, 09:52 AM",
    weight: "10%",
    minScore: "80.00",
    score: "28.00",
    result: "Failed",
    resultTone: "failed" as const,
    comments: 0,
    icon: "check" as const,
  },
  {
    name: "Virus Scan",
    date: "Aug 15 2026, 09:48 AM",
    weight: "0%",
    minScore: "100.00",
    score: "100.00",
    result: "Passed",
    resultTone: "passed" as const,
    comments: 0,
    icon: "check" as const,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f3efe6] px-0 py-0 text-[#1b1d29]">
      <div className="overflow-hidden border-y border-[#bfc4c0] bg-white">
        <table className="w-full border-separate border-spacing-0 text-left text-[18px] leading-none text-[#1c1d29]">
          <thead>
            <tr className="bg-[#f7f5f1] text-[17px] font-semibold text-[#1d1f2a]">
              <th className="border-b border-[#bfc4c0] px-4 py-4 text-left font-semibold tracking-[-0.02em]">
                AI Reviewer
              </th>
              <th className="border-b border-[#bfc4c0] px-4 py-4 text-left font-semibold tracking-[-0.02em]">
                Review Date
              </th>
              <th className="border-b border-[#bfc4c0] px-4 py-4 text-left font-semibold tracking-[-0.02em]">
                Weight
              </th>
              <th className="border-b border-[#bfc4c0] px-4 py-4 text-left font-semibold tracking-[-0.02em]">
                Min Score
              </th>
              <th className="border-b border-[#bfc4c0] px-4 py-4 text-left font-semibold tracking-[-0.02em]">
                Score
              </th>
              <th className="border-b border-[#bfc4c0] px-4 py-4 text-left font-semibold tracking-[-0.02em]">
                Result
              </th>
              <th className="border-b border-[#bfc4c0] px-4 py-4 text-right font-semibold tracking-[-0.02em]">
                Comments
              </th>
            </tr>
          </thead>

          <tbody>
            {reviewRows.map((row) => (
              <tr key={row.name} className="border-b border-[#bfc4c0] bg-white">
                <td className="border-b border-[#bfc4c0] px-4 py-5 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                      {row.icon === "spark" ? (
                        <Sparkles
                          className="h-4 w-4 text-[#1f7a88]"
                          strokeWidth={2.2}
                        />
                      ) : (
                        <SquareCheckBig
                          className="h-4 w-4 text-[#2f9d7b]"
                          strokeWidth={2.2}
                        />
                      )}
                    </div>
                    <span className="truncate text-[20px] font-medium tracking-[-0.03em] text-[#1c1d29]">
                      {row.name}
                    </span>
                  </div>
                </td>

                <td className="border-b border-[#bfc4c0] px-4 py-5 text-[20px] font-normal tracking-[-0.02em] text-[#1e1f2a]">
                  {row.date}
                </td>

                <td className="border-b border-[#bfc4c0] px-4 py-5 text-[20px] font-normal tracking-[-0.02em] text-[#1e1f2a]">
                  {row.weight}
                </td>

                <td className="border-b border-[#bfc4c0] px-4 py-5 text-[20px] font-normal tracking-[-0.02em] text-[#1e1f2a]">
                  {row.minScore}
                </td>

                <td className="border-b border-[#bfc4c0] px-4 py-5 text-[20px] font-normal tracking-[-0.02em] text-[#1e1f2a]">
                  {row.score}
                </td>

                <td className="border-b border-[#bfc4c0] px-4 py-5 align-middle">
                  {row.resultTone === "passed" ? (
                    <div className="flex items-center gap-3 text-[19px] font-medium tracking-[-0.02em] text-[#2f9d7b]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#5ca77a] bg-[#f4fbf7]">
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                      <span className="text-[#2f9d7b]">Passed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-[19px] font-medium tracking-[-0.02em] text-[#d75d5d]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d75d5d] bg-[#fff5f5]">
                        <Minus className="h-4 w-4" strokeWidth={3} />
                      </span>
                      <span className="text-[#d75d5d]">Failed</span>
                    </div>
                  )}
                </td>

                <td className="border-b border-[#bfc4c0] px-4 py-5 text-right align-middle">
                  <div className="flex items-center justify-end gap-2 text-[#2a8bdb]">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#7aa5d8] bg-white">
                      <MessageSquareText className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="min-w-5 text-center text-[18px] font-medium text-[#2a8bdb]">
                      {row.comments}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
