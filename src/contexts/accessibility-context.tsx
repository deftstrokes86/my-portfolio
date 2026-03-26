'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AccessibilityState = {
  fontSize: number;
  isHighContrast: boolean;
  isReduceMotion: boolean;
  isDyslexicFont: boolean;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleHighContrast: () => void;
  toggleReduceMotion: () => void;
  toggleDyslexicFont: () => void;
};

const AccessibilityContext = createContext<AccessibilityState | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState(16); // base font size
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReduceMotion, setIsReduceMotion] = useState(false);
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${fontSize}px`;
    
    if (isHighContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (isReduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    if (isDyslexicFont) {
      root.classList.add('dyslexic-font');
    } else {
      root.classList.remove('dyslexic-font');
    }
  }, [fontSize, isHighContrast, isReduceMotion, isDyslexicFont]);

  const increaseFontSize = () => setFontSize((size) => Math.min(size + 2, 24));
  const decreaseFontSize = () => setFontSize((size) => Math.max(size - 2, 12));
  const toggleHighContrast = () => setIsHighContrast((prev) => !prev);
  const toggleReduceMotion = () => setIsReduceMotion((prev) => !prev);
  const toggleDyslexicFont = () => setIsDyslexicFont((prev) => !prev);

  const value = {
    fontSize,
    isHighContrast,
    isReduceMotion,
    isDyslexicFont,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    toggleReduceMotion,
    toggleDyslexicFont,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
