"use client";

import { useState } from "react";
import { submitSuggestion } from "@/app/actions/suggestions";

export function SuggestionForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitSuggestion(formData);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Thanks for your suggestion! I'll review it soon." });
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsOpen(false), 2000);
    }

    setIsSubmitting(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all"
        style={{
          background: "linear-gradient(120deg, var(--accent) 0%, var(--accent-strong) 60%)",
          color: "var(--accent-foreground)",
          boxShadow: "var(--shadow)",
        }}
      >
        Suggest a Project
      </button>
    );
  }

  return (
    <div
      className="rounded-2xl border p-6 shadow-lg"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--card)",
        boxShadow: "var(--shadow)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          Suggest a Project
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-sm"
          style={{ color: "var(--muted)" }}
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm mb-1" style={{ color: "var(--muted)" }}>
            Name (optional)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-lg border px-3 py-2 text-sm"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--foreground)",
            }}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm mb-1" style={{ color: "var(--muted)" }}>
            Email (optional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border px-3 py-2 text-sm"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--foreground)",
            }}
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="suggestion" className="block text-sm mb-1" style={{ color: "var(--muted)" }}>
            What should I build? *
          </label>
          <textarea
            id="suggestion"
            name="suggestion"
            required
            rows={4}
            className="w-full rounded-lg border px-3 py-2 text-sm"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--foreground)",
            }}
            placeholder="Describe the project idea..."
          />
        </div>

        {message && (
          <p
            className="text-sm"
            style={{ color: message.type === "error" ? "var(--accent)" : "var(--accent-strong)" }}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50"
          style={{
            background: "linear-gradient(120deg, var(--accent) 0%, var(--accent-strong) 60%)",
            color: "var(--accent-foreground)",
            boxShadow: "var(--shadow)",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Suggestion"}
        </button>
      </form>
    </div>
  );
}
