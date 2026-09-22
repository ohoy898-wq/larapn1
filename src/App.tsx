/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { DimensionId, RetrospectiveResult } from './types';
import { CATEGORIES, CHARACTERS } from './data/characters';
import { DIMENSIONS, EVENTS, TYPES } from './data/events';
import { Header } from './components/Header';
import { CandidateCard } from './components/CandidateCard';
import { ConfirmBar } from './components/ConfirmBar';
import { JourneySection } from './components/JourneySection';
import { Retrospective } from './components/Retrospective';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [nudgedId, setNudgedId] = useState<string | null>(null);

  // Journey state
  const [isJourneyStarted, setIsJourneyStarted] = useState<boolean>(false);
  const [eventIndex, setEventIndex] = useState<number>(0);
  const [usedCharIds, setUsedCharIds] = useState<string[]>([]);
  const [dimState, setDimState] = useState<Record<DimensionId, number>>({
    resource: 0,
    fair: 0,
    trust: 0,
    crisis: 0,
    culture: 0,
  });
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Sync theme with document html attribute
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const selectedCandidates = CHARACTERS.filter((c) => selectedIds.includes(c.id));

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    } else {
      if (selectedIds.length >= 4) {
        setNudgedId(id);
        setTimeout(() => setNudgedId(null), 350);
        return;
      }
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const handleToggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleScrollToCandidates = () => {
    const el = document.getElementById('selection-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStartJourney = () => {
    if (selectedIds.length !== 4) return;
    setDimState({ resource: 0, fair: 0, trust: 0, crisis: 0, culture: 0 });
    setEventIndex(0);
    setUsedCharIds([]);
    setIsJourneyStarted(true);
    setIsFinished(false);

    setTimeout(() => {
      const el = document.getElementById('journey-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSelectAction = (charId: string) => {
    const ev = EVENTS[eventIndex];
    const action = ev.actions[charId];
    if (!action) return;

    setDimState((prev) => {
      const updated = { ...prev };
      Object.entries(action.delta || {}).forEach(([k, v]) => {
        const dim = k as DimensionId;
        updated[dim] = (updated[dim] || 0) + (v || 0);
      });
      return updated;
    });

    setUsedCharIds((prev) => [...prev, charId]);
  };

  const handleNextEvent = () => {
    if (eventIndex < EVENTS.length - 1) {
      setEventIndex((prev) => prev + 1);
      setTimeout(() => {
        const el = document.getElementById('journey-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } else {
      setIsFinished(true);
      setTimeout(() => {
        const el = document.getElementById('retrospective-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  const classify = (): RetrospectiveResult => {
    let maxDim: DimensionId = 'resource';
    let maxVal = -Infinity;
    let minDim: DimensionId = 'resource';
    let minVal = Infinity;

    DIMENSIONS.forEach((d) => {
      const v = dimState[d.id] || 0;
      if (v > maxVal) {
        maxVal = v;
        maxDim = d.id;
      }
      if (v < minVal) {
        minVal = v;
        minDim = d.id;
      }
    });

    const spread = maxVal - minVal;
    const type = spread <= 2 ? TYPES.balanced : TYPES[maxDim];

    return {
      type,
      lowDim: minDim,
      maxVal,
      minVal,
    };
  };

  const handleRetry = () => {
    setSelectedIds([]);
    setExpandedId(null);
    setIsJourneyStarted(false);
    setIsFinished(false);
    setEventIndex(0);
    setUsedCharIds([]);
    setDimState({ resource: 0, fair: 0, trust: 0, crisis: 0, culture: 0 });

    setTimeout(() => {
      const el = document.getElementById('selection-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] text-[var(--text-warm)] flex flex-col selection:bg-[var(--gold)] selection:text-[#241A08]">
      {/* Header with hero and scenario */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onScrollToCandidates={handleScrollToCandidates}
      />

      <main className="flex-1 pb-16">
        {/* Candidates Selection Section */}
        <section
          id="selection-section"
          className="pt-16 pb-20 max-w-4xl mx-auto px-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[var(--text-warm)]">
              이 사회를 이끌 4명을 선택하세요
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              각 후보 카드를 누르면 선택되고, &quot;더 알아보기&quot;를 누르면 자세한 이야기를 볼 수 있습니다.
              4명을 채우면 이들과 함께 10년의 여정이 시작됩니다. 앞으로 4번의 사건이 일어나며, 매번 네 명 중 아직 나서지 않은 한 명에게 그 상황을 맡기게 됩니다.
            </p>
          </div>

          {/* Category Legends */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 my-7 p-3.5 px-4 bg-[var(--bg-card)] border border-[var(--line)] rounded-xl">
            {Object.values(CATEGORIES).map((cat) => (
              <span
                key={cat.id}
                className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-none"
                  style={{ backgroundColor: cat.color }}
                />
                <span>{cat.label}</span>
              </span>
            ))}
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHARACTERS.map((char) => (
              <CandidateCard
                key={char.id}
                character={char}
                isSelected={selectedIds.includes(char.id)}
                isExpanded={expandedId === char.id}
                isNudged={nudgedId === char.id}
                onToggleSelect={() => handleToggleSelect(char.id)}
                onToggleExpand={() => handleToggleExpand(char.id)}
              />
            ))}
          </div>
        </section>

        {/* Journey Section (When started and not finished) */}
        {isJourneyStarted && !isFinished && (
          <JourneySection
            selectedCandidates={selectedCandidates}
            eventIndex={eventIndex}
            usedCharIds={usedCharIds}
            dimState={dimState}
            onSelectAction={handleSelectAction}
            onNextEvent={handleNextEvent}
          />
        )}

        {/* Retrospective Section (When finished) */}
        {isFinished && (
          <Retrospective
            selectedCandidates={selectedCandidates}
            result={classify()}
            dimState={dimState}
            onRetry={handleRetry}
          />
        )}
      </main>

      {/* Sticky confirmation bar (visible during selection phase) */}
      {!isJourneyStarted && (
        <ConfirmBar
          selectedCandidates={selectedCandidates}
          onRemove={(id) => handleToggleSelect(id)}
          onConfirm={handleStartJourney}
        />
      )}
    </div>
  );
}
