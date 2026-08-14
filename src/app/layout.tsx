import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";

export const metadata: Metadata = {
  title: "AI Learning Adventure",
  description:
    "A guided, gamified way to learn AI basics — missions, quizzes, flashcards, and an AI tutor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-parchment text-ink">
        <NavBar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
