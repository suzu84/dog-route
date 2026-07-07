"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const SESSION_KEY = "dogroute_intro_shown";

// 左下から画面中央へ歩く足跡（左右交互にオフセット）。最後の1つは中央で拡大する。
const PAWS = Array.from({ length: 8 }).map((_, i) => {
  const isFinal = i === 7;
  if (isFinal) {
    return { left: 50, top: 50, rotate: 0, delay: 0.1 + i * 0.13 };
  }
  const t = i / 7;
  const side = i % 2 === 0 ? -1 : 1;
  return {
    left: 18 + t * 32 + side * 3,
    top: 82 - t * 32 + side * 2,
    rotate: side * 12,
    delay: 0.1 + i * 0.13,
  };
});

export default function IntroAnimation() {
  // SSR時点からオーバーレイを描画し、初回paintでTOPが一瞬見えるのを防ぐ
  const [show, setShow] = useState(true);

  useEffect(() => {
    // 表示済み or 動きを控えたい設定ならすぐに閉じる
    if (
      sessionStorage.getItem(SESSION_KEY) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShow(false);
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="intro-overlay" aria-hidden="true">
      {PAWS.map((p, i) => {
        const isFinal = i === PAWS.length - 1;
        return (
          <span
            key={i}
            className={isFinal ? "intro-paw-final" : "intro-paw"}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              ["--paw-rot" as string]: `${p.rotate}deg`,
              animationDelay: `${p.delay}s`,
            }}
          >
            <FontAwesomeIcon icon={faPaw} />
          </span>
        );
      })}
    </div>
  );
}
