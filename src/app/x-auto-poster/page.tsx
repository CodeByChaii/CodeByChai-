"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

const CATEGORIES = [
  { id: "crypto", name: "Crypto" },
  { id: "vibecoding", name: "Vibe Coding" },
  { id: "both", name: "Both" },
];

export default function XAutoPosterPage() {
  const [category, setCategory] = useState("crypto");
  const [topic, setTopic] = useState("");
  const [generatedPost, setGeneratedPost] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/x-auto-poster/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, topic: topic || null }),
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedPost(data.post.content);
      } else {
        alert("Failed to generate post");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">X Auto Poster</h1>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border transition"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Description */}
          <div className="rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
            <h2 className="text-xl font-semibold mb-3">Generate AI-Powered Tweets</h2>
            <p style={{ color: "var(--muted)" }}>
              Automatically generate engaging crypto and coding content for X (Twitter) using AI. Select a category and
              optionally provide a topic to get started.
            </p>
          </div>

          {/* Generator Form */}
          <div className="rounded-xl border p-6 space-y-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-semibold mb-3">Category</label>
              <div className="flex gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className="rounded-full px-4 py-2 text-sm font-semibold border transition"
                    style={{
                      borderColor: category === cat.id ? "var(--accent)" : "var(--border)",
                      backgroundColor: category === cat.id ? "var(--accent-soft)" : "var(--surface)",
                      color: category === cat.id ? "var(--accent)" : "var(--foreground)",
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">Topic (Optional)</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Bitcoin halving, React hooks, etc."
                className="w-full rounded-lg border px-4 py-2"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)",
                  color: "var(--foreground)",
                }}
              />
            </div>

            {/* Generate Button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full rounded-full px-6 py-3 text-sm font-semibold transition"
              style={{
                background: "linear-gradient(120deg, var(--accent) 0%, var(--accent-strong) 60%)",
                color: "var(--accent-foreground)",
                opacity: isLoading ? 0.6 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Generating..." : "Generate Post"}
            </button>
          </div>

          {/* Generated Post */}
          {generatedPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border p-6 space-y-4"
              style={{ borderColor: "var(--accent)", backgroundColor: "var(--card)" }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Generated Post</h3>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  {generatedPost.length} characters
                </span>
              </div>
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "var(--surface)", color: "var(--foreground)" }}
              >
                <p className="whitespace-pre-wrap">{generatedPost}</p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(generatedPost)}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--surface)",
                    color: "var(--foreground)",
                  }}
                >
                  📋 Copy to Clipboard
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(generatedPost)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition"
                  style={{
                    background: "linear-gradient(120deg, var(--accent) 0%, var(--accent-strong) 60%)",
                    color: "var(--accent-foreground)",
                  }}
                >
                  🐦 Post to X
                </a>
              </div>
            </motion.div>
          )}

          {/* Features List */}
          <div className="rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
            <h3 className="text-lg font-semibold mb-4">Coming Soon</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--muted)" }}>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--accent)" }}>✓</span>
                <span>AI-powered content generation using OpenAI</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--accent)" }}>✓</span>
                <span>Automatic posting with scheduling</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--accent)" }}>✓</span>
                <span>Thread generation support</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--accent)" }}>✓</span>
                <span>Crypto news summarization</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "var(--accent)" }}>✓</span>
                <span>Duplicate prevention and fact-checking</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
