import React from 'react';

interface CharacterIconProps {
  id: string;
  className?: string;
}

export const CharacterIcon: React.FC<CharacterIconProps> = ({ id, className = 'w-5 h-5' }) => {
  switch (id) {
    case 'watney':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <path d="M12 21V10M12 10c0-3 2-5 5-5M12 10C12 7 10 5 7 5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7" cy="5" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="17" cy="5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'johnson':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <ellipse cx="12" cy="12" rx="9" ry="4" strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="20" cy="10.3" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'aragorn':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <path d="M4 18h16M5 18l1-8 2.5 4L12 6l3.5 8L18 10l1 8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'liann':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 3.5V6M12 18v2.5M3.5 12H6M18 12h2.5M12 8l2 4-2 4-2-4z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'yisunsin':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <path d="M12 3v6M9 6h6M12 9c-4 0-7 3-7 7 0 0 2 2 7 2s7-2 7-2c0-4-3-7-7-7Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'yongnam':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" strokeLinejoin="round" />
          <path d="M12 9v6M9 12h6" strokeLinecap="round" />
        </svg>
      );
    case 'songwooseok':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <path d="M12 3v15M7 21h10M5 8l-3 5c1 1.6 5 1.6 6 0L5 8Zm14 0l-3 5c1 1.6 5 1.6 6 0l-3-5Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 8h14" strokeLinecap="round" />
        </svg>
      );
    case 'deoksu':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <path d="M4 20 15 9M13 5l6 6M14.5 3.5l6 6M9 12l3 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'miguel':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <circle cx="8" cy="17" r="3" />
          <path d="M11 17V5l8-2v12" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="17" cy="15.5" r="2.6" />
        </svg>
      );
    case 'atticus':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <path d="M12 3v16M8 21h8" strokeLinecap="round" />
          <path d="M12 5 5 8.5c0 2.5 2.5 3.5 3.5 3.5S12 11 12 8.5M12 5l7 3.5c0 2.5-2.5 3.5-3.5 3.5S12 11 12 8.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};
