"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./art-gallery.css";

export default function ArtGalleryPage() {
  const [revealed, setRevealed] = useState(0);
  const fullText = "COMING SOON";

  useEffect(() => {
    if (revealed >= fullText.length) return;
    const delay = revealed === 0 ? 250 : 60 + Math.random() * 120;
    const t = setTimeout(() => setRevealed((r) => r + 1), delay);
    return () => clearTimeout(t);
  }, [revealed, fullText.length]);

  return (
    <main className="art-gallery">
      <div className="art-gallery__noise" aria-hidden="true" />
      <div className="art-gallery__scan" aria-hidden="true" />

      <div className="art-gallery__inner">
        <div className="art-gallery__meta">
          <span className="art-gallery__tag">// EXHIBIT 404</span>
          <span className="art-gallery__pulse" aria-hidden="true" />
        </div>

        <h1 className="art-gallery__title" aria-label={fullText}>
          {fullText.split("").map((ch, i) => (
            <span
              key={i}
              className={`art-gallery__char ${
                i < revealed ? "is-in" : "is-out"
              } ${ch === " " ? "is-space" : ""}`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
          <span className="art-gallery__cursor" aria-hidden="true" />
        </h1>

        <p className="art-gallery__sub">
          Curating frames, palettes, and motion. Stand by.
        </p>

        <div className="art-gallery__bar" aria-hidden="true">
          <div className="art-gallery__bar-fill" />
        </div>

        <Link href="/" className="art-gallery__back">
          ← BACK TO BASE
        </Link>
      </div>
    </main>
  );
}