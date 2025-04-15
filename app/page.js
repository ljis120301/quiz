'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('/api/quizzes');
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }
        const data = await response.json();
        setQuizzes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading quizzes:', error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      // loading spinner
      <div className="p-8">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

    return (
      <div className="p-8 dark:bg-surface0">
      <h2 className="text-2xl font-semibold text-black dark:text-frappe-text mb-6">Available Quizzes</h2>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Link 
            href={`/quiz/${quiz.id}`} 
            key={quiz.id}
            className="block h-full"
          >
            <div className="dark:bg-frappe-surface0 rounded-lg border border-frappe-surface1 hover:border-frappe-blue 
                          hover:shadow-lg transition-all duration-200 p-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-3xl mb-2 block">{quiz.icon}</span>
                  <h3 className="text-xl font-semibold text-black dark:text-white">{quiz.title}</h3>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  quiz.difficulty === 'Easy' ? 'bg-frappe-green text-frappe-base' :
                  quiz.difficulty === 'Medium' ? 'bg-frappe-yellow text-frappe-base' :
                  'bg-frappe-red text-frappe-base'
                }`}>
                  {quiz.difficulty}
                </span>
              </div>
              <p className="text-black dark:text-white mb-4 flex-grow">{quiz.description}</p>
              <div className="flex items-center justify-between text-sm text-black dark:text-white mt-auto">
                <span>{quiz.questionCount} questions</span>
                <span>{quiz.timeEstimate}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
