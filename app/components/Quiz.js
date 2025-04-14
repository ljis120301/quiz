'use client'
import { useState, useEffect } from "react";

// Function to calculate time estimate based on number of questions
function calculateTimeEstimate(questionCount) {
  // Assuming 45 seconds per question
  const totalSeconds = questionCount * 45;
  const minutes = Math.ceil(totalSeconds / 60);
  return `${minutes} mins`;
}

export default function Quiz({ quizId }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizTitle, setQuizTitle] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [timeEstimate, setTimeEstimate] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

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

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setAnsweredQuestions(answeredQuestions + 1);
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
      {showScore ? (
        <div className="bg-surface dark:bg-frappe-surface0 rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
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
          <button
            className="px-6 py-3 bg-[#8caaee] text-[#232634] rounded-full font-semibold shadow-lg 
                      hover:bg-[#7a8cba] transform hover:-translate-y-0.5 transition-all
                      dark:bg-frappe-blue dark:text-frappe-base dark:hover:bg-frappe-overlay0"
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowScore(false);
              setAnsweredQuestions(0);
            }}
          >
            Try Again 🔄
          </button>
        </div>
      ) : (
        <div className="bg-surface dark:bg-frappe-surface0 rounded-2xl shadow-xl p-8">
          <div className="mb-8">
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