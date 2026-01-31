"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const constraints = { video: true, audio: true } as const;

type RecordingState = "idle" | "recording" | "stopped" | "unsupported" | "error";

const pickMimeType = () => {
  const candidates = [
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
  ];
  for (const mime of candidates) {
    if ((window as any).MediaRecorder?.isTypeSupported?.(mime)) return mime;
  }
  return undefined;
};

export default function ScreenRecPage() {
  useEffect(() => {
    document.title = "CodeByChai | Record - Screen Capture";
  }, []);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<BlobPart[]>([]);
  const [status, setStatus] = useState<RecordingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [chosenMime, setChosenMime] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!navigator.mediaDevices?.getDisplayMedia || !window.MediaRecorder) {
      setStatus("unsupported");
    }
  }, []);

  useEffect(() => {
    return () => {
      mediaStream?.getTracks().forEach((track) => track.stop());
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [mediaStream, downloadUrl]);

  const startCapture = useCallback(async () => {
    setError(null);
    setDownloadUrl(null);
    try {
      const mimeType = pickMimeType();
      setChosenMime(mimeType);
      if (!mimeType) {
        setStatus("unsupported");
        setError("This browser cannot record to WebM. Try Chromium/Edge or download the desktop build.");
        return;
      }
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => undefined);
      }
      const rec = new MediaRecorder(stream, { mimeType });
      const localChunks: BlobPart[] = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) localChunks.push(e.data);
      };
      rec.onstop = () => {
        const blob = new Blob(localChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setChunks([]);
        setDownloadUrl(url);
        setStatus("stopped");
      };
      rec.start();
      setRecorder(rec);
      setChunks(localChunks);
      setStatus("recording");
    } catch (err) {
      console.error(err);
      setError("Unable to start capture. Please allow screen recording.");
      setStatus("error");
    }
  }, []);

  const stopCapture = useCallback(() => {
    recorder?.stop();
    mediaStream?.getTracks().forEach((track) => track.stop());
  }, [recorder, mediaStream]);

  const reset = useCallback(() => {
    setChunks([]);
    setDownloadUrl(null);
    setStatus("idle");
    setError(null);
    setChosenMime(undefined);
  }, []);

  return (
    <main
      className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]"
      style={{ padding: "5rem 1.25rem" }}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-sm" style={{ color: "var(--muted)" }}>
            ← Back home
          </Link>
          <div className="flex flex-col gap-3">
            <p
              className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide"
              style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--border)" }}
            >
              CaptureCanvas
            </p>
            <h1 className="text-4xl font-extrabold sm:text-5xl">Record your screen in-browser</h1>
            <p className="max-w-3xl text-lg" style={{ color: "var(--muted)" }}>
              Capture your screen with audio, preview instantly, and download the clip. No install required. Desktop build is available for offline use.
            </p>
            <div className="flex flex-wrap gap-3 text-sm" style={{ color: "var(--muted)" }}>
              <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1" style={{ color: "var(--accent)" }}>Web</span>
              <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1" style={{ color: "var(--accent)" }}>MediaRecorder</span>
              <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1" style={{ color: "var(--accent)" }}>TypeScript</span>
            </div>
            <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Tip: Use Chromium/Edge for best compatibility. Downloads are WebM; play them in-browser or with VLC.
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <motion.div
            className="relative overflow-hidden rounded-2xl border shadow-xl"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", boxShadow: "var(--shadow)" }}
            whileHover={{ y: -2 }}
          >
              <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "var(--accent-strong)" }} />
              </div>
                <div className="text-right">
                  <span className="block text-xs" style={{ color: "var(--muted)" }}>
                    {status === "recording" ? "Recording…" : status === "stopped" ? "Ready to download" : status === "unsupported" ? "Not supported" : "Idle"}
                  </span>
                  {chosenMime && (
                    <span className="block text-[10px]" style={{ color: "var(--muted)" }}>
                      Format: {chosenMime}
                    </span>
                  )}
                </div>
            </div>

            <div className="p-4">
              <div
                className="relative aspect-video overflow-hidden rounded-lg border"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
              >
                <video ref={videoRef} className="h-full w-full object-contain" muted playsInline />
                {status === "idle" && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ color: "var(--muted)" }}>
                    Start capture to preview your screen here.
                  </div>
                )}
                {status === "stopped" && downloadUrl && (
                  <video
                    className="absolute inset-0 h-full w-full object-contain"
                    src={downloadUrl}
                    controls
                    autoPlay
                    muted
                    playsInline
                    style={{ backgroundColor: "var(--surface)" }}
                  />
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {status !== "recording" && status !== "unsupported" && (
                  <button
                    type="button"
                    onClick={startCapture}
                    className="rounded-full px-4 py-2 text-sm font-semibold"
                    style={{
                      background: "linear-gradient(120deg, var(--accent) 0%, var(--accent-strong) 60%)",
                      color: "var(--accent-foreground)",
                      boxShadow: "var(--shadow)",
                    }}
                  >
                    Start capture
                  </button>
                )}
                {status === "recording" && (
                  <button
                    type="button"
                    onClick={stopCapture}
                    className="rounded-full px-4 py-2 text-sm font-semibold"
                    style={{
                      backgroundColor: "var(--surface)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    Stop & save
                  </button>
                )}
                {downloadUrl && (
                  <>
                    <a
                      href={downloadUrl}
                      download="screenrec.webm"
                      className="rounded-full px-4 py-2 text-sm font-semibold border"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--foreground)",
                        backgroundColor: "var(--surface)",
                      }}
                    >
                      Download clip (WebM)
                    </a>
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full px-4 py-2 text-sm font-semibold"
                      style={{
                        backgroundColor: "var(--surface)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      Open in browser
                    </a>
                  </>
                )}
                {status === "stopped" && (
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full px-4 py-2 text-sm font-semibold"
                    style={{
                      backgroundColor: "var(--surface)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>
              {status === "unsupported" && (
                <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
                  Your browser does not support in-browser screen recording. Use Chromium/Edge or download the desktop build.
                </p>
              )}
              {error && (
                <p className="mt-3 text-sm" style={{ color: "var(--accent)" }}>
                  {error}
                </p>
              )}
            </div>
          </motion.div>

          <div className="space-y-4">
            <div className="rounded-2xl border p-5 shadow-lg" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", boxShadow: "var(--shadow)" }}>
              <h2 className="text-xl font-semibold">Desktop build</h2>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                Prefer offline recording or higher bitrates? Download the desktop build for full-screen capture and file management.
              </p>
              <a
                href="https://codebychai.com/downloads/screenrec.zip"
                className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  background: "linear-gradient(120deg, var(--accent) 0%, var(--accent-strong) 60%)",
                  color: "var(--accent-foreground)",
                  boxShadow: "var(--shadow)",
                }}
              >
                Download desktop build
              </a>
            </div>

            <div className="rounded-2xl border p-5 shadow-lg" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", boxShadow: "var(--shadow)" }}>
              <h3 className="text-lg font-semibold">How it works</h3>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--muted)" }}>
                <li>Uses your browser’s screen capture API (no uploads).</li>
                <li>Audio capture supported when your browser allows it.</li>
                <li>Recordings stay local; download the WebM clip directly.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
