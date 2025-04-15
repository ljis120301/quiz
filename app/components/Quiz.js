'use client'
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// Function to calculate time estimate based on number of questions
function calculateTimeEstimate(questionCount) {
  // Assuming 45 seconds per question
  const totalSeconds = questionCount * 45;
  const minutes = Math.ceil(totalSeconds / 60);
  return `${minutes} mins`;
}

export default function Quiz({ quizId }) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizTitle, setQuizTitle] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [timeEstimate, setTimeEstimate] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/data/quizzes/${quizId}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data.questions);
        setQuizTitle(data.title);
        
        // Calculate question count and time estimate
        const count = data.questions.length;
        setQuestionCount(count);
        setTimeEstimate(calculateTimeEstimate(count));
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuestions();
    }
  }, [quizId]);

  // Handle navigation events
  useEffect(() => {
    const handleQuizNavigation = (e) => {
      // Only show warning if there's progress to lose
      if (answeredQuestions > 0 && !showScore) {
        e.preventDefault();
        setTargetUrl(e.detail);
        setShowLeaveDialog(true);
      }
      // If no progress, don't prevent the default navigation
    };

    window.addEventListener('quizNavigationAttempt', handleQuizNavigation, { capture: true });
    return () => {
      window.removeEventListener('quizNavigationAttempt', handleQuizNavigation, { capture: true });
    };
  }, [answeredQuestions, showScore]);

  // Handle navigation attempts
  const handleNavigation = (e, href) => {
    // Only show warning if there's progress to lose
    if (answeredQuestions > 0 && !showScore) {
      e.preventDefault();
      setTargetUrl(href);
      setShowLeaveDialog(true);
    }
    // If no progress, let the navigation happen naturally
  };

  // Handle browser/tab closing
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (answeredQuestions > 0 && !showScore) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answeredQuestions, showScore]);

  const handleConfirmLeave = () => {
    router.push(targetUrl);
  };

  useEffect(() => {
    if (showScore) {
      window.dispatchEvent(new CustomEvent('quizCompleted'));
    }
  }, [showScore]);

  const handleAnswerClick = (selectedAnswer) => {
    // Store the user's answer
    setUserAnswers([...userAnswers, {
      questionIndex: currentQuestion,
      selectedAnswer,
      isCorrect: selectedAnswer === questions[currentQuestion].correctAnswer
    }]);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const newAnsweredQuestions = answeredQuestions + 1;
    setAnsweredQuestions(newAnsweredQuestions);
    
    // Dispatch progress event
    window.dispatchEvent(new CustomEvent('quizProgress', {
      detail: newAnsweredQuestions
    }));

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to leave? Any progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmLeave}>
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showScore ? (
        <div className="bg-surface dark:bg-frappe-surface0 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <span className="text-5xl mb-4">🎉</span>
            <h2 className="text-3xl font-bold text-primary dark:text-frappe-blue mb-4">Quiz Complete!</h2>
            <div className="space-y-2">
              <p className="text-xl text-text dark:text-frappe-text">
                You scored {score} out of {questions.length}
              </p>
              <p className="text-4xl font-bold text-primary dark:text-frappe-green">
                {Math.round((score / questions.length) * 100)}%
              </p>
              <p className="text-subtext dark:text-frappe-subtext0">
                {Math.round((score / questions.length) * 100) >= 70 ? "Great job! 🌟" : "Keep practicing! 💪"}
              </p>
            </div>
          </div>

          {/* Add missed questions section */}
          {score < questions.length && (
            <div className="mt-8 border-t border-gray-200 dark:border-frappe-surface1 pt-6">
              <h3 className="text-xl font-semibold text-text dark:text-frappe-text mb-4">Questions to Review</h3>
              <div className="space-y-4">
                {userAnswers
                  .filter(answer => !answer.isCorrect)
                  .map((answer, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-frappe-surface1 p-4 rounded-lg">
                      <p className="font-medium text-text dark:text-frappe-text mb-2">
                        {questions[answer.questionIndex].questionText}
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm text-red-500 dark:text-frappe-red">
                          Your answer: {answer.selectedAnswer}
                        </p>
                        <p className="text-sm text-green-500 dark:text-frappe-green">
                          Correct answer: {questions[answer.questionIndex].correctAnswer}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              className="px-6 py-3 bg-[#8caaee] text-[#232634] rounded-full font-semibold shadow-lg 
                        hover:bg-[#7a8cba] transform hover:-translate-y-0.5 transition-all
                        dark:bg-frappe-blue dark:text-frappe-base dark:hover:bg-frappe-overlay0"
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setShowScore(false);
                setAnsweredQuestions(0);
                setUserAnswers([]); // Reset user answers
              }}
            >
              Try Again 🔄
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-surface dark:bg-frappe-surface0 rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <Link 
                href="/" 
                onClick={(e) => handleNavigation(e, '/')}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                ← Back to Home
              </Link>
              <div className="text-sm text-subtext dark:text-frappe-subtext1">
                {Math.round((answeredQuestions / questions.length) * 100)}% Complete
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-frappe-surface1 rounded-full h-2.5 mb-4 overflow-hidden">
              <div
                className="bg-blue-600 dark:bg-frappe-sky h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(answeredQuestions / questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-subtext dark:text-frappe-subtext1 mb-4">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round((answeredQuestions / questions.length) * 100)}%</span>
            </div>
            <h2 className="text-2xl font-bold text-text dark:text-frappe-text mb-4">
              {questions[currentQuestion].questionText}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="p-4 text-left border-2 border-gray-200 dark:border-frappe-surface1 rounded-xl 
                          hover:border-primary hover:bg-primary/5 dark:hover:border-frappe-blue dark:hover:bg-frappe-blue/10 
                          transition-all duration-200 font-medium text-text dark:text-frappe-text"
                onClick={() => handleAnswerClick(option)}
              >
                <span className="inline-block w-6 h-6 rounded-full bg-primary/10 text-primary 
                               dark:bg-frappe-blue/10 dark:text-frappe-blue text-center mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 