import React from 'react';
import { Character, DimensionId, RetrospectiveResult } from '../types';
import { CATEGORIES, CHARACTERS } from '../data/characters';
import { DIMENSIONS, LOW_QUOTES } from '../data/events';
import { RotateCcw } from 'lucide-react';

interface RetrospectiveProps {
  selectedCandidates: Character[];
  result: RetrospectiveResult;
  dimState: Record<DimensionId, number>;
  onRetry: () => void;
}

export const Retrospective: React.FC<RetrospectiveProps> = ({
  selectedCandidates,
  result,
  dimState,
  onRetry,
}) => {
  // Find candidates not picked
  const unpickedNames = CHARACTERS.filter(
    (c) => !selectedCandidates.some((sc) => sc.id === c.id)
  )
    .map((c) => c.name)
    .join(', ');

  return (
    <section
      id="retrospective-section"
      className="py-16 md:py-20 border-t border-[var(--line)] max-w-4xl mx-auto px-6"
    >
      {/* Crew chips */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {selectedCandidates.map((c) => {
          const cat = CATEGORIES[c.category];
          return (
            <span
              key={c.id}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium border bg-[var(--bg-card)] border-[var(--line)] text-[var(--text-warm)] shadow-sm"
            >
              <span
                className="w-2 h-2 rounded-full flex-none"
                style={{ backgroundColor: cat.color }}
              />
              <span>{c.name}</span>
            </span>
          );
        })}
      </div>

      {/* Newspaper Card */}
      <article className="bg-[var(--bg-card)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="text-xs font-semibold tracking-wider text-[var(--text-faint)] mb-2 flex items-center gap-1.5">
          <span>🗞️ 라라 시민신문 · 정착 10년 특집</span>
        </div>

        <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-serif font-semibold text-[var(--text-warm)] mb-4">
          <span className="text-2xl">{result.type.icon}</span>
          <span>{result.type.label}</span>
        </h2>

        <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
          {result.type.desc}
        </p>

        <blockquote className="font-serif italic text-base sm:text-lg text-[var(--text-warm)] border-l-4 border-[var(--gold)] pl-4 py-1 mt-6 max-w-xl">
          {LOW_QUOTES[result.lowDim]}
        </blockquote>
      </article>

      {/* Dimensions Progress Bars */}
      <div className="mb-10">
        <h3 className="text-sm font-semibold text-[var(--text-faint)] tracking-wide mb-4">
          10년간 이 사회가 쌓아온 것들
        </h3>

        <div className="flex flex-col gap-3.5 bg-[var(--bg-card)] border border-[var(--line)] rounded-2xl p-5 sm:p-6">
          {DIMENSIONS.map((d) => {
            const rawScore = dimState[d.id] || 0;
            // Map score to a readable range [0..10]
            const clamped = Math.max(0, Math.min(10, rawScore + 3));
            const percentage = Math.round((clamped / 10) * 100);

            return (
              <div key={d.id} className="flex items-center gap-3 text-sm">
                <span className="w-32 flex-none text-[var(--text-muted)] flex items-center gap-1.5 text-xs sm:text-sm font-medium">
                  <span>{d.icon}</span>
                  <span>{d.label}</span>
                </span>
                <div className="flex-1 h-2.5 bg-[var(--line)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out bg-[var(--gold)]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs font-semibold text-[var(--text-faint)]">
                  {rawScore > 0 ? `+${rawScore}` : rawScore}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reflection Discussion Box */}
      <div className="bg-[var(--bg-card)] border border-[var(--line)] rounded-2xl p-6 sm:p-7">
        <h3 className="font-serif text-lg font-semibold text-[var(--text-warm)] mb-4">
          함께 이야기 나눠보기
        </h3>
        <ol className="space-y-3 pl-5 list-decimal text-sm sm:text-base text-[var(--text-muted)] leading-relaxed marker:text-[var(--gold)] marker:font-semibold">
          <li>우리가 선택한 4명은 어떤 문제를 가장 잘 해결했나요?</li>
          <li>반대로, 가장 풀기 어려웠던 문제는 무엇이었나요?</li>
          <li>
            선택하지 않은{' '}
            <strong className="text-[var(--text-warm)] font-semibold">
              {unpickedNames}
            </strong>{' '}
            중 누가 있었다면, 어떤 점이 달라졌을까요?
          </li>
        </ol>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-[var(--line)] text-[var(--text-warm)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--text-faint)] transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>다른 4명으로 다시 시작하기</span>
        </button>
      </div>
    </section>
  );
};
