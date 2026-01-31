"use client";

import { useState } from "react";
import Link from "next/link";
import "./x-auto-poster.css";

type Post = {
  id: number;
  content: string;
  category: string;
  charCount: number;
  createdAt: string;
  type?: string;
  stat?: { past: string; now: string; change: string };
};

const CATEGORIES = [
  { id: "crypto", name: "Crypto", icon: "💰" },
  { id: "vibecoding", name: "Vibe Coding", icon: "💻" },
  { id: "both", name: "Both", icon: "🔥" },
];

export default function XAutoPosterPage() {
  const [category, setCategory] = useState("crypto");
  const [topic, setTopic] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all");

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
        setPosts([data.post, ...posts]);
        showToast("Post generated! 🎯", "success");
      } else {
        showToast(data.error || "Generation failed", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Network error", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = (id: number) => {
    if (!confirm("Delete this post?")) return;
    setPosts(posts.filter((p) => p.id !== id));
    showToast("Post deleted", "success");
  };

  const copyPost = (content: string) => {
    navigator.clipboard.writeText(content);
    showToast("Copied to clipboard! 📋", "success");
  };

  const showToast = (message: string, type: string) => {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const filteredPosts = posts.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  const stats = {
    total: posts.length,
    crypto: posts.filter((p) => p.category === "crypto").length,
    vibe: posts.filter((p) => p.category === "vibecoding").length,
  };

  return (
    <div className="x-auto-poster-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <h1>
              <span>X Auto-Poster</span> Dashboard
            </h1>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat">
              <div className="stat-value">{stats.crypto}</div>
              <div className="stat-label">Crypto</div>
            </div>
            <div className="stat">
              <div className="stat-value">{stats.vibe}</div>
              <div className="stat-label">Vibe</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="main-layout">
          {/* Sidebar - Controls */}
          <aside className="sidebar">
            <div className="card">
              <h3 className="card-title">⚡ Quick Generate</h3>

              {/* Category Selection */}
              <div className="category-btns">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`btn ${category === cat.id ? "btn-primary" : "btn-secondary"}`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>

              {/* Topic Input */}
              <label>
                Topic (optional)
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Bitcoin halving, React hooks..."
                  className="topic-input"
                />
              </label>

              {/* Generate Button */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isLoading}
                className="btn btn-generate"
              >
                {isLoading ? "⏳ Generating..." : "✨ Generate Post"}
              </button>
            </div>

            <div className="card">
              <h3 className="card-title">🎯 Coming Soon</h3>
              <div className="coming-soon-list">
                <div>🧵 Thread generation</div>
                <div>📰 News summarization</div>
                <div>📊 Stats comparisons</div>
                <div>📅 Auto scheduling</div>
                <div>🔄 Duplicate prevention</div>
              </div>
            </div>

            <div className="card">
              <Link href="/" className="btn btn-secondary">
                ← Back to Portfolio
              </Link>
            </div>
          </aside>

          {/* Main Content - Generated Posts */}
          <main className="main-content">
            <div className="filter-tabs">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`filter-tab ${filter === "all" ? "active" : ""}`}
              >
                All ({stats.total})
              </button>
              <button
                type="button"
                onClick={() => setFilter("crypto")}
                className={`filter-tab ${filter === "crypto" ? "active" : ""}`}
              >
                💰 Crypto ({stats.crypto})
              </button>
              <button
                type="button"
                onClick={() => setFilter("vibecoding")}
                className={`filter-tab ${filter === "vibecoding" ? "active" : ""}`}
              >
                💻 Vibe ({stats.vibe})
              </button>
            </div>

            <div className="posts-grid">
              {filteredPosts.length === 0 ? (
                <div className="empty-state">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <h3>No posts yet</h3>
                  <p>Click "Generate Post" to create your first tweet!</p>
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const charClass =
                    post.charCount > 280 ? "danger" : post.charCount > 250 ? "warning" : "";
                  const date = new Date(post.createdAt).toLocaleString();

                  return (
                    <div key={post.id} className="post-card">
                      <div className="post-header">
                        <div className="post-meta">
                          <span className={`post-category ${post.category}`}>{post.category}</span>
                          <span className="post-type">
                            {post.stat ? "📊 Stats" : "✨ Original"}
                          </span>
                        </div>
                        <div className="post-actions">
                          <button
                            type="button"
                            onClick={() => copyPost(post.content)}
                            className="post-action"
                            title="Copy"
                          >
                            📋
                          </button>
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.content)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="post-action"
                            title="Post to X"
                          >
                            🐦
                          </a>
                          <button
                            type="button"
                            onClick={() => deletePost(post.id)}
                            className="post-action delete"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      <div className="post-content">{post.content}</div>

                      <div className="post-footer">
                        <span>{date}</span>
                        <span className={`char-count ${charClass}`}>
                          {post.charCount}/280 chars
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
