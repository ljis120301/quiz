'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Footer() {
  const pathname = usePathname();
  const isQuizPage = pathname?.startsWith('/quiz/');
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [hasProgress, setHasProgress] = useState(false);

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
  };

  return (
    <footer className="w-full py-8 bg-white dark:bg-frappe-surface0/50 border-t border-gray-100 dark:border-frappe-surface1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="space-y-4 max-w-md">
            <h3 className="text-gray-800 dark:text-frappe-text font-semibold">Net Quiz</h3>
            <p className="text-gray-500 dark:text-frappe-subtext0 text-sm">
              Test your knowledge and challenge yourself with our interactive quizzes.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-gray-800 dark:text-frappe-text font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://www.reddit.com/user/ljis120301" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-frappe-subtext0 dark:hover:text-frappe-text transition-colors">
                <span className="sr-only">Reddit</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              </a>
              <a href="https://github.com/ljis120301" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-frappe-subtext0 dark:hover:text-frappe-text transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-frappe-surface1">
          <p className="text-center text-sm text-gray-500 dark:text-frappe-subtext0">
            © {new Date().getFullYear()} Net Quiz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 