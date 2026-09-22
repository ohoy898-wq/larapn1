import React from 'react';
import { Character } from '../types';
import { CATEGORIES } from '../data/characters';
import { Rocket, X } from 'lucide-react';

interface ConfirmBarProps {
  selectedCandidates: Character[];
  onRemove: (id: string) => void;
  onConfirm: () => void;
}

export const ConfirmBar: React.FC<ConfirmBarProps> = ({
  selectedCandidates,
  onRemove,
  onConfirm,
}) => {
  const isReady = selectedCandidates.length === 4;

  return (
    <aside
      id="confirm-bar"
      aria-label="후보 선택 확인 바"
      className="sticky bottom-0 left-0 right-0 z-30 px-6 py-4 bg-[color-mix(in_srgb,var(--bg-deep)_90%,transparent)] backdrop-blur-md border-t border-[var(--line)] shadow-2xl transition-all"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">
            <strong className="text-base text-[var(--text-warm)] font-bold">
              {selectedCandidates.length}
            </strong>{' '}
            / 4명 선택됨
          </span>

          {/* Miniature chips for selected members */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {selectedCandidates.map((c) => {
              const cat = CATEGORIES[c.category];
              return (
                <span
                  key={c.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--bg-card)] border border-[var(--line)] text-[var(--text-warm)] shadow-sm"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-none"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span>{c.name}</span>
                  <button
                    type="button"
                    onClick={() => onRemove(c.id)}
                    className="ml-0.5 text-[var(--text-faint)] hover:text-[var(--text-warm)] transition-colors cursor-pointer"
                    aria-label={`${c.name} 선택 취소`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={onConfirm}
          disabled={!isReady}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[14.5px] font-semibold transition-all duration-200 cursor-pointer ${
            isReady
              ? 'bg-[var(--gold)] text-[#241A08] shadow-[0_4px_16px_rgba(232,169,74,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(232,169,74,0.4)] active:translate-y-0'
              : 'opacity-40 bg-[var(--bg-card)] text-[var(--text-faint)] border border-[var(--line)] cursor-not-allowed'
          }`}
        >
          <Rocket className="w-4 h-4" />
          <span>이 4명과 라라 B-2로 출발하기</span>
        </button>
      </div>
    </aside>
  );
};
