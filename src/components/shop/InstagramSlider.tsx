"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

interface Post {
  fieldId: string;
  instagramPosts: string;
}

const AUTO_INTERVAL = 5000;

function getEmbedUrl(html: string): string | null {
  const match = html.match(/instagram\.com\/p\/([A-Za-z0-9_-]+)/);
  return match ? `https://www.instagram.com/p/${match[1]}/embed/` : null;
}

function EmbedFrame({ html }: { html: string }) {
  const url = getEmbedUrl(html);
  if (!url) return null;
  return (
    <iframe
      src={url}
      className="w-full rounded-xl border border-gray-200"
      style={{ height: "480px" }}
      frameBorder={0}
      scrolling="no"
      loading="lazy"
      title="Instagram post"
    />
  );
}

export default function InstagramSlider({ posts }: { posts: Post[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (posts.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % posts.length);
    }, AUTO_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [posts.length]);

  if (!posts || posts.length === 0) return null;

  const go = (index: number) => {
    setCurrent((index + posts.length) % posts.length);
    if (posts.length <= 1) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % posts.length);
    }, AUTO_INTERVAL);
  };

  const showCount = Math.min(2, posts.length);
  const pcIndices = Array.from({ length: showCount }, (_, i) => (current + i) % posts.length);

  return (
    <div>
      <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faInstagram} className="text-pink-500" />
        Instagram
      </h2>

      {/* Mobile: 1枚ずつ */}
      <div className="lg:hidden relative">
        <EmbedFrame html={posts[current].instagramPosts} />
        {posts.length > 1 && (
          <>
            <button
              onClick={() => go(current - 1)}
              className="absolute left-0 top-1/3 -translate-x-2 w-8 h-8 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center z-10"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-xs text-gray-600" />
            </button>
            <button
              onClick={() => go(current + 1)}
              className="absolute right-0 top-1/3 translate-x-2 w-8 h-8 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center z-10"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-xs text-gray-600" />
            </button>
          </>
        )}
      </div>

      {/* PC: 2枚同時表示 */}
      <div className="hidden lg:block relative">
        <div className={`grid gap-4 ${showCount > 1 ? "grid-cols-2" : ""}`}>
          {pcIndices.map((idx, i) => (
            <EmbedFrame key={`${idx}-${i}`} html={posts[idx].instagramPosts} />
          ))}
        </div>
        {posts.length > 1 && (
          <>
            <button
              onClick={() => go(current - 1)}
              className="absolute -left-4 top-1/3 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center z-10 hover:bg-gray-50 transition"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-sm text-gray-600" />
            </button>
            <button
              onClick={() => go(current + 1)}
              className="absolute -right-4 top-1/3 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center z-10 hover:bg-gray-50 transition"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-sm text-gray-600" />
            </button>
          </>
        )}
      </div>

      {posts.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-5 bg-brand" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
