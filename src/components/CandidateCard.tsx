import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Character } from '../types';
import { CATEGORIES } from '../data/characters';
import { CharacterIcon } from './CharacterIcon';

interface CandidateCardProps {
  character: Character;
  isSelected: boolean;
  isExpanded: boolean;
  isNudged: boolean;
  onToggleSelect: () => void;
  onToggleExpand: () => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  character,
  isSelected,
  isExpanded,
  isNudged,
  onToggleSelect,
  onToggleExpand,
}) => {
  const cat = CATEGORIES[character.category];

  return (
    <article
      id={`candidate-card-${character.id}`}
      className={`relative bg-[var(--bg-card)] border-[1.5px] rounded-[var(--radius-card)] p-5 text-left transition-all duration-200 hover:bg-[var(--bg-card-hover)] ${
        isNudged ? 'animate-nudge' : ''
      }`}
      style={{
        borderColor: isSelected ? cat.color : 'var(--line)',
        boxShadow: isSelected
          ? `0 0 0 1px ${cat.color}, 0 12px 28px -10px ${cat.color}80`
          : undefined,
      }}
    >
      {/* Top right Selection Checkmark button */}
      <button
        type="button"
        onClick={onToggleSelect}
        aria-label={`${character.name} ${isSelected ? '선택 해제' : '선택'}`}
        className="absolute top-4 right-4 w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center transition-colors cursor-pointer"
        style={{
          borderColor: isSelected ? cat.color : 'var(--line)',
          backgroundColor: isSelected ? cat.color : 'var(--bg-deep)',
        }}
      >
        <Check
          className={`w-3.5 h-3.5 transition-opacity ${
            isSelected ? 'opacity-100 text-[#1D1A30]' : 'opacity-0'
          }`}
          strokeWidth={3}
        />
      </button>

      {/* Card Header clickable area for selecting */}
      <div
        className="flex items-start gap-3.5 cursor-pointer pr-7"
        onClick={onToggleSelect}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleSelect();
          }
        }}
      >
        <div
          className="flex-none w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 hover:scale-105"
          style={{
            backgroundColor: `${cat.color}24`,
            color: cat.color,
          }}
        >
          <CharacterIcon id={character.id} className="w-5 h-5" />
        </div>

        <div>
          <h3 className="font-serif text-lg font-semibold text-[var(--text-warm)] leading-tight">
            {character.name}
          </h3>
          <span
            className="inline-block text-xs font-semibold mt-0.5 tracking-wide"
            style={{ color: cat.color }}
          >
            {cat.label}
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p
        className="mt-2.5 text-[13.5px] text-[var(--text-muted)] leading-snug cursor-pointer"
        onClick={onToggleSelect}
      >
        {character.tagline}
      </p>

      {/* More Info button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleExpand();
        }}
        className="mt-3.5 inline-flex items-center gap-1.5 text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors cursor-pointer py-1"
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? '간략히 접기' : '더 알아보기'}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-250 ${
            isExpanded ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Collapsible detail */}
      <div
        className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'grid-rows-[1fr] mt-2.5 pt-2.5 border-t border-[var(--line)]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden text-[13px] text-[var(--text-muted)] leading-relaxed">
          {character.desc}
        </div>
      </div>
    </article>
  );
};
