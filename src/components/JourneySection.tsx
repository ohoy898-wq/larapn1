import React, { useState } from 'react';
import { Character, DimensionId, GameEvent } from '../types';
import { CATEGORIES } from '../data/characters';
import { EVENTS } from '../data/events';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface JourneySectionProps {
  selectedCandidates: Character[];
  eventIndex: number;
  usedCharIds: string[];
  dimState: Record<DimensionId, number>;
  onSelectAction: (charId: string) => void;
  onNextEvent: () => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({
  selectedCandidates,
  eventIndex,
  usedCharIds,
  onSelectAction,
  onNextEvent,
}) => {
  const currentEvent: GameEvent = EVENTS[eventIndex];
  const [pickedCharId, setPickedCharId] = useState<string | null>(null);

  // Available candidates for this event (those in the crew who haven't acted yet)
  const availableCandidates = selectedCandidates.filter(
    (c) => !usedCharIds.includes(c.id)
  );

  const handlePick = (charId: string) => {
    if (pickedCharId) return;
    setPickedCharId(charId);
    onSelectAction(charId);
  };

  const handleNext = () => {
    setPickedCharId(null);
    onNextEvent();
  };

  const pickedAction = pickedCharId ? currentEvent.actions[pickedCharId] : null;

  return (
    <section
      id="journey-section"
      className="py-16 md:py-20 border-t border-[var(--line)] max-w-4xl mx-auto px-6"
    >
      {/* Crew status chips */}
      <div className="flex flex-wrap gap-2.5 mb-7">
        {selectedCandidates.map((c) => {
          const isUsed = usedCharIds.includes(c.id);
          const isJustPicked = pickedCharId === c.id;
          const cat = CATEGORIES[c.category];
          const effectivelyUsed = isUsed || isJustPicked;

          return (
            <span
              key={c.id}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
                effectivelyUsed
                  ? 'opacity-50 bg-[var(--bg-chip)] border-[var(--line)] text-[var(--text-muted)]'
                  : 'bg-[var(--bg-chip)] border-[var(--line)] text-[var(--text-warm)] shadow-sm'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full flex-none transition-colors"
                style={{ backgroundColor: effectivelyUsed ? 'var(--text-faint)' : cat.color }}
              />
              <span>{c.name}</span>
              {effectivelyUsed && (
                <span className="text-xs text-[var(--text-faint)]">· 활약 완료</span>
              )}
            </span>
          );
        })}
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 mb-8" aria-label="진행 단계">
        {EVENTS.map((ev, idx) => {
          let dotClass = 'bg-[var(--line)]';
          if (idx < eventIndex) {
            dotClass = 'bg-[var(--sage)]';
          } else if (idx === eventIndex) {
            dotClass = 'bg-[var(--gold)] shadow-[0_0_8px_rgba(232,169,74,0.4)]';
          }
          return (
            <div
              key={ev.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === eventIndex ? 'w-10' : 'w-7'
              } ${dotClass}`}
            />
          );
        })}
      </div>

      {/* Event Meta */}
      <div className="text-xs sm:text-sm font-medium text-[var(--text-faint)] tracking-wide mb-2.5">
        {currentEvent.year} · 사건 {eventIndex + 1} / {EVENTS.length}
      </div>

      {/* Event Title */}
      <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[var(--text-warm)] mb-4">
        {currentEvent.title}
      </h2>

      {/* Situation */}
      <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8">
        {currentEvent.situation}
      </p>

      {/* Action Prompt */}
      <div className="text-sm font-semibold text-[var(--text-faint)] mb-4">
        {availableCandidates.length > 1
          ? '이 상황, 누구에게 맡길까요?'
          : `이제 남은 사람은 ${availableCandidates[0]?.name}뿐입니다.`}
      </div>

      {/* Action Options */}
      <div className="flex flex-col gap-3 max-w-2xl">
        {availableCandidates.map((c) => {
          const cat = CATEGORIES[c.category];
          const isPicked = pickedCharId === c.id;
          const isOtherPicked = pickedCharId !== null && !isPicked;

          return (
            <button
              key={c.id}
              type="button"
              disabled={pickedCharId !== null}
              onClick={() => handlePick(c.id)}
              className={`group text-left p-4 sm:p-5 rounded-xl border-[1.5px] transition-all flex flex-col gap-1 cursor-pointer ${
                isPicked
                  ? 'bg-[var(--bg-card-hover)] shadow-lg'
                  : isOtherPicked
                  ? 'opacity-40 bg-[var(--bg-card)] border-[var(--line)] cursor-default'
                  : 'bg-[var(--bg-card)] border-[var(--line)] hover:bg-[var(--bg-card-hover)]'
              }`}
              style={{
                borderColor: isPicked ? cat.color : undefined,
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-serif text-base sm:text-lg font-semibold"
                  style={{ color: cat.color }}
                >
                  {c.name}
                </span>
                {isPicked && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--gold)]">
                    <CheckCircle2 className="w-4 h-4" />
                    선택됨
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {currentEvent.reactions[c.id]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Consequence Box after action selected */}
      {pickedAction && (
        <div className="mt-6 max-w-2xl bg-[var(--bg-chip)] border-l-4 border-[var(--gold)] rounded-r-xl p-5 shadow-sm animate-fade-in">
          <div className="text-xs font-semibold text-[var(--gold)] uppercase tracking-wider mb-1.5">
            사건 해결 결과
          </div>
          <p className="text-[15px] text-[var(--text-warm)] leading-relaxed">
            {pickedAction.outcome}
          </p>

          <button
            type="button"
            onClick={handleNext}
            className="mt-5 inline-flex items-center gap-2 bg-[var(--gold)] text-[#241A08] px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>
              {eventIndex < EVENTS.length - 1 ? '다음 이야기로' : '10년 후, 우리 사회는'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
};
