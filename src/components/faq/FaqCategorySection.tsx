"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import type { FaqCategory } from "@/lib/faq-data";

export default function FaqCategorySection({ id, label, questions }: FaqCategory) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id={id} className="scroll-mt-20 lg:scroll-mt-24 py-12 lg:py-16 px-5 lg:px-8 bg-[#fde8d9]">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 lg:gap-10">
        {/* 見出し */}
        <div className="flex items-center gap-2 justify-center">
          <span className="text-3xl lg:text-[41px]">🐾</span>
          <h2
            className="text-2xl lg:text-[30px] font-bold text-brand"
            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            {label}
          </h2>
        </div>

        {/* アコーディオンリスト */}
        <div className="flex flex-col gap-3 lg:gap-4">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="rounded-2xl bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 text-left px-5 py-4 lg:px-6 lg:py-5 cursor-pointer"
                >
                  <span className="flex items-start gap-2 lg:gap-3 text-base text-gray-900 font-bold leading-relaxed">
                    <span className="text-brand shrink-0">Q.</span>
                    <span>{item.q}</span>
                  </span>
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand text-white shrink-0">
                    <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} className="w-3 h-3" />
                  </span>
                </button>

                {isOpen && (
                  <>
                    <div className="border-t border-brand" />
                    <div className="flex items-start gap-2 lg:gap-3 text-sm lg:text-base text-gray-900 leading-relaxed px-5 py-4 lg:px-6 lg:py-5">
                      <span className="text-[#164FF9] font-bold shrink-0">A.</span>
                      <span>{item.a}</span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
