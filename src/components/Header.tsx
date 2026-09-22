import React from 'react';
import { ArrowDown, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onScrollToCandidates: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme, onScrollToCandidates }) => {
  return (
    <header className="relative overflow-hidden py-20 md:py-24 border-b border-[var(--line)] bg-[var(--bg-deep)]">
      {/* Background ambient radial gradients */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(ellipse 60% 45% at 18% -10%, rgba(232,169,74,0.18), transparent 60%), radial-gradient(ellipse 55% 50% at 88% 8%, rgba(167,139,196,0.22), transparent 60%), radial-gradient(ellipse 70% 60% at 50% 110%, rgba(95,173,166,0.14), transparent 60%)'
              : 'radial-gradient(ellipse 60% 45% at 18% -10%, rgba(232,169,74,0.15), transparent 60%), radial-gradient(ellipse 55% 50% at 88% 8%, rgba(167,139,196,0.18), transparent 60%)',
        }}
      />

      {/* Star pattern SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
        style={{ opacity: theme === 'dark' ? 0.55 : 0.15 }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="starpat" width="160" height="160" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="18" r="1.1" fill={theme === 'dark' ? '#F3EEE3' : '#23203A'} />
            <circle cx="70" cy="60" r="0.8" fill={theme === 'dark' ? '#F3EEE3' : '#23203A'} />
            <circle cx="120" cy="24" r="1.3" fill={theme === 'dark' ? '#F3EEE3' : '#23203A'} />
            <circle cx="40" cy="100" r="0.9" fill={theme === 'dark' ? '#F3EEE3' : '#23203A'} />
            <circle cx="145" cy="120" r="1" fill={theme === 'dark' ? '#F3EEE3' : '#23203A'} />
            <circle cx="95" cy="140" r="0.7" fill={theme === 'dark' ? '#F3EEE3' : '#23203A'} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#starpat)" />
      </svg>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Top bar with Theme Toggle */}
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center text-xs tracking-wider font-semibold text-[var(--gold)] bg-[rgba(232,169,74,0.12)] border border-[rgba(232,169,74,0.35)] px-3.5 py-1.5 rounded-full">
            라라 B-2 프로젝트
          </span>
          <button
            onClick={onToggleTheme}
            type="button"
            className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-warm)] hover:bg-[var(--bg-card-hover)] transition-colors"
            title={theme === 'dark' ? '밝은 화면으로 전환' : '어두운 화면으로 전환'}
            aria-label="테마 전환"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>라이트 모드</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[var(--violet)]" />
                <span>다크 모드</span>
              </>
            )}
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[var(--text-warm)] leading-[1.2] max-w-[15ch]">
          누가 새로운 문명을 이끌어야 할까요?
        </h1>

        <p className="mt-6 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
          <strong className="text-[var(--text-warm)] font-semibold">
            환경 오염과 자원 고갈로 힘들어하는 지구
          </strong>
          의 미래를 걱정하던 일부 사람들은 새로운 지구를 건설하기 위해 &apos;라라 B-2 프로젝트&apos;를 준비합니다.
          여러분은 이 프로젝트에 참여하게 되었습니다. 새로운 시민 사회가 추구해야 할 가치는 무엇이며, 어떤 구성원들이 이끌어 가야 할까요?
        </p>

        <button
          onClick={onScrollToCandidates}
          type="button"
          className="mt-8 inline-flex items-center gap-2.5 bg-[var(--gold)] text-[#241A08] px-6 py-3.5 rounded-full text-[15px] font-semibold shadow-[0_10px_24px_rgba(232,169,74,0.28)] hover:shadow-[0_14px_30px_rgba(232,169,74,0.36)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
        >
          <span>10명의 후보 만나보기</span>
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
