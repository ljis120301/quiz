'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const isQuizPage = pathname?.startsWith('/quiz/');
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [hasProgress, setHasProgress] = useState(false);

  // Reset quiz state when navigating to a new quiz
  useEffect(() => {
    if (isQuizPage) {
      setIsQuizCompleted(false);
      setHasProgress(false);
    }
  }, [pathname]);

  useEffect(() => {
    const handleQuizProgress = (e) => {
      setHasProgress(e.detail > 0);
    };

    const handleQuizCompleted = () => {
      setIsQuizCompleted(true);
    };

    window.addEventListener('quizProgress', handleQuizProgress);
    window.addEventListener('quizCompleted', handleQuizCompleted);

    return () => {
      window.removeEventListener('quizProgress', handleQuizProgress);
      window.removeEventListener('quizCompleted', handleQuizCompleted);
    };
  }, []);

  const handleNavigation = (e) => {
    if (isQuizPage && !isQuizCompleted && hasProgress) {
      e.preventDefault();
      const event = new CustomEvent('quizNavigationAttempt', {
        detail: e.currentTarget.href,
        bubbles: true,
        cancelable: true
      });
      window.dispatchEvent(event);
    }
    // If there's no progress, let the navigation happen naturally
  };

  return (
    <header className="sticky top-0 z-10 bg-surface border-b border-border backdrop-blur-sm bg-surface/80 supports-[backdrop-filter]:bg-surface/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            onClick={handleNavigation}
          >
            <svg 
              className="w-8 h-8 text-primary" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h1 className="text-xl font-medium text-text">Net Quiz</h1>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
} 