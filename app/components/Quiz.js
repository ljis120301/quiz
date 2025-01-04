'use client'
import { useState, useEffect } from "react";

export default function Quiz({ quizId }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/data/questions.json');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data.quizzes[quizId].questions);
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
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {showScore ? (
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <span className="text-5xl mb-4">🎉</span>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Quiz Complete!</h2>
            <div className="space-y-2">
              <p className="text-xl text-gray-700">
                You scored {score} out of {questions.length}
              </p>
              <p className="text-4xl font-bold text-blue-600">
                {Math.round((score / questions.length) * 100)}%
              </p>
              <p className="text-gray-500">
                {Math.round((score / questions.length) * 100) >= 70 ? "Great job! 🌟" : "Keep practicing! 💪"}
              </p>
            </div>
          </div>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg 
                      hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all"
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowScore(false);
            }}
          >
            Try Again 🔄
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
              ></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {questions[currentQuestion].questionText}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 
                          hover:bg-blue-50 transition-all duration-200 font-medium text-gray-700"
                onClick={() => handleAnswerClick(option)}
              >
                <span className="inline-block w-6 h-6 rounded-full bg-gray-100 text-gray-600 
                               text-center mr-3">{String.fromCharCode(65 + index)}</span>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 